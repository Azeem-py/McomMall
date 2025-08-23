'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Car,
  Megaphone,
  Users,
  Map,
  Mic,
  Briefcase,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const categories = [
  { name: 'Apartments', count: 12, icon: <Home /> },
  { name: 'Cars', count: 8, icon: <Car /> },
  { name: 'Classifieds', count: 25, icon: <Megaphone /> },
  { name: 'Coaching', count: 5, icon: <Users /> },
  { name: 'Eat & Drink', count: 32, icon: <Map /> },
  { name: 'Events', count: 18, icon: <Mic /> },
  { name: 'Jobs', count: 45, icon: <Briefcase /> },
  { name: 'Health', count: 22, icon: <Heart /> },
  { name: 'Shopping', count: 50, icon: <ShoppingCart /> },
];

export function PopularCategoriesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.offsetWidth * 0.8; // Scroll by 80% of the container width
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const cardVariants = {
    hover: {
      y: -10,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
      },
    },
  } as const; // FIX: Added 'as const' to solve the error

  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Popular Categories
            </h2>
            <div className="mt-4 flex justify-center">
              <div className="w-24 h-1 bg-orange-500 rounded-full" />
            </div>
          </div>

          {/* Scroll Buttons */}
          <div className="absolute inset-y-0 left-0 hidden md:flex items-center z-10">
            <button
              onClick={() => scroll('left')}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 hidden md:flex items-center z-10">
            <button
              onClick={() => scroll('right')}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-48 h-48 bg-gray-50 border border-gray-200 rounded-lg flex flex-col items-center justify-center text-center p-4 cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="text-orange-500 mb-3">
                  {React.cloneElement(category.icon, {
                    size: 40,
                    strokeWidth: 1.5,
                  })}
                </div>
                <p className="font-semibold text-gray-800">{category.name}</p>
                <span className="mt-2 text-sm text-white bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center">
                  {category.count}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
