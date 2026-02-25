import { getPanchangam } from '@ishubhamx/panchangam-js';

const date = new Date();
const location = {
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 5.5
};

try {
    const p = getPanchangam(date, location);
    console.log("Full Panchang Object:", JSON.stringify(p, null, 2));

    // Explicitly check properties I tried to use
    console.log("Tithi:", p.tithi);
    console.log("Nakshatra:", p.nakshatra);
    console.log("Yoga:", p.yoga);
    console.log("Karana:", p.karana);
    console.log("Sunrise:", p.sunrise);
    console.log("Rahukaal:", p.rahukaal);
} catch (e) {
    console.error("Error:", e);
}
