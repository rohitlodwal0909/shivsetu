import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { Avatar } from 'flowbite-react';
import notificationicon from '../../assets/images/logos/notification2.png';
import notificationicon2 from '../../assets/images/logos/notification.png';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { AppDispatch } from 'src/store';
const SeeAllNotifications = () => {
  const [notificationList, setNotificationList] = useState([]);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const notificationId = location.key;

  useEffect(() => {
    const fetchnotification = async () => {
      try {
      } catch (error) {
        toast.error(error || 'Failed to fetch leads'); // or use alert or console
        //  console.error("Error fetching leads:", error);
      }
    };
    if (notificationId || location.state === null) {
      fetchnotification();
    }
    fetchnotification();
    setNotificationList([]);
  }, [dispatch, notificationId]);

  return (
    <div>
      <BreadcrumbComp items={[{ title: 'Notifications', to: '/' }]} title="Notifications" />

      {/* <Badge color={"primary"}>{notificationList?.filter((items)=> items?.is_read ==0).length}</Badge> */}
      <CardBox>
        <ul className="w-full  rounded-sm">
          {notificationList.map((links) => (
            <li
              // as={Link}
              // to="#"

              className={`px-6 py-3 cursor-pointer flex justify-between items-center w-full hover:bg-gray-100`}
              key={links.id}
            >
              <div className="flex items-center w-full">
                <div
                  className={`h-11 w-11 flex-shrink-0 rounded-full flex justify-center items-center ${links.bgcolor} `}
                >
                  <Avatar
                    img={links.is_read == 0 ? notificationicon : notificationicon2}
                    rounded
                    status={links.is_read == 0 ? 'online' : 'busy'}
                    statusPosition="bottom-right"
                    // 👈 controls the image size
                  />
                  {/* <Icon icon='basil:notification-on-outline' className="text-blue-500" /> */}
                </div>
                <div className="ps-4 flex justify-between w-full">
                  <div className="w-3/4 text-start">
                    <h5
                      className={`mb-1 text-sm ${
                        links.is_read == 0
                          ? 'text-gray-900 font-semibold'
                          : 'text-gray-500 font-normal'
                      } group-hover/link:text-primary`}
                    >
                      {links.title}
                    </h5>
                    <div className="text-xs text-darklink line-clamp-1">{links.message}</div>
                  </div>

                  {links.date_time && (
                    <div>
                      <div className="text-xs block self-start pt-1.5">
                        {new Date(links.date_time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </div>
                      <div className="text-xs block self-start pt-0.5 text-gray-500">
                        {new Date(links.date_time).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardBox>
    </div>
  );
};

export default SeeAllNotifications;
