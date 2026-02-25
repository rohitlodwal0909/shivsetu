
import { getPanchangam } from '@ishubhamx/panchangam-js';

const date = new Date();
const location = {
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 5.5
};

try {
    const p = getPanchangam(date, location);
    console.log("Panchang Output:", JSON.stringify(p, null, 2));
} catch (e) {
    console.error("Error:", e);
}
