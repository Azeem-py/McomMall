import React from 'react';
import { motion, Variants } from 'framer-motion';
import { House, Map, PartyPopper, Speaker } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Category {
  title: string;
  description: string;
  icon: React.ElementType;
}

const ListingTypeSelector: React.FC<{
  onCategorySelect: (category: string) => void;
}> = ({ onCategorySelect }) => {
  const categories: Category[] = [
    {
      title: 'Service',
      description: 'For professionals offering services',
      icon: Map,
    },
    {
      title: 'Rent',
      description: 'For properties available for rent',
      icon: House,
    },
    {
      title: 'Event',
      description: 'For upcoming events and gatherings',
      icon: PartyPopper,
    },
    {
      title: 'Classified',
      description: 'For general classified advertisements',
      icon: Speaker,
    },
  ];

  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      y: -5,
      scale: 1.05,
      boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            custom={index}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
            onClick={() => onCategorySelect(category.title)}
          >
            <Card className="cursor-pointer h-full">
              <CardHeader className="flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ListingTypeSelector;
