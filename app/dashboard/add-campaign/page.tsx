'use client';
import React, { useState } from 'react';
import { AdFormData, FormErrors } from './types';
import { GeneralAdSettings } from './components/GeneralAdSettings';
import { CampaignFilters } from './components/CampaignFilters';
import { AdPlacementSelector } from './components/AdPlacementSelector';
import { Button } from '@/components/ui/button';
import {
  adPlacements,
  mockCategories,
  mockListings,
  mockRegions,
} from './data';
import { isAfter, startOfToday } from 'date-fns';

const AddListingPage = () => {
  const [formData, setFormData] = useState<AdFormData>({
    listing: '',
    campaignType: 'ppv',
    startDate: undefined,
    budget: '',
    category: '',
    region: '',
    locationSearch: '',
    forLoggedInUsers: false,
    placements: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const togglePlacement = (id: string) => {
    setFormData(prev => {
      const placements = prev.placements.includes(id)
        ? prev.placements.filter(p => p !== id)
        : [...prev.placements, id];
      return { ...prev, placements };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.listing) {
      newErrors.listing = 'A listing must be selected.';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'A start date is required.';
    } else if (!isAfter(formData.startDate, startOfToday())) {
      newErrors.startDate = 'Start date must be in the future.';
    }
    if (!formData.budget || Number(formData.budget) <= 0) {
      newErrors.budget = 'Budget must be a positive number.';
    }
    if (formData.placements.length === 0) {
      newErrors.placements = 'At least one ad placement must be selected.';
    }

    setErrors(newErrors);
    // Return true if newErrors object is empty
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
      // Here you would typically send the data to your API
      alert('Ad submitted! Check the console for the form data.');
    } else {
      console.log('Form validation failed:', errors);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <p className="text-sm text-gray-500">Home &gt; Dashboard</p>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">Manage Ads</h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <GeneralAdSettings
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            listings={mockListings}
          />

          <CampaignFilters
            formData={formData}
            setFormData={setFormData}
            categories={mockCategories}
            regions={mockRegions}
          />

          <AdPlacementSelector
            placementsData={adPlacements}
            selectedPlacements={formData.placements}
            togglePlacement={togglePlacement}
            error={errors.placements}
          />

          <div className="flex justify-start">
            <Button
              type="submit"
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold"
            >
              Submit Ad
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListingPage;
