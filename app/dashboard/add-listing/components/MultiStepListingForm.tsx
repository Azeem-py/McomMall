'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

import BasicInfoStep from './BasicInfoStep';
import OfferingScheduleStep from './OfferingScheduleStep';
import FinalDetailsStep from './FinalDetailsStep';
import { ListingFormData } from '@/service/listings/types';
import { Button } from '@/components/ui/button';
import { useCreateListing } from '@/service/listings/hook';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface MultiStepListingFormProps {
  category: string;
  onBack: () => void;
}

const steps = [
  {
    number: 1,
    title: 'Basic Information',
    component: BasicInfoStep,
  },
  {
    number: 2,
    title: 'Offering & Schedule',
    component: OfferingScheduleStep,
  },
  {
    number: 3,
    title: 'Final Details',
    component: FinalDetailsStep,
  },
];

const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex justify-center items-center mb-8">
    {steps.map((step, index) => (
      <div key={step.number} className="flex items-center">
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold transition-colors duration-300 ${
              currentStep > step.number
                ? 'bg-primary text-primary-foreground'
                : currentStep === step.number
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
            }`}
          >
            {currentStep > step.number ? <Check /> : step.number}
          </div>
          <p
            className={`mt-2 text-sm font-medium transition-colors duration-300 ${
              currentStep >= step.number
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            {step.title}
          </p>
        </div>
        {index < steps.length - 1 && (
          <div
            className={`w-16 h-1 mx-4 transition-colors duration-300 ${
              currentStep > step.number ? 'bg-primary' : 'bg-muted'
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

const MultiStepListingForm: React.FC<MultiStepListingFormProps> = ({
  category,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ListingFormData>({
    category,
    title: '',
    logo: null,
    keywords: [],
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

  const { mutate, isPending } = useCreateListing();

  const handleSubmit = () => {
    const payload = { ...formData };
    if (typeof payload.keywords === 'string') {
      payload.keywords = payload.keywords.split(',').map(k => k.trim());
    }

    payload.services = payload.services.map(service => ({
      ...service,
      price: Number(service.price) || 0,
    }));

    mutate(payload, {
      onSuccess: () => {
        toast.success('Listing created successfully');
      },
      onError: error => {
        toast.error(error.message);
      },
    });
  };

  const CurrentStepComponent = steps.find(
    s => s.number === currentStep
  )!.component;

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            Create a new <span className="text-primary">{category}</span>{' '}
            Listing
          </CardTitle>
          <Button variant="ghost" onClick={onBack}>
            &larr; Back to categories
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <StepIndicator currentStep={currentStep} />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
          >
            <CurrentStepComponent
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          </motion.div>
        </AnimatePresence>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between mt-6">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
        ) : (
          <div />
        )}

        {currentStep < 3 ? (
          <Button onClick={nextStep}>Next</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MultiStepListingForm;
