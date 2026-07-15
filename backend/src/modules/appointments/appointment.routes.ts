import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { requireAdmin } from '../../middleware/requireAdmin';
import { validate } from '../../middleware/validate';
import * as appController from './appointment.controller';
import * as schemas from './appointment.schema';

export const appointmentRouter = Router();

// Public consultation listings & slot checking
appointmentRouter.get('/types', appController.listAppointmentTypes);
appointmentRouter.get('/slots', validate({ query: schemas.getSlotsSchema }), appController.getAvailableSlots);

// Blocked slots — list is public (slot checker uses it), create/delete are admin-only
appointmentRouter.get('/blocked-slots', appController.listBlockedSlots);
appointmentRouter.post('/blocked-slots', requireAuth, requireAdmin, validate({ body: schemas.createBlockedSlotSchema }), appController.createBlockedSlot);
appointmentRouter.delete('/blocked-slots/:id', requireAuth, requireAdmin, appController.deleteBlockedSlot);

// Booking appointments (Public logged-in user)
appointmentRouter.post('/', requireAuth, validate({ body: schemas.createAppointmentSchema }), appController.createAppointment);
appointmentRouter.post('/verify', requireAuth, appController.verifyAppointmentPayment);
appointmentRouter.get('/me', requireAuth, appController.getMyAppointments);

// Admin endpoints
appointmentRouter.post('/types', requireAuth, requireAdmin, validate({ body: schemas.createAppointmentTypeSchema }), appController.createAppointmentType);
appointmentRouter.patch('/types/:id', requireAuth, requireAdmin, validate({ body: schemas.updateAppointmentTypeSchema }), appController.updateAppointmentType);
appointmentRouter.delete('/types/:id', requireAuth, requireAdmin, appController.deleteAppointmentType);
appointmentRouter.get('/', requireAuth, requireAdmin, appController.getAllAppointments);
appointmentRouter.patch('/:id/status', requireAuth, requireAdmin, validate({ body: schemas.updateAppointmentStatusSchema }), appController.updateAppointmentStatus);

export default appointmentRouter;
