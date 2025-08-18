'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';
import ListingTypeSelector from './components/ListCategory';
import MultiStepListingForm from './components/MultiStepListingForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const AddListingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  const pageVariants: Variants = {
    initial: { opacity: 0, x: -50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 50 },
  };

  // ✅ explicitly typed as Transition
  const pageTransition: Transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-12">
      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          <motion.div
            key="category-selector"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">
                  Create a New Listing
                </CardTitle>
                <CardDescription className="text-lg">
                  To get started, please select a category for your listing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ListingTypeSelector onCategorySelect={handleCategorySelect} />
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <MultiStepListingForm
              category={selectedCategory}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AddListingPage;
