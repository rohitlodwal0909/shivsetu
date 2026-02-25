// Comprehensive Translations for Hindi and English
export const translations = {
    en: {
        // Header
        header: {
            home: 'HOME',
            cabs: 'CABS',
            pandit: 'PANDIT',
            tours: 'TOURS',
            shop: 'SHOP',
            contact: 'CONTACT',
            search: 'Search',
            searchPlaceholder: 'Search for products...',
            account: 'Account',
            wishlist: 'Wishlist',
            cart: 'Cart',
        },

        // Common UI Elements
        common: {
            loading: 'Loading...',
            error: 'Error',
            success: 'Success',
            addToCart: 'Add to Cart',
            buyNow: 'Buy Now',
            viewDetails: 'View Details',
            readMore: 'Read More',
            learnMore: 'Learn More',
            filter: 'Filter',
            sort: 'Sort By',
            apply: 'Apply',
            reset: 'Reset',
            clear: 'Clear',
            submit: 'Submit',
            cancel: 'Cancel',
            save: 'Save',
            edit: 'Edit',
            delete: 'Delete',
            confirm: 'Confirm',
            back: 'Back',
            next: 'Next',
            previous: 'Previous',
            viewAll: 'View All',
            showMore: 'Show More',
            showLess: 'Show Less',
        },

        // Product related
        product: {
            inStock: 'In Stock',
            outOfStock: 'Out of Stock',
            limitedStock: 'Limited Stock',
            newArrival: 'New Arrival',
            sale: 'Sale',
            trending: 'Trending',
            featured: 'Featured',
            bestSeller: 'Best Seller',
            price: 'Price',
            originalPrice: 'Original Price',
            discount: 'Discount',
            quantity: 'Quantity',
            size: 'Size',
            color: 'Color',
            selectSize: 'Select Size',
            selectColor: 'Select Color',
            sizeGuide: 'Size Guide',
            addToWishlist: 'Add to Wishlist',
            removeFromWishlist: 'Remove from Wishlist',
            shareProduct: 'Share Product',
            reviewsRatings: 'Reviews & Ratings',
            writeReview: 'Write a Review',
            description: 'Description',
            specifications: 'Specifications',
            deliveryInfo: 'Delivery Information',
            returnPolicy: 'Return Policy',
        },

        // Home Page Sections
        home: {
            hero: {
                title: 'Discover Amazing Products',
                subtitle: 'Shop the latest trends and exclusive deals',
                shopNow: 'Shop Now',
            },
            featuredProducts: 'Featured Products',
            bestSellers: 'Best Sellers',
            newArrivals: 'New Arrivals',
            trendingProducts: 'Trending Products',
            shopByCategory: 'Shop by Category',
        },

        // Shop Page
        shop: {
            title: 'Shop All Products',
            categories: 'Categories',
            allProducts: 'All Products',
            filters: 'Filters',
            sortBy: 'Sort By',
            priceRange: 'Price Range',
            results: 'Results',
            showing: 'Showing',
            of: 'of',
            products: 'products',
            noProductsFound: 'No products found',
            // Category names
            poojaSamagri: 'Pooja Samagri',
            idols: 'Idols & Statues',
            religiousBooks: 'Religious Books',
            rudrakshaBeads: 'Rudraksha & Beads',
            incenseAgarbatti: 'Incense & Agarbatti',
            homeDecor: 'Home Decor',
        },

        // Cart & Checkout
        cart: {
            yourCart: 'Your Cart',
            emptyCart: 'Your cart is empty',
            continueShopping: 'Continue Shopping',
            subtotal: 'Subtotal',
            shipping: 'Shipping',
            tax: 'Tax',
            total: 'Total',
            proceedToCheckout: 'Proceed to Checkout',
            updateCart: 'Update Cart',
            removeItem: 'Remove Item',
            moveToWishlist: 'Move to Wishlist',
            couponCode: 'Coupon Code',
            applyCoupon: 'Apply Coupon',
            freeShipping: 'Free Shipping',
            estimatedDelivery: 'Estimated Delivery',
        },

        // Booking Pages
        booking: {
            cab: {
                title: 'Book Your Cab',
                subtitle: 'Comfortable rides at affordable prices',
                bookNow: 'Book Now',
                features: [
                    { title: 'Safe & Reliable', desc: 'Verified drivers and GPS tracking' },
                    { title: 'Best Prices', desc: 'Competitive rates for all destinations' },
                    { title: '24/7 Service', desc: 'Available round the clock' }
                ]
            },
            pandit: {
                title: 'Book Pandit Ji',
                subtitle: 'Expert pandits for all religious ceremonies',
                bookNow: 'Book Now',
                features: [
                    { title: 'Experienced Pandits', desc: 'Qualified and knowledgeable priests' },
                    { title: 'All Ceremonies', desc: 'From weddings to puja rituals' },
                    { title: 'Custom Packages', desc: 'Flexible services as per your needs' }
                ]
            },
            tour: {
                title: 'Book Your Tour Package',
                subtitle: 'Explore incredible destinations with our curated tour packages',
                bookNow: 'Book Now',
                features: [
                    { title: 'Best Destinations', desc: 'Handpicked locations across India' },
                    { title: 'Expert Guides', desc: 'Professional and friendly tour guides' },
                    { title: 'All Inclusive', desc: 'Hotels, meals, and transportation' }
                ]
            }
        },

        // Modal
        modal: {
            cab: {
                title: 'Book Your Cab',
                subtitle: 'Fill in your details for a comfortable ride',
                welcomeTitle: 'Ready to Go?',
                welcomeText: 'Book a cab for your journey. Safe, reliable, and comfortable rides at the best prices.',
                pickupLocation: 'Pickup Location',
                dropLocation: 'Drop Location',
                date: 'Date',
                time: 'Time',
                passengers: 'Number of Passengers',
                vehicleType: 'Select Vehicle Type',
                sedan: 'Sedan',
                suv: 'SUV',
                luxury: 'Luxury',
                minivan: 'Mini Van',
                upTo: 'Up to',
                passengersText: 'passengers',
            },
            pandit: {
                title: 'Book Pandit Ji',
                subtitle: 'Schedule your puja or ceremony',
                welcomeTitle: 'Spiritual Services',
                welcomeText: 'Book experienced pandits for all your religious ceremonies and rituals with complete samagri arrangements.',
                pujaType: 'Select Type of Puja / Ceremony',
                location: 'Location / Address',
                numberOfPandits: 'Number of Pandits Required',
                duration: 'Expected Duration',
                pandits: 'Pandits',
            },
            tour: {
                title: 'Book Your Tour Package',
                subtitle: 'Plan your perfect getaway',
                welcomeTitle: 'Adventure Awaits!',
                welcomeText: 'Explore amazing destinations with our curated tour packages. Create memories that last a lifetime.',
                tourPackage: 'Select Tour Package',
                startDate: 'Start Date',
                endDate: 'End Date',
                numberOfTravelers: 'Number of Travelers',
                accommodation: 'Accommodation Type',
                mealsIncluded: 'Include Meals',
                guideRequired: 'Professional Guide',
                travelers: 'Travelers',
            },
            common: {
                name: 'Full Name',
                phone: 'Phone Number',
                email: 'Email Address',
                specialRequests: 'Special Requests (Optional)',
                contactInfo: 'Contact Information',
                submit: 'Confirm Booking',
                close: 'Close',
                bookingConfirmed: 'Booking Confirmed!',
                bookingId: 'Booking ID',
                required: '*',
                enterPlaceholder: 'Enter',
                selectPlaceholder: 'Select',
            }
        },

        // Footer
        footer: {
            aboutUs: 'About Us',
            contactUs: 'Contact Us',
            privacyPolicy: 'Privacy Policy',
            termsConditions: 'Terms & Conditions',
            faq: 'FAQ',
            customerService: 'Customer Service',
            myAccount: 'My Account',
            orderTracking: 'Order Tracking',
            returnExchange: 'Returns & Exchanges',
            shippingInfo: 'Shipping Information',
            newsletter: 'Newsletter',
            subscribeNewsletter: 'Subscribe to our newsletter',
            enterEmail: 'Enter your email',
            subscribe: 'Subscribe',
            followUs: 'Follow Us',
            paymentMethods: 'Accepted Payment Methods',
            copyright: '© 2026 ECOM. All rights reserved.',
        },
    },

    hi: {
        // Header
        header: {
            home: 'होम',
            cabs: 'कैब',
            pandit: 'पंडित',
            tours: 'टूर',
            shop: 'शॉप',
            contact: 'संपर्क',
            search: 'खोजें',
            searchPlaceholder: 'प्रोडक्ट्स खोजें...',
            account: 'खाता',
            wishlist: 'पसंदीदा',
            cart: 'कार्ट',
        },

        // Common UI Elements
        common: {
            loading: 'लोड हो रहा है...',
            error: 'त्रुटि',
            success: 'सफलता',
            addToCart: 'कार्ट में जोड़ें',
            buyNow: 'अभी खरीदें',
            viewDetails: 'विवरण देखें',
            readMore: 'और पढ़ें',
            learnMore: 'और जानें',
            filter: 'फ़िल्टर',
            sort: 'क्रमबद्ध करें',
            apply: 'लागू करें',
            reset: 'रीसेट',
            clear: 'साफ़ करें',
            submit: 'सबमिट करें',
            cancel: 'रद्द करें',
            save: 'सहेजें',
            edit: 'संपादित करें',
            delete: 'हटाएं',
            confirm: 'पुष्टि करें',
            back: 'वापस',
            next: 'अगला',
            previous: 'पिछला',
            viewAll: 'सभी देखें',
            showMore: 'और दिखाएं',
            showLess: 'कम दिखाएं',
        },

        // Product related
        product: {
            inStock: 'स्टॉक में है',
            outOfStock: 'स्टॉक में नहीं',
            limitedStock: 'सीमित स्टॉक',
            newArrival: 'नया आगमन',
            sale: 'सेल',
            trending: 'ट्रेंडिंग',
            featured: 'फ़ीचर्ड',
            bestSeller: 'बेस्ट सेलर',
            price: 'कीमत',
            originalPrice: 'मूल कीमत',
            discount: 'छूट',
            quantity: 'मात्रा',
            size: 'साइज़',
            color: 'रंग',
            selectSize: 'साइज़ चुनें',
            selectColor: 'रंग चुनें',
            sizeGuide: 'साइज़ गाइड',
            addToWishlist: 'पसंदीदा में जोड़ें',
            removeFromWishlist: 'पसंदीदा से हटाएं',
            shareProduct: 'प्रोडक्ट शेयर करें',
            reviewsRatings: 'समीक्षा और रेटिंग',
            writeReview: 'समीक्षा लिखें',
            description: 'विवरण',
            specifications: 'विशिष्टताएं',
            deliveryInfo: 'डिलीवरी जानकारी',
            returnPolicy: 'वापसी नीति',
        },

        // Home Page Sections
        home: {
            hero: {
                title: 'अद्भुत उत्पाद खोजें',
                subtitle: 'नवीनतम ट्रेंड्स और विशेष ऑफ़र की खरीदारी करें',
                shopNow: 'अभी खरीदें',
            },
            featuredProducts: 'फ़ीचर्ड उत्पाद',
            bestSellers: 'बेस्ट सेलर',
            newArrivals: 'नए आगमन',
            trendingProducts: 'ट्रेंडिंग उत्पाद',
            shopByCategory: 'श्रेणी के अनुसार खरीदें',
        },

        // Shop Page
        shop: {
            title: 'सभी उत्पाद',
            categories: 'श्रेणियाँ',
            allProducts: 'सभी उत्पाद',
            filters: 'फ़िल्टर',
            sortBy: 'क्रमबद्ध करें',
            priceRange: 'मूल्य सीमा',
            results: 'परिणाम',
            showing: 'दिखा रहे हैं',
            of: 'में से',
            products: 'उत्पाद',
            noProductsFound: 'कोई उत्पाद नहीं मिला',
            // Category names
            poojaSamagri: 'पूजा सामग्री',
            idols: 'मूर्तियाँ और प्रतिमाएं',
            religiousBooks: 'धार्मिक पुस्तकें',
            rudrakshaBeads: 'रुद्राक्ष और माला',
            incenseAgarbatti: 'अगरबत्ती और धूप',
            homeDecor: 'घर की सजावट',
        },

        // Cart & Checkout
        cart: {
            yourCart: 'आपका कार्ट',
            emptyCart: 'आपका कार्ट खाली है',
            continueShopping: 'खरीदारी जारी रखें',
            subtotal: 'उप-कुल',
            shipping: 'शिपिंग',
            tax: 'टैक्स',
            total: 'कुल',
            proceedToCheckout: 'चेकआउट पर जाएं',
            updateCart: 'कार्ट अपडेट करें',
            removeItem: 'आइटम हटाएं',
            moveToWishlist: 'पसंदीदा में जोड़ें',
            couponCode: 'कूपन कोड',
            applyCoupon: 'कूपन लागू करें',
            freeShipping: 'मुफ्त शिपिंग',
            estimatedDelivery: 'अनुमानित डिलीवरी',
        },

        // Booking Pages
        booking: {
            cab: {
                title: 'अपनी कैब बुक करें',
                subtitle: 'किफायती दामों पर आरामदायक सवारी',
                bookNow: 'अभी बुक करें',
                features: [
                    { title: 'सुरक्षित और विश्वसनीय', desc: 'सत्यापित ड्राइवर और GPS ट्रैकिंग' },
                    { title: 'बेहतरीन कीमतें', desc: 'सभी गंतव्यों के लिए प्रतिस्पर्धी दरें' },
                    { title: '24/7 सेवा', desc: 'चौबीसों घंटे उपलब्ध' }
                ]
            },
            pandit: {
                title: 'पंडित जी बुक करें',
                subtitle: 'सभी धार्मिक समारोहों के लिए विशेषज्ञ पंडित',
                bookNow: 'अभी बुक करें',
                features: [
                    { title: 'अनुभवी पंडित', desc: 'योग्य और जानकार पुजारी' },
                    { title: 'सभी समारोह', desc: 'शादी से लेकर पूजा अनुष्ठान तक' },
                    { title: 'कस्टम पैकेज', desc: 'आपकी जरूरतों के अनुसार लचीली सेवाएं' }
                ]
            },
            tour: {
                title: 'अपना टूर पैकेज बुक करें',
                subtitle: 'हमारे चयनित टूर पैकेज के साथ अविश्वसनीय गंतव्यों का अन्वेषण करें',
                bookNow: 'अभी बुक करें',
                features: [
                    { title: 'बेहतरीन गंतव्य', desc: 'भारत भर में चुनिंदा स्थान' },
                    { title: 'विशेषज्ञ गाइड', desc: 'पेशेवर और मित्रवत टूर गाइड' },
                    { title: 'सब कुछ शामिल', desc: 'होटल, भोजन और परिवहन' }
                ]
            }
        },

        // Modal
        modal: {
            cab: {
                title: 'अपनी कैब बुक करें',
                subtitle: 'आरामदायक सवारी के लिए अपना विवरण भरें',
                welcomeTitle: 'जाने के लिए तैयार?',
                welcomeText: 'अपनी यात्रा के लिए कैब बुक करें। सुरक्षित, विश्वसनीय और आरामदायक सवारी सर्वोत्तम कीमतों पर।',
                pickupLocation: 'पिकअप स्थान',
                dropLocation: 'ड्रॉप स्थान',
                date: 'तारीख',
                time: 'समय',
                passengers: 'यात्रियों की संख्या',
                vehicleType: 'वाहन प्रकार चुनें',
                sedan: 'सेडान',
                suv: 'एसयूवी',
                luxury: 'लक्जरी',
                minivan: 'मिनी वैन',
                upTo: 'तक',
                passengersText: 'यात्री',
            },
            pandit: {
                title: 'पंडित जी बुक करें',
                subtitle: 'अपनी पूजा या समारोह का समय निर्धारित करें',
                welcomeTitle: 'आध्यात्मिक सेवाएं',
                welcomeText: 'अपने सभी धार्मिक समारोहों और अनुष्ठानों के लिए अनुभवी पंडितों को पूर्ण सामग्री व्यवस्था के साथ बुक करें।',
                pujaType: 'पूजा / समारोह का प्रकार चुनें',
                location: 'स्थान / पता',
                numberOfPandits: 'आवश्यक पंडितों की संख्या',
                duration: 'अपेक्षित अवधि',
                pandits: 'पंडित',
            },
            tour: {
                title: 'अपना टूर पैकेज बुक करें',
                subtitle: 'अपनी परफेक्ट छुट्टी की योजना बनाएं',
                welcomeTitle: 'रोमांच इंतजार कर रहा है!',
                welcomeText: 'हमारे चयनित टूर पैकेज के साथ अद्भुत गंतव्यों का अन्वेषण करें। यादें बनाएं जो जीवन भर रहें।',
                tourPackage: 'टूर पैकेज चुनें',
                startDate: 'प्रारंभ तिथि',
                endDate: 'समाप्ति तिथि',
                numberOfTravelers: 'यात्रियों की संख्या',
                accommodation: 'आवास प्रकार',
                mealsIncluded: 'भोजन शामिल करें',
                guideRequired: 'पेशेवर गाइड',
                travelers: 'यात्री',
            },
            common: {
                name: 'पूरा नाम',
                phone: 'फोन नंबर',
                email: 'ईमेल पता',
                specialRequests: 'विशेष अनुरोध (वैकल्पिक)',
                contactInfo: 'संपर्क जानकारी',
                submit: 'बुकिंग की पुष्टि करें',
                close: 'बंद करें',
                bookingConfirmed: 'बुकिंग की पुष्टि हो गई!',
                bookingId: 'बुकिंग आईडी',
                required: '*',
                enterPlaceholder: 'दर्ज करें',
                selectPlaceholder: 'चुनें',
            }
        },

        // Footer
        footer: {
            aboutUs: 'हमारे बारे में',
            contactUs: 'संपर्क करें',
            privacyPolicy: 'गोपनीयता नीति',
            termsConditions: 'नियम और शर्तें',
            faq: 'सामान्य प्रश्न',
            customerService: 'ग्राहक सेवा',
            myAccount: 'मेरा खाता',
            orderTracking: 'ऑर्डर ट्रैकिंग',
            returnExchange: 'रिटर्न और एक्सचेंज',
            shippingInfo: 'शिपिंग जानकारी',
            newsletter: 'न्यूज़लेटर',
            subscribeNewsletter: 'हमारे न्यूज़लेटर की सदस्यता लें',
            enterEmail: 'अपना ईमेल दर्ज करें',
            subscribe: 'सदस्यता लें',
            followUs: 'हमें फॉलो करें',
            paymentMethods: 'स्वीकृत भुगतान विधियां',
            copyright: '© 2026 ECOM। सर्वाधिकार सुरक्षित।',
        },
    }
};

export const getTranslation = (lang, path) => {
    const keys = path.split('.');
    let value = translations[lang] || translations.en;

    for (const key of keys) {
        value = value?.[key];
        if (value === undefined) {
            // Fallback to English if translation not found
            value = translations.en;
            for (const k of keys) {
                value = value?.[k];
            }
            break;
        }
    }

    return value || path;
};
