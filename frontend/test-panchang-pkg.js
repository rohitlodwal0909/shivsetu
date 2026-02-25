const panchang = require('panchang');
console.log(panchang);
if (typeof panchang === 'function') {
    try {
        console.log("Function result:", panchang(new Date(), {lat: 28.6, lon: 77.2}));
    } catch(e) {
        console.log("Function error:", e.message);
    }
}
try {
    const p = new panchang(new Date());
    console.log("Class instance:", p);
} catch(e) {}
