// components/NavMenu.tsx
'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDown, Menu as MenuIcon, X as XIcon } from 'lucide-react';

// --- Reusable ListItem Component ---
const ListItem = ({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-600 focus:bg-slate-600"
    >
      <div className="text-sm font-semibold leading-none text-white">
        {title}
      </div>
      {children && (
        <p className="line-clamp-2 text-sm leading-snug text-slate-300">
          {children}
        </p>
      )}
    </Link>
  );
};

// --- Menu Data ---
const menuItems = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Seasons',
    content: (
      <div className="w-64 p-4">
        <ListItem href="/seasons/winter" title="Winter">
          Seasonal specials and winter collections.
        </ListItem>
        <ListItem href="/seasons/spring" title="Spring">
          Fresh arrivals for the spring season.
        </ListItem>
        <ListItem href="/seasons/summer" title="Summer">
          Explore our summer sales and new items.
        </ListItem>
      </div>
    ),
  },
  {
    title: 'Business Category',
    content: (
      <div className="grid w-screen max-w-lg grid-cols-2 gap-x-6 gap-y-4 p-4">
        <div>
          <h3 className="mb-2.5 text-lg font-semibold text-white">Services</h3>
          <ul>
            <li>
              <ListItem href="/categories/automotive" title="Automotive" />
            </li>
            <li>
              <ListItem href="/categories/financial" title="Financial" />
            </li>
            <li>
              <ListItem href="/categories/legal" title="Legal" />
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2.5 text-lg font-semibold text-white">Shopping</h3>
          <ul>
            <li>
              <ListItem href="/categories/clothing" title="Clothing" />
            </li>
            <li>
              <ListItem href="/categories/electronics" title="Electronics" />
            </li>
            <li>
              <ListItem href="/categories/home-goods" title="Home Goods" />
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2.5 text-lg font-semibold text-white">
            Food & Drink
          </h3>
          <ul>
            <li>
              <ListItem href="/categories/restaurants" title="Restaurants" />
            </li>
            <li>
              <ListItem href="/categories/cafes" title="Cafes" />
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2.5 text-lg font-semibold text-white">
            Health & Beauty
          </h3>
          <ul>
            <li>
              <ListItem href="/categories/gyms" title="Gyms" />
            </li>
            <li>
              <ListItem href="/categories/salons" title="Salons" />
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: 'Listings',
    content: (
      <div className="w-64 p-4">
        <ListItem href="/listings/claim" title="Claim Listing">
          Find and claim your business profile.
        </ListItem>
        <ListItem href="/listings/new" title="Create New Listing">
          Add your business to our directory.
        </ListItem>
      </div>
    ),
  },
];

// --- Animation Variants ---
const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -5, scale: 0.98, transition: { duration: 0.2 } },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

const mobileMenuVariants: Variants = {
  closed: { x: '100%', transition: { duration: 0.3, ease: 'easeInOut' } },
  open: { x: '0%', transition: { duration: 0.3, ease: 'easeInOut' } },
};

export function NavMenu() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(
    null
  );

  // Delay timer for closing dropdown
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (title: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoveredItem(title);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setHoveredItem(null);
    }, 200); // small delay before closing
  };

  // --- Mobile Menu ---
  const MobileMenu = () => (
    <div className="md:hidden">
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="p-2 text-white transition-colors hover:text-red-400"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 flex flex-col bg-slate-800 p-4"
          >
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-semibold text-white">
                McomMall
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col space-y-2">
              {menuItems.map(item => {
                const isSubMenuOpen = openMobileSubMenu === item.title;

                if (item.href) {
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-md px-4 py-2 text-lg text-white transition-colors hover:bg-slate-700"
                    >
                      {item.title}
                    </Link>
                  );
                }

                return (
                  <div key={item.title}>
                    <button
                      onClick={() =>
                        setOpenMobileSubMenu(isSubMenuOpen ? null : item.title)
                      }
                      className="flex w-full items-center justify-between rounded-md px-4 py-2 text-lg text-white transition-colors hover:bg-slate-700"
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          isSubMenuOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isSubMenuOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4"
                        >
                          <div
                            className="mt-2 border-l-2 border-slate-600 pl-4"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // --- Desktop Menu ---
  const DesktopMenu = () => (
    <nav className="hidden items-center space-x-2 md:flex bg-slate-800">
      {menuItems.map((item, index) => (
        <div
          key={item.title}
          className="relative"
          onMouseEnter={() => handleMouseEnter(item.title)}
          onMouseLeave={handleMouseLeave}
        >
          {item.href ? (
            <Link
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              {item.title}
            </Link>
          ) : (
            <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700">
              {item.title}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  hoveredItem === item.title ? 'rotate-180' : ''
                }`}
              />
            </button>
          )}

          <AnimatePresence>
            {hoveredItem === item.title && item.content && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`absolute top-full z-20 mt-2 rounded-lg bg-slate-700 text-white shadow-lg 
                  ${index === menuItems.length - 1 ? 'right-0' : 'left-0'}`}
              >
                {item.content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      <DesktopMenu />
      <MobileMenu />
    </>
  );
}
