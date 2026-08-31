// Auspicious Timing (Muhurat) Recommendation Engine

export interface MuhuratCategory {
 event: string;
 key: string;
 iconName: string;
 auspiciousTithis: string[];
 auspiciousNakshatras: string[];
 avoidTimings: string;
 generalRecommendation: string;
}

export function getMuhuratRecommendations(): MuhuratCategory[] {
 return [
 {
 event: 'Marriage (Vivah)',
 key: 'marriage',
 iconName: 'Heart',
 auspiciousTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Ekadashi', 'Trayodashi'],
 auspiciousNakshatras: ['Rohini', 'Mrigashira', 'Magha', 'Uttara Phalguni', 'Hasta', 'Swati', 'Anuradha', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Revati'],
 avoidTimings: 'Avoid Rikta Tithis (4th, 9th, 14th), Amavasya, Solar/Lunar Eclipses, and Rahu Kaal.',
 generalRecommendation: 'Select auspicious Vivah Lagnas with Jupiter or Venus in Kendra and Moon in strong dignity.'
 },
 {
 event: 'House Warming (Griha Pravesh)',
 key: 'house-warming',
 iconName: 'Home',
 auspiciousTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi'],
 auspiciousNakshatras: ['Rohini', 'Mrigashira', 'Pushya', 'Uttara Phalguni', 'Hasta', 'Anuradha', 'Uttara Ashadha', 'Uttara Bhadrapada'],
 avoidTimings: 'Avoid Tuesday/Sunday Griha Pravesh, Bhadra Vishti Karana, and Tuesday Rahu Kaal.',
 generalRecommendation: 'Perform Vastu Shanti and Ganapati Homam prior to moving furniture into the new home.'
 },
 {
 event: 'Vehicle Purchase (Vahan Kharidi)',
 key: 'vehicle-purchase',
 iconName: 'Car',
 auspiciousTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi'],
 auspiciousNakshatras: ['Ashwini', 'Punarvasu', 'Pushya', 'Hasta', 'Swati', 'Shravana', 'Dhanishta'],
 avoidTimings: 'Avoid Amavasya, Rahu Kaal, and Rahu/Ketu transits over natal Moon.',
 generalRecommendation: 'Perform Ganesha Puja and place a small Swastika on the dashboard before driving.'
 },
 {
 event: 'Business Start (Vyapar ArAMCh)',
 key: 'business-start',
 iconName: 'TrendingUp',
 auspiciousTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Labha Panchami'],
 auspiciousNakshatras: ['Pushya', 'Chitra', 'Anuradha', 'Revati', 'Ashwini', 'Rohini'],
 avoidTimings: 'Avoid Saturday launches during retrograde Mercury transits.',
 generalRecommendation: 'Inaugurate during Abhijit Muhurat (midday sun zenith) for maximum commercial success.'
 },
 {
 event: 'Property Purchase (Bhoomi Pujan / Registry)',
 key: 'property-purchase',
 iconName: 'Building',
 auspiciousTithis: ['Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi'],
 auspiciousNakshatras: ['Mrigashira', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Vishakha', 'Anuradha'],
 avoidTimings: 'Avoid Tuesday afternoons during Gulika Kaal.',
 generalRecommendation: 'Sign property documents during Fixed Lagna (Taurus, Leo, Scorpio, Aquarius).'
 },
 {
 event: 'Naming Ceremony (Namkaran)',
 key: 'naming-ceremony',
 iconName: 'Smile',
 auspiciousTithis: ['11th or 12th day after birth', 'Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami'],
 auspiciousNakshatras: ['Rohini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Uttara Phalguni', 'Hasta', 'Anuradha', 'Revati'],
 avoidTimings: 'Avoid Chaturthi, Navami, and Chaturdashi tithis.',
 generalRecommendation: 'Choose first letter based on the birth Nakshatra Pada (Pada Letter).'
 }
 ];
}
