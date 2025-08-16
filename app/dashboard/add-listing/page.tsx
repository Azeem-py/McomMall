'use client';

import { useState } from 'react';
import ListingTypeSelector from './components/ListCategory';
import MultiStepListingForm from './components/MultiStepListingForm';

const AddListingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  return (
    <section className="w-full">
      {!selectedCategory ? (
        <div className="flex flex-col items-center justify-center h-full py-12">
          <h2 className="text-3xl font-bold mb-4">Create a New Listing</h2>
          <p className="text-gray-600 mb-8">
            To get started, please select a category for your listing.
          </p>
          <ListingTypeSelector onCategorySelect={handleCategorySelect} />
        </div>
      ) : (
        <MultiStepListingForm category={selectedCategory} onBack={handleBack} />
      )}
    </section>
  );
};

export default AddListingPage;
