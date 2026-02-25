import { getPanchangam } from '@ishubhamx/panchangam-js';

const date = new Date();
const location = {
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 5.5
};

(async () => {
    try {
        // According to search results, it might be a class or a function.
        // Let's try to instantiate it.
        const p = getPanchangam(date, location);
        console.log("Full Panchang Object:", JSON.stringify(p, null, 2));
    } catch (e) {
        console.error("Error with new Panchangam():", e.message);
        try {
            // Fallback: maybe it's a default export function?
            const result = Panchangam(date, location);
            console.log("Result from function call:", JSON.stringify(result, null, 2));
        } catch (e2) {
            console.error("Error with Panchangam():", e2.message);
        }
    }
})();
