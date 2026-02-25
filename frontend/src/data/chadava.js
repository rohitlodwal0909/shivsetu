export const chadavaServices = [
    {
        id: 1,
        name: "Bhasma Aarti Booking",
        temple: "Mahakaleshwar Temple",
        location: "Ujjain",
        price: "200",
        rating: 5.0,
        reviews: 1240,
        image: "https://images.unsplash.com/photo-1604608672516-e1b4e1b0b6c8?auto=format&fit=crop&w=800&q=80",
        includes: ["Seating at Nandi Hall", "Vedic Chanting", "Live Darshan", "Video Proof"],
        description: "Experience the divine Bhasma Aarti at Mahakaleshwar Temple. This sacred ritual involves offering fresh ash (bhasma) to Lord Shiva, symbolizing the cycle of life and death. Witness the powerful energy and spiritual vibration of the Jyotirlinga during this early morning ceremony.",
        fullDescription: `
            <p>The Bhasma Aarti at Mahakaleshwar Temple is one of the most significant and spiritually charged rituals in Hinduism. It is the only Jyotirlinga where the Bhasma Aarti is performed daily.</p>
            <h3>Significance</h3>
            <p>The ash (Bhasma) offered to the Lord is believed to be the essence of life. It implies that everything in this world is temporary and eventually turns to ash, except the Lord himself.</p>
            <h3>What to Expect</h3>
            <p>Devotees are seated in the Nandi Hall or Ganesh Mandapam. The atmosphere is electric with continuous chanting of 'Om Namah Shivaya' and the sounds of bells and conch shells.</p>
        `,
        bookingType: "pandit"
    },
    {
        id: 2,
        name: "Garbh Grah Darshan",
        temple: "Mahakaleshwar Temple",
        location: "Ujjain",
        price: "750",
        rating: 4.9,
        reviews: 850,
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=800&q=80",
        includes: ["Sanctum Entry", "Direct Blessings", "Prasad Bag", "Photo of Offering"],
        description: "Get closer to the divine with Garbh Grah Darshan. Enter the innermost sanctum of the temple to offer your prayers directly to the deity. A truly personal and spiritually uplifting experience.",
        fullDescription: `
            <p>Garbh Grah Darshan allows you to enter the sanctum sanctorum of the temple, bringing you physically closer to the deity.</p>
            <h3>Privileges</h3>
            <p>Unlike general darshan, where you view the deity from a distance, this booking allows you to enter the Garbh Grah (subject to temple rules and dress code) for a few moments of personal prayer.</p>
        `,
        bookingType: "pandit"
    },
    {
        id: 3,
        name: "Vaidik Rudrabhishek",
        temple: "Mahakaleshwar Temple",
        location: "Ujjain",
        price: "300",
        rating: 4.8,
        reviews: 560,
        image: "https://images.unsplash.com/photo-1583012652990-a6dfb7e31c88?auto=format&fit=crop&w=800&q=80",
        includes: ["1 Brahmin Puja", "Abhishek Vidhi", "Live Video Call", "Digital Receipt"],
        description: "Perform a traditional Rudrabhishek puja remotely. Our Vedic Brahmins will chant the Rudra Sukta and perform the Abhishek on your behalf, seeking Lord Shiva's blessings for health, wealth, and prosperity.",
        fullDescription: `
            <p>Rudrabhishek is a ritual where Lord Shiva is worshipped with calm and peaceful offering like water, milk, and reciting the Rudra Sukta.</p>
            <h3>Benefits</h3>
            <p>It is believed to remove negativity, fulfill desires, and bring peace and prosperity to the devotee's family.</p>
        `,
        bookingType: "pandit"
    },
    {
        id: 4,
        name: "Sheeghra Darshan (VIP)",
        temple: "Mahakaleshwar Temple",
        location: "Ujjain",
        price: "500",
        rating: 4.9,
        reviews: 2100,
        image: "https://images.unsplash.com/photo-1605481673617-ad63d6d88f5f?auto=format&fit=crop&w=800&q=80",
        includes: ["Priority Entry", "Guided Darshan", "Free Parking", "Blessed Photo"],
        description: "Skip the long lines with our VIP Sheeghra Darshan. Save time and have a hassle-free spiritual experience with priority entry and guided assistance.",
        fullDescription: `
            <p>For those who wish to have a quick yet fulfilling darshan without standing in long queues, the Sheeghra Darshan is the ideal choice.</p>
        `,
        bookingType: "pandit"
    },
    {
        id: 5,
        name: "Laghu Rudraabhishek",
        temple: "Mahakaleshwar Temple",
        location: "Ujjain",
        price: "3000",
        rating: 5.0,
        reviews: 120,
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
        includes: ["121 Patha", "Ritual Video", "Complete Prasad Kit", "Home Delivery"],
        description: "A powerful puja involving 121 recitations of the Rudra Sukta. Ideal for overcoming obstacles and achieving major life goals.",
        fullDescription: `
            <p>The Laghu Rudraabhishek is a more elaborate form of the Rudrabhishek, involving multiple priests and hours of chanting.</p>
        `,
        bookingType: "pandit"
    },
    {
        id: 6,
        name: "Maha Rudraabhishek",
        temple: "Mahakaleshwar Temple",
        location: "Ujjain",
        price: "15000",
        rating: 5.0,
        reviews: 45,
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
        includes: ["Grand Ceremony", "Ritual Highlights Video", "Premium Prasad", "Family Inclusions"],
        description: "The ultimate offering to Lord Shiva. A grand ceremony performed with utmost devotion and Vedic precision for the well-being of the entire family and lineage.",
        fullDescription: `
            <p>This is a grand ritual, often performed for special occasions or to resolve significant doshas. It involves a large group of priests and elaborate offerings.</p>
        `,
        bookingType: "pandit"
    }
];

export const getChadavaById = (id) => {
    return chadavaServices.find(service => service.id === parseInt(id));
};
