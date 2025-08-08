import React from 'react';
import { motion } from 'framer-motion';

// Define the shape of a single plan
interface Plan {
  title: string;
  price: string;
  features: string[];
  isBestValue?: boolean;
}

// Define the props for PricingPlans component
interface PricingPlansProps {
  plans: Plan[];
  selectedPlan: string | null;
  setSelectedPlan: (plan: string) => void; // Updated to match the handlePlanSelection function
}

const plans: Plan[] = [
  {
    title: 'Basic',
    price: '$4.99',
    features: [
      'Includes 1 listing',
      'Listings are visible for 30 days',
      'Booking Module enabled',
      'Reviews Module enabled',
      'Social Links Module enabled',
      'Gallery Module enabled',
    ],
  },
  {
    title: 'Extended',
    price: '$9.99',
    isBestValue: true,
    features: [
      'Includes 3 listings',
      'Unlimited availability of listings',
      'Booking Module enabled',
      'Reviews Module enabled',
      'Social Links Module enabled',
      'Opening Hours Module enabled',
      'Video option enabled',
      'Coupons option enabled',
      'Gallery Module enabled',
    ],
  },
  {
    title: 'Professional',
    price: '$29.99',
    features: [
      'Unlimited number of listings',
      'Unlimited availability of listings',
      'Booking Module enabled',
      'Reviews Module enabled',
      'Social Links Module enabled',
      'Opening Hours Module enabled',
      'Video option enabled',
      'Coupons option enabled',
      'Gallery Module enabled',
    ],
  },
];

export const PricingPlans: React.FC<PricingPlansProps> = ({
  plans,
  selectedPlan,
  setSelectedPlan,
}) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`border rounded-lg shadow-md p-6 flex flex-col justify-between ${
            plan.isBestValue ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <div>
            <div className="w-full flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">{plan.title}</h2>
              {plan.isBestValue && (
                <div className="text-red-500 font-semibold rounded-2xl bg-white px-3 py-2">
                  Best Value
                </div>
              )}
            </div>
            <p className="text-3xl text-center w-full py-3 bg-gray-100 rounded-md font-semibold mb-4">
              {plan.price}
            </p>
            <p className="text-lg text-black font-medium mb-4">
              Basic Features
            </p>
            <ul className="list-disc list-inside text-sm mb-6 space-y-1 flex flex-col gap-3 text-gray-600">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          <motion.button
            className={`mt-auto py-3 px-4 rounded-2xl text-black border ${
              selectedPlan === plan.title
                ? plan.isBestValue
                  ? 'bg-red-600 text-white border-red-500'
                  : 'bg-blue-700 text-white border-blue-600'
                : plan.isBestValue
                ? 'border-red-500 hover:bg-red-600 hover:text-white'
                : 'border-blue-600 hover:bg-blue-700 hover:text-white'
            }`}
            aria-label={`Select ${plan.title} Package`}
            onClick={() => setSelectedPlan(plan.title)}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {selectedPlan === plan.title ? 'Selected' : 'Select This Package'}
          </motion.button>
        </div>
      ))}
    </div>
  );
};

export const PricingPlan: React.FC<{
  selectedPlan: string | null;
  setSelectedPlan: (plan: string) => void; // Updated to match the handlePlanSelection function
}> = ({ selectedPlan, setSelectedPlan }) => {
  return (
    <PricingPlans
      plans={plans}
      selectedPlan={selectedPlan}
      setSelectedPlan={setSelectedPlan}
    />
  );
};
