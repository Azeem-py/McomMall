// components/NavMenu.tsx
'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDown, Menu as MenuIcon, X as XIcon } from 'lucide-react';
import { businessCategories } from '../lib/business-categories';

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
      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
    >
      <div className="text-sm font-semibold leading-none text-gray-900">
        {title}
      </div>
      {children && (
        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
          {children}
        </p>
      )}
    </Link>
  );
};

// --- Business Category Menu Component ---
const BusinessCategoryMenu = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
    null
  );

  const handleCategoryHover = (category: string) => {
    setActiveCategory(category);
    setActiveSubCategory(null); // Reset sub-category when main category changes
  };

  const currentCategory = businessCategories.find(
    c => c.category === activeCategory
  );
  const currentSubCategory = currentCategory?.subCategories.find(
    sc => sc.name === activeSubCategory
  );

  return (
    <div className="flex" onMouseLeave={() => setActiveCategory(null)}>
      {/* Panel 1: Main Categories */}
      <div className="w-64 border-r border-gray-200 p-4">
        <ul className="space-y-2">
          {businessCategories.map(category => (
            <li key={category.category}>
              <button
                className="flex w-full items-center justify-between rounded-md p-2 text-left font-semibold text-gray-800 hover:bg-gray-100"
                onMouseEnter={() => handleCategoryHover(category.category)}
              >
                <span>{category.category}</span>
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Panel 2: Sub-categories */}
      <AnimatePresence>
        {currentCategory && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="w-64 border-r border-gray-200 p-4"
          >
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              {currentCategory.category}
            </h3>
            <ul className="space-y-2">
              {currentCategory.subCategories.map(subCategory => (
                <li key={subCategory.name}>
                  <button
                    className="flex w-full items-center justify-between rounded-md p-2 text-left font-semibold text-gray-800 hover:bg-gray-100"
                    onMouseEnter={() => setActiveSubCategory(subCategory.name)}
                  >
                    <span>{subCategory.name}</span>
                    {subCategory.items.length > 0 && (
                      <ChevronDown className="h-4 w-4 -rotate-90" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel 3: Items */}
      <AnimatePresence>
        {currentSubCategory && currentSubCategory.items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="w-64 p-4"
          >
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              {currentSubCategory.name}
            </h3>
            <ul className="space-y-2">
              {currentSubCategory.items.map(item => (
                <li key={item}>
                  <Link
                    href={`/categories/${item
                      .toLowerCase()
                      .replace(/ /g, '-')}`}
                    className="block rounded-md p-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
        <ListItem href="/seasons/autumn" title="Autumn">
          Explore our autumn sales and new items.
        </ListItem>
      </div>
    ),
  },
  {
    title: 'Business Category',
    content: <BusinessCategoryMenu />,
  },
  {
    title: 'Listings',
    content: (
      <div className="w-64 p-4">
        <ListItem href="/listings" title="Claim Listing">
          Find and claim your business profile.
        </ListItem>
        <ListItem href="/dashboard/add-listing" title="Create New Listing">
          Add your business to our directory.
        </ListItem>
      </div>
    ),
  },
  {
    title: 'Pricing',
    href: '/pricing',
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
            className="fixed inset-0 z-50 flex flex-col bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-semibold text-gray-900">
                McomMall
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-900"
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
                      className="rounded-md px-4 py-2 text-lg text-gray-900 transition-colors hover:bg-gray-100"
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
                      className="flex w-full items-center justify-between rounded-md px-4 py-2 text-lg text-gray-900 transition-colors hover:bg-gray-100"
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
                            className="mt-2 border-l-2 border-gray-200 pl-4"
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
                className={`absolute top-full z-20 mt-2 rounded-lg bg-white text-gray-900 shadow-lg
                  ${
                    item.title === 'Business Category'
                      ? 'left-1/2 -translate-x-1/2'
                      : index === menuItems.length - 1
                      ? 'right-0'
                      : 'left-0'
                  }`}
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
