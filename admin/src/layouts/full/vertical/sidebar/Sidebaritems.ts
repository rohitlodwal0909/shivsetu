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
  



{
  id: 1,
  name: "Puja Management",
  items: [
    {
      heading: "Puja & Seva",
      children: [
        // {
        //   id: uniqueId(),
        //   name: "Jyotirling",
        //   icon: "ph:temple-thin",
        //   url: "/admin/puja-management/jyotirling",
        // },
          {
          id: uniqueId(),
          name: "Puja Categories",
          icon: "ph:list-bullets-thin",
          url: "/admin/puja-management/puja-category",
        },
        {
          id: uniqueId(),
          name: "Pujas",
          icon: "ph:flower-lotus-thin",
          url: "/admin/puja-management/pujas",
        },
      
        {
          id: uniqueId(),
          name: "Bookings",
          icon: "ph:calendar-check-thin",
          url: "/admin/puja-management/bookings",
        },
        {
          id: uniqueId(),
          name: "Pandit Management",
          icon: "ph:user-thin",
          url: "/admin/puja-management/pandits",
        },
        // {
        //   id: uniqueId(),
        //   name: "Prasad Dispatch",
        //   icon: "ph:package-thin",
        //   url: "/admin/puja-management/prasad",
        // },
        // {
        //   id: uniqueId(),
        //   name: "Donations & Seva",
        //   icon: "ph:hand-heart-thin",
        //   url: "/admin/puja-management/donations",
        // },
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
          url: "/admin/tour-management/packages",
        },
         {
          id: uniqueId(),
          name: "Cabs",
          icon: "ph:map-trifold-thin",
          url: "/admin/tour-management/cabs",
        },
        // {
        //   id: uniqueId(),
        //   name: "Itineraries",
        //   icon: "ph:calendar-thin",
        //   url: "/admin/tour-management/itineraries",
        // },
        {
          id: uniqueId(),
          name: "Bookings",
          icon: "ph:ticket-thin",
          url: "/admin/tour-management/bookings",
        },
        // {
        //   id: uniqueId(),
        //   name: "Hotels",
        //   icon: "ph:buildings-thin",
        //   url: "/admin/tour-management/hotels",
        // },
        // {
        //   id: uniqueId(),
        //   name: "Transport",
        //   icon: "ph:bus-thin",
        //   url: "/admin/tour-management/transport",
        // },
        // {
        //   id: uniqueId(),
        //   name: "Tour Guides",
        //   icon: "ph:user-circle-thin",
        //   url: "/admin/tour-management/guides",
        // },
        // {
        //   id: uniqueId(),
        //   name: "Yatra Tracking",
        //   icon: "ph:map-pin-line-thin",
        //   url: "/admin/tour-management/tracking",
        // },
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
          url: "/admin/product-management/category",
        },
        {
          id: uniqueId(),
          name: "Products",
          icon: "ph:shopping-bag-thin",
          url: "/admin/product-management/products",
        },
        {
          id: uniqueId(),
          name: "Orders",
          icon: "ph:clipboard-text-thin",
          url: "/admin/product-management/orders",
        },
        // {
        //   id: uniqueId(),
        //   name: "Sellers / Temples",
        //   icon: "ph:storefront-thin",
        //   url: "/admin/shop/sellers",
        // },
        // {
        //   id: uniqueId(),
        //   name: "Inventory",
        //   icon: "ph:warehouse-thin",
        //   url: "/admin/shop/inventory",
        // },
        // {
        //   id: uniqueId(),
        //   name: "Returns & Refunds",
        //   icon: "ph:arrow-counter-clockwise-thin",
        //   url: "/admin/shop/refunds",
        // },
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
          url: "/admin/home-management/sliders",
        },
         {
          id: uniqueId(),
          name: "Marquee",
          icon: "ph:temple-thin",
          url: "/admin/home-management/marquee",
        },
        {
          id: uniqueId(),
          name: "Blog",
          icon: "ph:temple-thin",
          url: "/admin/home-management/blogs",
        },
         {
          id: uniqueId(),
          name: "Client Reviews",
          icon: "ph:temple-thin",
          url: "/admin/home-management/client-reviews",
        },
      ],
    },
  ],
},
];

export default SidebarContent;
