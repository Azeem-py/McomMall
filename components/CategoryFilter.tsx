'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  LucideGrid,
  LucideHome,
  LucideCar,
  LucideMegaphone,
  LucideUsers,
  LucideChevronLeft,
  LucideChevronRight,
} from 'lucide-react';

const CategoryFilter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: 'All', icon: <LucideGrid className="w-5 h-5" /> },
    { name: 'Apartments', icon: <LucideHome className="w-5 h-5" /> },
    { name: 'Cars', icon: <LucideCar className="w-5 h-5" /> },
    { name: 'Classifieds', icon: <LucideMegaphone className="w-5 h-5" /> },
    { name: 'Coaching', icon: <LucideUsers className="w-5 h-5" /> },
    { name: 'Food', icon: <LucideUsers className="w-5 h-5" /> }, // Using Users icon as a placeholder
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 150;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="relative w-full flex items-center my-5">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Scroll left"
      >
        <LucideChevronLeft className="w-5 h-5 text-red-500" />
      </button>
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto hide-scrollbar w-full py-2"
        style={{ scrollBehavior: 'smooth' }}
      >
        {categories.map(category => (
          <motion.div
            key={category.name}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer ${
              selectedCategory === category.name
                ? 'bg-red-100 text-red-500'
                : 'bg-gray-100 text-gray-600 hover:bg-red-200 hover:text-red-700'
            }`}
            whileHover={{
              scale: 1.1,
              transition: { type: 'spring', stiffness: 300, damping: 10 },
            }}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.icon}
            <span className="text-sm font-medium">{category.name}</span>
          </motion.div>
        ))}
      </div>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Scroll right"
      >
        <LucideChevronRight className="w-5 h-5 text-red-500" />
      </button>
    </div>
  );
};

export default CategoryFilter;
