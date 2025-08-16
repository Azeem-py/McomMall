import React from 'react';
import { motion } from 'framer-motion';
import { House, Map, PartyPopper, Speaker } from 'lucide-react';

// Reusable CategoryCard component
const CategoryCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ title, icon, onClick }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-64 h-44 rounded-lg cursor-pointer bg-gray-100 text-gray-800"
      onClick={onClick}
      whileHover={{
        y: -10,
        scale: 1.05,
        boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 bg-white bg-opacity-50">
        {React.cloneElement(icon as React.ReactElement, {
          size: 32,
          className: 'text-red-500',
        })}
      </div>
      <span className="text-center font-medium text-lg">{title}</span>
    </motion.div>
  );
};

// Main ListingTypeSelector component
const ListingTypeSelector: React.FC<{
  onCategorySelect: (category: string) => void;
}> = ({ onCategorySelect }) => {
  const categories = [
    { title: 'Service', icon: <Map /> },
    { title: 'Rent', icon: <House /> },
    { title: 'Event', icon: <PartyPopper /> },
    { title: 'Classified', icon: <Speaker /> },
  ];

  return (
    <div className="w-full max-w-6xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map(category => (
          <CategoryCard
            key={category.title}
            title={category.title}
            icon={category.icon}
            onClick={() => onCategorySelect(category.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingTypeSelector;
