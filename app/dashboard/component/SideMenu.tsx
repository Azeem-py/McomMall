'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  BookOpen,
  Plus,
  List,
  ChevronDown,
  Wallet,
  ShoppingCart,
  UserStar,
  Bookmark,
  BanknoteArrowDown,
  ShoppingBag,
  SquareDashedKanban,
  Settings,
} from 'lucide-react';

const SideMenu = () => {
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>(
    {}
  );

  const mainMenuItems = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { title: 'My Bookings', href: '/dashboard/my-bookings', icon: Calendar },
    { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
    { title: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
    {
      title: 'Bookings',
      href: '/dashboard/bookings',
      icon: BookOpen,
      subMenu: [
        { title: 'Calendar View', href: '/dashboard/bookings/calendar' },
        { title: 'QR Scanner', href: '/dashboard/bookings/qr-scanner' },
        { title: 'Pending', href: '/dashboard/bookings/pending' },
        { title: 'Approved', href: '/dashboard/bookings/approved' },
        { title: 'Cancelled', href: '/dashboard/bookings/cancelled' },
      ],
    },
  ];

  const listingMenuItems = [
    { title: 'Add listing', href: '/dashboard/add-listing', icon: Plus },
    { title: 'My Bookings', href: '/dashboard/my-bookings', icon: Calendar },
    { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
    {
      title: 'My listings',
      href: '/dashboard/my-listings',
      icon: List,
      subMenu: [
        { title: 'Active', href: '/dashboard/my-listings/active' },
        { title: 'Pending', href: '/dashboard/my-listings/pending' },
        { title: 'Expired', href: '/dashboard/my-listings/expired' },
      ],
    },
    { title: 'Coupons', href: '/dashboard/coupons', icon: ShoppingCart },
    { title: 'Reviews', href: '/dashboard/reviews', icon: UserStar },
    { title: 'Boomarks', href: '/dashboard/bookmarks', icon: Bookmark },
  ];

  const storeMenuItems = [
    { title: 'Dashboard', href: '/dashboard/store', icon: LayoutDashboard },
    {
      title: 'Products',
      href: '/dashboard/store/products',
      icon: SquareDashedKanban,
    },
    { title: 'Orders', href: '/dashboard/store/orders', icon: ShoppingBag },
    {
      title: 'Withdraw',
      href: '/dashboard/store/withdraw',
      icon: BanknoteArrowDown,
    },
    {
      title: 'Settings',
      href: '/dashboard/store/settings',
      icon: Settings,
      subMenu: [
        { title: 'Store', href: '/dashboard/store/settings' },
        { title: 'Payment', href: '/dashboard/store/settings/payment' },
      ],
    },
  ];

  const toggleSubMenu = (title: string) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className="w-64 bg-gray-100 h-11/12 p-4 overflow-y-auto">
      <nav>
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Main
        </h3>
        <ul className="space-y-1">
          {mainMenuItems.map((item, i) => (
            <li key={i}>
              <motion.div
                whileHover={{ scale: 1.02, backgroundColor: '#ffffff' }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl"
              >
                <div
                  className="flex items-center justify-between p-2 text-gray-700 hover:text-red-500 transition-colors cursor-pointer rounded-2xl hover:shadow hover:bg-white"
                  onClick={() => item.subMenu && toggleSubMenu(item.title)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2"
                  >
                    <item.icon className="w-5 h-5 text-red-500" />
                    <span>{item.title}</span>
                  </Link>
                  {item.subMenu && (
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openSubMenus[item.title] ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>
              </motion.div>
              <AnimatePresence>
                {item.subMenu && openSubMenus[item.title] && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 mt-1 space-y-1 overflow-hidden"
                  >
                    {item.subMenu.map((subItem, j) => (
                      <li key={j}>
                        <Link
                          href={subItem.href}
                          className="block text-gray-600 hover:text-red-500 text-sm transition-colors pl-7"
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="mt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Listing
        </h3>
        <ul className="space-y-2">
          {listingMenuItems.map((item, i) => (
            <li key={i}>
              <motion.div
                whileHover={{ scale: 1.02, backgroundColor: '#ffffff' }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl"
              >
                <div
                  className="flex items-center justify-between p-2 text-gray-700 hover:text-red-500 transition-colors cursor-pointer rounded-2xl hover:shadow hover:bg-white"
                  onClick={() => item.subMenu && toggleSubMenu(item.title)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2"
                  >
                    <item.icon className="w-5 h-5 text-red-500" />
                    <span>{item.title}</span>
                  </Link>
                  {item.subMenu && (
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openSubMenus[item.title] ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>
              </motion.div>
              <AnimatePresence>
                {item.subMenu && openSubMenus[item.title] && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 mt-1 space-y-1 overflow-hidden"
                  >
                    {item.subMenu.map((subItem, j) => (
                      <li key={j}>
                        <Link
                          href={subItem.href}
                          className="block text-gray-600 hover:text-red-500 text-sm transition-colors pl-7"
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="mt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Store
        </h3>
        <ul className="space-y-2">
          {storeMenuItems.map((item, i) => (
            <li key={i}>
              <motion.div
                whileHover={{ scale: 1.02, backgroundColor: '#ffffff' }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl"
              >
                <div
                  className="flex items-center justify-between p-2 text-gray-700 hover:text-red-500 transition-colors cursor-pointer rounded-2xl hover:shadow hover:bg-white"
                  onClick={() => item.subMenu && toggleSubMenu(item.title)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2"
                  >
                    <item.icon className="w-5 h-5 text-red-500" />
                    <span>{item.title}</span>
                  </Link>
                  {item.subMenu && (
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openSubMenus[item.title] ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>
              </motion.div>
              <AnimatePresence>
                {item.subMenu && openSubMenus[item.title] && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 mt-1 space-y-1 overflow-hidden"
                  >
                    {item.subMenu.map((subItem, j) => (
                      <li key={j}>
                        <Link
                          href={subItem.href}
                          className="block text-gray-600 hover:text-red-500 text-sm transition-colors pl-7"
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
