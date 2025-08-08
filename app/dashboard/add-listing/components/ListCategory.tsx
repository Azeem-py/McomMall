import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { House, Map, PartyPopper, Speaker } from 'lucide-react';
import { TableHeader } from '../../component/Tables';

// Reusable CategoryCard component
const CategoryCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  onClick: () => void;
}> = ({ title, icon, isSelected = false, onClick }) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center w-64 h-44 rounded-lg cursor-pointer ${
        isSelected ? 'bg-red-800 text-white' : 'bg-gray-100 text-gray-800'
      }`}
      onClick={onClick}
      whileHover={{
        y: -10,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      onMouseEnter={e =>
        (e.currentTarget.style.backgroundColor = isSelected
          ? '#991b1b'
          : '#b91c1c')
      }
      onMouseLeave={e =>
        (e.currentTarget.style.backgroundColor = isSelected
          ? '#991b1b'
          : '#f5f5f5')
      }
    >
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
          isSelected ? 'bg-white bg-opacity-30' : 'bg-white bg-opacity-50'
        }`}
      >
        {React.cloneElement(icon as React.ReactElement, {
          stroke: 'black', // Force icon to stay black
          size: 24,
        })}
      </div>
      <span
        className={`text-center font-medium ${
          isSelected ? 'text-red-800' : ''
        }`}
      >
        {title}
      </span>
    </motion.div>
  );
};

// Main ListingTypeSelector component
const ListingTypeSelector: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => {
      const newSelection = prev === category ? null : category;
      if (newSelection) {
        console.log(`Selected category: ${newSelection}`);
      }
      return newSelection;
    });
  };

  const categories = [
    { title: 'Service', icon: <Map size={24} /> },
    { title: 'Rent', icon: <House size={24} /> },
    { title: 'Event', icon: <PartyPopper size={24} /> },
    { title: 'Classifieds', icon: <Speaker size={24} /> },
  ];

  return (
    <div className="p-6 bg-white border rounded-lg w-full max-w-6xl mt-6">
      <TableHeader title="Choose Listing Type" />
      <div className="grid grid-cols-4 gap-6 mt-4">
        {categories.map(category => (
          <CategoryCard
            key={category.title}
            title={category.title}
            icon={category.icon}
            isSelected={selectedCategory === category.title}
            onClick={() => handleCategoryClick(category.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingTypeSelector;
