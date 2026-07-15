import { google } from 'googleapis';
import { env } from '../config/env';
import { logger } from '../utils/logger';

let calendar: any = null;
const isConfigured = !!(
  env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
  env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
  env.GOOGLE_CALENDAR_ID
);

if (isConfigured) {
  try {
    const formattedPrivateKey = env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n');
    const auth = new google.auth.JWT({
      email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: formattedPrivateKey,
      scopes: ['https://www.googleapis.com/auth/calendar']
    });
    calendar = google.calendar({ version: 'v3', auth });
    logger.info('📅 Google Calendar service configured successfully.');
  } catch (error) {
    logger.error('❌ Failed to initialize Google Calendar client:', error);
  }
} else {
  logger.warn('📅 Google Calendar credentials missing. Using MOCK calendar service.');
}

export interface BusySlot {
  start: Date;
  end: Date;
}

/**
 * Retrieves list of busy slots for the main calendar in a given time range.
 */
export async function listBusySlots(start: Date, end: Date): Promise<BusySlot[]> {
  if (!isConfigured || !calendar) {
    logger.debug(`[MOCK CALENDAR] Listing busy slots from ${start.toISOString()} to ${end.toISOString()}`);
    // Mock: no busy slots by default
    return [];
  }

  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        items: [{ id: env.GOOGLE_CALENDAR_ID }],
      },
    });

    const calendars = response.data.calendars;
    if (!calendars || !calendars[env.GOOGLE_CALENDAR_ID]) {
      return [];
    }

    const busy = calendars[env.GOOGLE_CALENDAR_ID].busy || [];
    return busy.map((slot: any) => ({
      start: new Date(slot.start),
      end: new Date(slot.end),
    }));
  } catch (error) {
    logger.error('❌ Failed to fetch busy slots from Google Calendar:', error);
    throw new Error('Failed to query calendar slot availability');
  }
}

/**
 * Creates an event on the Google Calendar.
 * Returns the Google Calendar event ID.
 */
export async function createCalendarEvent(
  userEmail: string,
  details: { typeName: string; scheduledAt: Date; duration: number; userName?: string; userPhone?: string }
): Promise<string> {
  const start = new Date(details.scheduledAt);
  const end = new Date(start.getTime() + details.duration * 60000);

  const summaryParts = [];
  if (details.userName) summaryParts.push(details.userName);
  summaryParts.push(details.typeName);
  if (details.userPhone) summaryParts.push(details.userPhone);
  const summary = summaryParts.join(' - ') || `OM Astrology AMC — ${details.typeName}`;

  if (!isConfigured || !calendar) {
    const mockId = `mock_event_${Math.floor(Math.random() * 1000000)}`;
    logger.debug(`[MOCK CALENDAR] Creating event: "${summary}" for ${userEmail} at ${start.toISOString()} | Mock ID: ${mockId}`);
    return mockId;
  }

  try {
    try {
      const event = await calendar.events.insert({
        calendarId: env.GOOGLE_CALENDAR_ID,
        requestBody: {
          summary,
          description: `Consultation session for ${userEmail}.`,
          start: {
            dateTime: start.toISOString(),
            timeZone: 'Asia/Kolkata',
          },
          end: {
            dateTime: end.toISOString(),
            timeZone: 'Asia/Kolkata',
          },
          attendees: [{ email: userEmail }],
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 30 },
            ],
          },
        },
      });

      logger.info(`📅 Google Calendar event created: ${event.data.id}`);
      return event.data.id || '';
    } catch (insertError: any) {
      const isForbiddenServiceAccount =
        insertError.status === 403 ||
        (insertError.message && insertError.message.includes('Service accounts cannot invite attendees'));

      if (isForbiddenServiceAccount) {
        logger.warn('⚠️ Service account cannot invite attendees. Retrying event creation WITHOUT attendees...');
        const eventWithoutAttendees = await calendar.events.insert({
          calendarId: env.GOOGLE_CALENDAR_ID,
          requestBody: {
            summary,
            description: `Consultation session for ${userEmail}.`,
            start: {
              dateTime: start.toISOString(),
              timeZone: 'Asia/Kolkata',
            },
            end: {
              dateTime: end.toISOString(),
              timeZone: 'Asia/Kolkata',
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'popup', minutes: 30 },
              ],
            },
          },
        });
        logger.info(`📅 Google Calendar event created successfully (without attendees): ${eventWithoutAttendees.data.id}`);
        return eventWithoutAttendees.data.id || '';
      }
      throw insertError;
    }
  } catch (error) {
    logger.error('❌ Failed to create Google Calendar event:', error);
    // Don't block booking if calendar fails, return a warning mock ID
    return `failed_sync_${Date.now()}`;
  }
}

/**
 * Deletes an event from Google Calendar.
 */
export async function deleteCalendarEvent(eventId: string): Promise<void> {
  if (!eventId || eventId.startsWith('mock_') || eventId.startsWith('failed_')) {
    logger.debug(`[MOCK CALENDAR] Deleting event with ID: ${eventId}`);
    return;
  }

  if (!isConfigured || !calendar) {
    logger.debug(`[MOCK CALENDAR] Deleting event: ${eventId}`);
    return;
  }

  try {
    await calendar.events.delete({
      calendarId: env.GOOGLE_CALENDAR_ID,
      eventId,
    });
    logger.info(`📅 Google Calendar event deleted: ${eventId}`);
  } catch (error) {
    logger.error(`❌ Failed to delete Google Calendar event ${eventId}:`, error);
  }
}

/**
 * Updates an event's schedule on Google Calendar.
 */
export async function updateCalendarEvent(
  eventId: string,
  details: { typeName: string; scheduledAt: Date; duration: number }
): Promise<void> {
  if (!eventId || eventId.startsWith('mock_') || eventId.startsWith('failed_')) {
    logger.debug(`[MOCK CALENDAR] Updating event with ID ${eventId} to ${details.scheduledAt.toISOString()}`);
    return;
  }

  if (!isConfigured || !calendar) {
    logger.debug(`[MOCK CALENDAR] Updating event ${eventId}`);
    return;
  }

  try {
    const start = new Date(details.scheduledAt);
    const end = new Date(start.getTime() + details.duration * 60000);

    await calendar.events.patch({
      calendarId: env.GOOGLE_CALENDAR_ID,
      eventId,
      requestBody: {
        start: {
          dateTime: start.toISOString(),
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: end.toISOString(),
          timeZone: 'Asia/Kolkata',
        },
      },
    });
    logger.info(`📅 Google Calendar event updated: ${eventId}`);
  } catch (error) {
    logger.error(`❌ Failed to update Google Calendar event ${eventId}:`, error);
  }
}
