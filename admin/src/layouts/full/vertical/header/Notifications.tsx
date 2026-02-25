import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Badge, Button, Dropdown, Avatar } from 'flowbite-react';
import SimpleBar from 'simplebar-react';
import { toast } from 'react-toastify';

import notificationicon from '../../../../assets/images/logos/notification2.png';
import notificationicon2 from '../../../../assets/images/logos/notification.png';

const Notifications = () => {
  const navigate = useNavigate();

  const [notificationList, setNotificationList] = useState<any[]>([]);

  // Fetch notifications

  // Sync redux → local state
  // useEffect(() => {
  //   if (notifications) {
  //     setNotificationList(notifications);
  //   }
  // }, [notifications]);

  // Mark as read
  const handleRead = async (id: number) => {
    try {
      const updatedItem = [];

      setNotificationList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)),
      );
    } catch (error) {
      toast.error('Failed to update notification');
    }
  };

  const handleSeeAllClick = () => {
    document.body.click(); // close dropdown
    navigate('/notifications');
  };

  const unreadCount = notificationList?.filter((n) => n.is_read === 0)?.length || 0;

  return (
    <div className="relative group/menu">
      <Dropdown
        label=""
        dismissOnClick={false}
        className="w-screen sm:w-[360px] py-6 rounded-sm"
        renderTrigger={() => (
          <div className="relative">
            <span className="h-10 w-10 hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer">
              <Icon icon="solar:bell-bing-line-duotone" height={20} />
            </span>
            {unreadCount > 0 && (
              <span className="absolute end-1 top-1 bg-error text-[10px] h-4 w-4 flex items-center justify-center rounded-full text-white">
                {unreadCount}
              </span>
            )}
          </div>
        )}
      >
        {/* Header */}
        <div className="flex items-center px-6 justify-between">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <Badge color="primary">{unreadCount}</Badge>
        </div>

        {/* Notification List */}
        <SimpleBar className="max-h-80 mt-3">
          {notificationList?.map((item: any) => (
            <Dropdown.Item
              key={item.id}
              className="px-6 py-3 flex items-start gap-4"
              onClick={() => handleRead(item.id)}
            >
              <Avatar
                img={item.is_read === 0 ? notificationicon : notificationicon2}
                rounded
                status={item.is_read === 0 ? 'online' : 'busy'}
                statusPosition="bottom-right"
              />

              <div className="flex justify-between w-full">
                <div className="w-3/4">
                  <h5
                    className={`text-sm mb-1 ${
                      item.is_read === 0 ? 'font-semibold text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {item.title}
                  </h5>
                  <p
                    className={`text-xs line-clamp-1 ${
                      item.is_read === 0 ? 'text-gray-800' : 'text-gray-400'
                    }`}
                  >
                    {item.message}
                  </p>
                </div>

                {item.date_time && (
                  <div className="text-right text-xs text-gray-500">
                    <div>
                      {new Date(item.date_time).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </div>
                    <div>{new Date(item.date_time).toLocaleDateString()}</div>
                  </div>
                )}
              </div>
            </Dropdown.Item>
          ))}
        </SimpleBar>

        {/* Footer */}
        <div className="pt-5 px-6">
          <Button color="primary" outline pill className="w-full" onClick={handleSeeAllClick}>
            See All Notifications
          </Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Notifications;
