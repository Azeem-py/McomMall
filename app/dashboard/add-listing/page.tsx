'use client';

import { ArrowRight } from 'lucide-react';
import { PricingPlan } from './components/PricingPlans';
import { useState } from 'react';
import ListingTypeSelector from './components/ListCategory';
import AddListingForm from '@/components/AddListingForm';

const Page = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    console.log(`Selected plan: ${plan}`);
  };

  return (
    <section>
      <h2 className="font-medium text-3xl">Add Listing</h2>
      <h3>Buy New Package</h3>
      {!selectedPlan ? (
        <section>
          <PricingPlan
            selectedPlan={selectedPlan}
            setSelectedPlan={handlePlanSelection}
          />
          <div className="w-full flex items-center justify-center">
            <button className="flex items-center gap-2 bg-red-500 text-xl py-4 px-5 rounded-4xl text-white">
              Submit Listing
              <ArrowRight />
            </button>
          </div>
        </section>
      ) : (
        <ListingTypeSelector />
      )}

      {selectedPlan && <AddListingForm />}
    </section>
  );
};

export default Page;
