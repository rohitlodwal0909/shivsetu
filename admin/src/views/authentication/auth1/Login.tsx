import Logo from 'src/assets/images/logos/loginlogo.png';
import AuthLogin from '../authforms/AuthLogin';
import LeftSidebarPart from '../LeftSidebarPart';

const Login = () => {
  return (
    <div className="relative overflow-hidden h-screen">
      <div className="grid grid-cols-12 gap-3 h-screen bg-white dark:bg-darkgray">
        {/* Left Sidebar */}
        <div className="xl:col-span-4 lg:col-span-4 col-span-12 bg-secondary lg:block hidden relative overflow-hidden">
          <LeftSidebarPart />
        </div>

        {/* Right Login Section */}
        <div className="xl:col-span-8 lg:col-span-8 col-span-12 sm:px-12 px-4">
          <div className="flex h-screen items-center px-3 lg:justify-start justify-center">
            <div className="max-w-[420px] w-full mx-auto">
              {/* Logo */}
              <div className="flex justify-center">
                <img src={Logo} alt="Company Logo" className="w-[150px]" />
              </div>

              <h3 className="text-2xl font-bold mb-3">ShivSetu Admin Login</h3>
              {/* Title */}

              {/* Tagline */}
              <p className="text-darklink text-sm font-medium">
                ShivSetu (शिवसेतु) – भक्त और शिव के बीच पावन सेतु
              </p>
              <AuthLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
