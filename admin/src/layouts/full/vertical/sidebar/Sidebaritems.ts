export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  

  // {
  //   id: 2,
  //   name: "Dashboard",
  //   items: [
  //     {
  //       heading: "Dashboard",
  //       children: [
  //         {
  //           name: "Chat",
  //           icon: "carbon:report",
  //           id: uniqueId(),
  //           url: "/chats",
  //         },
  //         {
  //           name: "Permission",
  //           icon: "arcticons:permissionsmanager",
  //           id: uniqueId(),
  //           url: "/permission",
  //         }
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 2,
  //   name: "Menu",
  //   items: [
  //     {
  //       heading: "Multi level",
  //       children: [
  //         {
  //           name: "Menu Level",
  //           icon: "solar:widget-add-line-duotone",
  //           id: uniqueId(),
  //           children: [
  //             {
  //               id: uniqueId(),
  //               name: "Level 1",
  //               url: "",
  //             },
  //             {
  //               id: uniqueId(),
  //               name: "Level 1.1",
  //               icon: "fad:armrecording",
  //               url: "",
  //               children: [
  //                 {
  //                   id: uniqueId(),
  //                   name: "Level 2",
  //                   url: "",
  //                 },
  //                 {
  //                   id: uniqueId(),
  //                   name: "Level 2.1",
  //                   icon: "fad:armrecording",
  //                   url: "",
  //                   children: [
  //                     {
  //                       id: uniqueId(),
  //                       name: "Level 3",
  //                       url: "",
  //                     },
  //                     {
  //                       id: uniqueId(),
  //                       name: "Level 3.1",
  //                       url: "",
  //                     },
  //                   ],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       heading: "More Options",
  //       children: [
  //         {
  //           id: uniqueId(),
  //           url: "/sample-page",
  //           name: "Applications",
  //           icon: "solar:check-circle-bold",
  //           color: "text-primary",
  //         },
  //         {
  //           id: uniqueId(),
  //           url: "",
  //           name: "Form Options",
  //           icon: "solar:check-circle-bold",
  //           color: "text-secondary",
  //         },
  //         {
  //           id: uniqueId(),
  //           url: "",
  //           name: "Table Variations",
  //           icon: "solar:check-circle-bold",
  //           color: "text-info",
  //         },
  //         {
  //           id: uniqueId(),
  //           url: "",
  //           name: "Charts Selection",
  //           icon: "solar:check-circle-bold",
  //           color: "text-warning",
  //         },
  //         {
  //           id: uniqueId(),
  //           url: "",
  //           name: "Widgets",
  //           icon: "solar:check-circle-bold",
  //           color: "text-success",
  //         },
  //       ],
  //     },
  //   ],
  // },

{
  id: 1,
  name: "Puja Management",
  items: [
    {
      heading: "Puja & Seva",
      children: [
        {
          id: uniqueId(),
          name: "Jyotirling",
          icon: "ph:temple-thin",
          url: "/puja-management/jyotirling",
        },
        {
          id: uniqueId(),
          name: "Pujas",
          icon: "ph:flower-lotus-thin",
          url: "/puja-management/pujas",
        },
        {
          id: uniqueId(),
          name: "Puja Categories",
          icon: "ph:list-bullets-thin",
          url: "/puja-management/puja-category",
        },
        {
          id: uniqueId(),
          name: "Bookings",
          icon: "ph:calendar-check-thin",
          url: "/puja-management/bookings",
        },
        {
          id: uniqueId(),
          name: "Pandit Management",
          icon: "ph:user-thin",
          url: "/puja-management/pandits",
        },
        {
          id: uniqueId(),
          name: "Prasad Dispatch",
          icon: "ph:package-thin",
          url: "/puja-management/prasad",
        },
        {
          id: uniqueId(),
          name: "Donations & Seva",
          icon: "ph:hand-heart-thin",
          url: "/puja-management/donations",
        },
      ],
    },
  ],
},
{
  id: 2,
  name: "Tour Management",
  items: [
    {
      heading: "Yatra & Tours Module",
      children: [
        {
          id: uniqueId(),
          name: "Yatra Packages",
          icon: "ph:map-trifold-thin",
          url: "/tour-management/packages",
        },
         {
          id: uniqueId(),
          name: "Cabs",
          icon: "ph:map-trifold-thin",
          url: "/tour-management/cabs",
        },
        {
          id: uniqueId(),
          name: "Itineraries",
          icon: "ph:calendar-thin",
          url: "/tour-management/itineraries",
        },
        {
          id: uniqueId(),
          name: "Bookings",
          icon: "ph:ticket-thin",
          url: "/tour-management/bookings",
        },
        {
          id: uniqueId(),
          name: "Hotels",
          icon: "ph:buildings-thin",
          url: "/tour-management/hotels",
        },
        {
          id: uniqueId(),
          name: "Transport",
          icon: "ph:bus-thin",
          url: "/tour-management/transport",
        },
        {
          id: uniqueId(),
          name: "Tour Guides",
          icon: "ph:user-circle-thin",
          url: "/tour-management/guides",
        },
        {
          id: uniqueId(),
          name: "Yatra Tracking",
          icon: "ph:map-pin-line-thin",
          url: "/tour-management/tracking",
        },
      ],
    },
  ],
},
{
  id: 3,
  name: "Shop Management",
  items: [
    {
      heading: "Spiritual Store",
      children: [
        {
          id: uniqueId(),
          name: "Categories",
          icon: "ph:list-thin",
          url: "/product-management/category",
        },
        {
          id: uniqueId(),
          name: "Products",
          icon: "ph:shopping-bag-thin",
          url: "/product-management/products",
        },
        {
          id: uniqueId(),
          name: "Orders",
          icon: "ph:clipboard-text-thin",
          url: "product-management/orders",
        },
        {
          id: uniqueId(),
          name: "Sellers / Temples",
          icon: "ph:storefront-thin",
          url: "/shop/sellers",
        },
        {
          id: uniqueId(),
          name: "Inventory",
          icon: "ph:warehouse-thin",
          url: "/shop/inventory",
        },
        {
          id: uniqueId(),
          name: "Returns & Refunds",
          icon: "ph:arrow-counter-clockwise-thin",
          url: "/shop/refunds",
        },
      ],
    },
  ],
},
{
  id: 4,
  name: "Home Management",
  items: [
    {
      heading: "Home Section",
      children: [
        {
          id: uniqueId(),
          name: "Sliders",
          icon: "ph:temple-thin",
          url: "/home-management/sliders",
        },
         {
          id: uniqueId(),
          name: "Marquee",
          icon: "ph:temple-thin",
          url: "/home-management/marquee",
        },
        {
          id: uniqueId(),
          name: "Blog",
          icon: "ph:temple-thin",
          url: "/home-management/blogs",
        },
      ],
    },
  ],
},



];

export default SidebarContent;
