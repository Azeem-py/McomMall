'use client';

import { useState } from 'react';
import BasicInfoStep from './BasicInfoStep';
import OfferingScheduleStep from './OfferingScheduleStep';
import FinalDetailsStep from './FinalDetailsStep';
import { ListingFormData } from '../types';

interface MultiStepListingFormProps {
  category: string;
  onBack: () => void;
}

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Basic Information', 'Offering & Schedule', 'Final Details'];

  return (
    <div className="flex justify-center items-center mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
              currentStep > index + 1 ? 'bg-green-500' : currentStep === index + 1 ? 'bg-red-500' : 'bg-gray-300'
            }`}
          >
            {currentStep > index + 1 ? '✔' : index + 1}
          </div>
          <p className={`ml-2 ${currentStep >= index + 1 ? 'text-red-500' : 'text-gray-500'}`}>
            {step}
          </p>
          {index < steps.length - 1 && (
            <div className="w-16 h-1 bg-gray-300 mx-4"></div>
          )}
        </div>
      ))}
    </div>
  );
};


const MultiStepListingForm: React.FC<MultiStepListingFormProps> = ({ category, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ListingFormData>({
    category,
    title: '',
    logo: null,
    keywords: '',
    address: '',
    googleMapsPlaceId: '',
    gallery: [],
    services: [],
    schedule: {},
    availability: {},
    description: '',
    socials: {},
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Listing title is required.';
    }
    if (!formData.logo) {
      newErrors.logo = 'Listing logo is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    console.log('Submitting data:', JSON.stringify(formData, null, 2));
    // Here you would typically send the data to a server
    alert('Listing submitted! Check the console for the data.');
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-full">
        <div className='flex justify-between'>
            <h2 className="text-2xl font-bold mb-2">Create a new <span className='text-red-500'>{category}</span> Listing</h2>
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900">← Back to categories</button>
      </div>
      <StepIndicator currentStep={currentStep} />

      <form onSubmit={e => e.preventDefault()}>
        {currentStep === 1 && (
          <BasicInfoStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        )}
        {currentStep === 2 && (
          <OfferingScheduleStep
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentStep === 3 && (
          <FinalDetailsStep
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </form>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 ? (
          <button onClick={prevStep} className="px-6 py-2 bg-gray-300 rounded-md">Back</button>
        ) : <div />}

        {currentStep < 3 ? (
          <button onClick={nextStep} className="px-6 py-2 bg-red-500 text-white rounded-md">Next</button>
        ) : (
          <button onClick={handleSubmit} className="px-6 py-2 bg-green-500 text-white rounded-md">Submit</button>
        )}
      </div>
    </div>
  );
};

export default MultiStepListingForm;
