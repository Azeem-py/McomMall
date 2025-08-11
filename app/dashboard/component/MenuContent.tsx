'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  mainMenuItems,
  listingMenuItems,
  storeMenuItems,
} from '@/lib/menu-items';

// An optional prop to close the menu on link click (for mobile)
interface MenuContentProps {
  onLinkClick?: () => void;
}

export const MenuContent = ({ onLinkClick }: MenuContentProps) => {
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSubMenu = (title: string) => {
    setOpenSubMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const renderMenuItems = (items: typeof mainMenuItems) => (
    <ul className="space-y-1">
      {items.map((item, i) => (
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
                onClick={onLinkClick} // Close mobile menu on click
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
                      className="block py-1 text-gray-600 hover:text-red-500 text-sm transition-colors pl-8"
                      onClick={onLinkClick} // Close mobile menu on click
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
  );

  return (
    <>
      <nav>
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2 px-2">
          Main
        </h3>
        {renderMenuItems(mainMenuItems)}
      </nav>
      <nav className="mt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2 px-2">
          Listing
        </h3>
        {renderMenuItems(listingMenuItems)}
      </nav>
      <nav className="mt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2 px-2">
          Store
        </h3>
        {renderMenuItems(storeMenuItems)}
      </nav>
    </>
  );
};
