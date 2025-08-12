'use client';

import { useState, ElementType } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Home, Car, Wrench, Users, Utensils } from 'lucide-react';

const iconMap: { [key: string]: ElementType } = {
  LayoutGrid,
  Home,
  Car,
  Wrench,
  Users,
  Utensils,
};

interface CategoryFilterProps {
  categories: { name: string; icon: string }[];
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  onCategoryChange,
}: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
      {categories.map(category => {
        const Icon = iconMap[category.icon];
        const isActive = activeCategory === category.name;
        // Add a check to ensure the icon exists before rendering
        if (!Icon) return null;

        return (
          <motion.button
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className={`relative flex-shrink-0 px-4 py-3 text-sm font-medium border rounded-lg shadow-sm focus:outline-none ${
              isActive ? 'text-white' : 'text-gray-600 bg-white'
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-red-500 rounded-lg"
                transition={{ duration: 0.3 }}
              />
            )}
            <span className="relative z-10 flex items-center">
              <Icon className="mr-2 h-5 w-5" />
              {category.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
