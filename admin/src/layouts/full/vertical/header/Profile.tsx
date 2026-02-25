import { Icon } from '@iconify/react';
import { Button, Dropdown } from 'flowbite-react';
import * as profileData from './Data';
import SimpleBar from 'simplebar-react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomizerContext } from 'src/context/CustomizerContext';
import { useContext, useState } from 'react';
import Logoutmodel from './Logoutmodel';
import Logo from 'src/assets/images/logos/loginlogo.png';

const Profile = () => {
  const navigate = useNavigate();
  const { setIsCollapse, isCollapse } = useContext(CustomizerContext);

  const [isOpen, setIsOpen] = useState(false);

  const handleprofile = () => {
    navigate('/user-profile');
  };
  const handlelogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('admin/login');
    setIsOpen(false);
  };

  return (
    <div className="relative group/menu">
      <Dropdown
        label=""
        dismissOnClick
        className="w-screen sm:w-[360px] py-6 rounded-sm"
        renderTrigger={() => (
          <span className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer">
            <img src={Logo} alt="profile" height="35" width="35" className="rounded-full" />
          </span>
        )}
      >
        {/* Profile Header */}
        <div className="px-6 cursor-pointer" onClick={handleprofile}>
          <h3 className="text-lg font-semibold">User Profile</h3>
          <div className="flex items-center gap-6 pb-5 border-b mt-5 mb-3">
            <img src={Logo} alt="profile" height="80" width="80" className="rounded-full" />

            <div>
              <h5 className="font-semibold">Shiv Setu</h5>
              <span className="text-sm text-gray-500">Admin</span>
              <p className="text-sm mt-1 flex items-center">
                <Icon icon="solar:mailbox-line-duotone" className="me-1" />
                shivsetu@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <SimpleBar style={{ maxHeight: 300 }}>
          {profileData.profileDD.map((item, index) => (
            <Dropdown.Item
              as={Link}
              to={item.url}
              key={index}
              className="px-6 py-3 flex items-center gap-4"
              onClick={() =>
                setIsCollapse(isCollapse === 'full-sidebar' ? 'mini-sidebar' : 'full-sidebar')
              }
            >
              <div
                className={`h-11 w-11 rounded-md flex justify-center items-center ${item.bgcolor}`}
              >
                <Icon icon={item.icon} height={20} className={item.color} />
              </div>
              <div>
                <h5 className="text-sm font-medium">{item.title}</h5>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
            </Dropdown.Item>
          ))}
        </SimpleBar>

        {/* Logout Button */}
        <div className="pt-6 px-6">
          <Button color="primary" className="w-full" onClick={() => setIsOpen(true)}>
            Logout
          </Button>
        </div>
      </Dropdown>

      {/* Logout Modal */}
      <Logoutmodel isOpen={isOpen} setIsOpen={setIsOpen} handlelogout={handlelogout} />
    </div>
  );
};

export default Profile;
