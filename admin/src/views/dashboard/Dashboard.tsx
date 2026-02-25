import React from 'react';
import Logo from 'src/assets/images/logos/loginlogo.png';
import CardBox from 'src/components/shared/CardBox';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <CardBox>
          <div className="flex flex-col items-center text-center py-10 px-4">
            {/* Logo */}
            <img src={Logo} alt="ShivSetu Logo" width={100} height={100} className="mb-2" />

            {/* Title */}
            <h1 className="text-2xl font-semibold text-gray-800">
              ShivSetu <span className="text-base font-normal">(शिवसेतु)</span>
            </h1>

            {/* Tagline */}
            <p className="text-sm text-gray-600 mt-1">
              Spiritual Services • Sacred Journeys • Divine Products
            </p>

            {/* Divider */}
            <div className="w-20 h-[2px] bg-blue-500 rounded-full my-5"></div>

            {/* Description */}
            <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
              ShivSetu is a unified spiritual platform offering tour management, puja booking
              services and sacred product shopping – connecting devotees with temples, traditions
              and trusted offerings.
            </p>

            {/* Services */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
              {/* Tour Management */}
              <div className="border rounded-lg p-5 text-center hover:shadow-md transition">
                <div className="text-3xl mb-2">🚩</div>
                <h3 className="font-semibold text-gray-700">Tour Management</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Manage yatras, temple visits and spiritual journeys.
                </p>
              </div>

              {/* Puja Services */}
              <div className="border rounded-lg p-5 text-center hover:shadow-md transition">
                <div className="text-3xl mb-2">🛕</div>
                <h3 className="font-semibold text-gray-700">Puja Services</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Book and manage pujas with trusted pandits and temples.
                </p>
              </div>

              {/* Spiritual Shopping */}
              <div className="border rounded-lg p-5 text-center hover:shadow-md transition">
                <div className="text-3xl mb-2">🛍️</div>
                <h3 className="font-semibold text-gray-700">Spiritual Shopping</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Sell and manage puja items, idols and sacred products.
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="mt-8 px-6 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
              🚧 Platform under development — Modules coming soon
            </div>

            {/* Footer line */}
            <p className="mt-4 text-xs text-gray-400">Admin Dashboard • ShivSetu Platform</p>
          </div>
        </CardBox>
      </div>
    </div>
  );
};

export default Dashboard;
