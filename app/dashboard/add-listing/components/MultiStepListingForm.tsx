'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';
import { z } from 'zod';

import { ListingFormData } from '../types';

// Import all step components
import BusinessInfoStep from './steps/shared/BusinessInfoStep';
import MediaStep from './steps/shared/MediaStep';
import ReviewStep from './steps/shared/ReviewStep';
import ProductCategoryStep from './steps/product/ProductCategoryStep';
import ProductLocationStep from './steps/product/ProductLocationStep';
import ProductHoursStep from './steps/product/ProductHoursStep';
import SellingModesStep from './steps/product/SellingModesStep';
import ServiceCategoryStep from './steps/service/ServiceCategoryStep';
import ServiceAreaStep from './steps/service/ServiceAreaStep';
import ServiceHoursStep from './steps/service/ServiceHoursStep';
import BookingStep from './steps/service/BookingStep';
import CredentialsStep from './steps/service/CredentialsStep';

interface MultiStepListingFormProps {
  businessTypes: string[];
  onBack: () => void;
}

// Profanity filter (simple version)
const badWords = ['profanity', 'badword'];
const profanityCheck = (value: string) => !badWords.some(word => value.toLowerCase().includes(word));

// Zod Schemas for validation
const businessInfoSchema = z.object({
  businessName: z.string().min(1, { message: "Business name is required." }).refine(profanityCheck, { message: "Business name contains inappropriate language." }),
  legalName: z.string().optional(),
  companyRegNo: z.string().optional(),
  vatNo: z.string().optional(),
  shortDesc: z.string().min(20, { message: "Must be 20-180 characters." }).max(180, { message: "Must be 20-180 characters." }).refine(profanityCheck, { message: "Description contains inappropriate language." }),
  longDesc: z.string().optional(),
  phone: z.string().regex(/^\+44\d{10}$/, { message: "Invalid UK phone. Use +44 format." }),
  email: z.string().email({ message: "Invalid email." }).optional().or(z.literal('')),
  socials: z.object({
    website: z.string().url({ message: "Invalid URL." }).optional().or(z.literal('')),
    facebook: z.string().url({ message: "Invalid URL." }).optional().or(z.literal('')),
    instagram: z.string().url({ message: "Invalid URL." }).optional().or(z.literal('')),
    twitter: z.string().url({ message: "Invalid URL." }).optional().or(z.literal('')),
    youtube: z.string().url({ message: "Invalid URL." }).optional().or(z.literal('')),
    linkedin: z.string().url({ message: "Invalid URL." }).optional().or(z.literal('')),
  }).optional(),
}).passthrough();

const mediaSchema = z.object({
  logo: z.object({
    file: z.instanceof(File).nullable(),
    altText: z.string(),
  }).refine(data => data.file ? data.altText.length > 0 : true, {
    message: "Logo alt text is required when an image is uploaded.",
    path: ['altText'],
  }).nullable(),
  banner: z.object({
    file: z.instanceof(File).nullable(),
    altText: z.string(),
  }).refine(data => data.file ? data.altText.length > 0 : true, {
    message: "Banner alt text is required when an image is uploaded.",
    path: ['altText'],
  }).nullable(),
}).passthrough();

const productCategorySchema = z.object({
    productData: z.object({
        primaryCategory: z.string().min(1, { message: "Primary category is required." }),
    }).optional(),
}).passthrough();

const productLocationSchema = z.object({
    address: z.string().optional(),
}).passthrough();

const sellingModesSchema = z.object({
    productData: z.object({
        sellingModes: z.object({
            inStorePickup: z.boolean(),
            localDelivery: z.boolean(),
            ukWideShipping: z.boolean(),
        }).refine(data => data.inStorePickup || data.localDelivery || data.ukWideShipping, {
            message: "At least one selling mode must be selected.",
            path: ['sellingModes'],
        }),
    }).optional(),
}).passthrough();

const serviceCategorySchema = z.object({
    serviceData: z.object({
        tradeCategory: z.string().min(1, { message: "Trade category is required." }),
    }).optional(),
}).passthrough();

const bookingSchema = z.object({
    serviceData: z.object({
        bookingMethod: z.string(),
        bookingURL: z.string().optional(),
    }).refine(data => {
        if (data.bookingMethod === 'online') {
            return data.bookingURL && z.string().url().safeParse(data.bookingURL).success;
        }
        return true;
    }, {
        message: "A valid booking URL is required for online booking.",
        path: ['bookingURL'],
    }),
}).passthrough();


const StepIndicator = ({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: { title: string; component: React.ElementType }[];
}) => (
  <div className="flex justify-center items-center mb-8 overflow-x-auto py-2">
    {steps.map((step, index) => (
      <div key={step.title} className="flex items-center flex-shrink-0">
        <div className="flex flex-col items-center w-24">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold transition-colors duration-300 ${
              currentStep > index + 1
                ? 'bg-blue-600 text-white'
                : currentStep === index + 1
                  ? 'bg-orange-700 text-white'
                  : 'bg-muted text-muted-foreground'
            }`}
          >
            {currentStep > index + 1 ? <Check /> : index + 1}
          </div>
          <p
            className={`mt-2 text-xs text-center font-medium transition-colors duration-300 ${
              currentStep >= index + 1
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
              currentStep > index + 1 ? 'bg-blue-600' : 'bg-muted'
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

const MultiStepListingForm: React.FC<MultiStepListingFormProps> = ({
  businessTypes,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ListingFormData>({
    businessTypes: businessTypes as ('Product' | 'Service')[],
    businessName: '',
    phone: '',
    email: '',
    shortDesc: '',
    socials: { website: '' },
    logo: null,
    banner: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter();

  const steps = useMemo(() => {
    const sharedInitial = [{ title: 'Business Info', component: BusinessInfoStep, schema: businessInfoSchema }];
    const productSteps = [
      { title: 'Product Categories', component: ProductCategoryStep, schema: productCategorySchema },
      { title: 'Location', component: ProductLocationStep, schema: productLocationSchema },
      { title: 'Hours', component: ProductHoursStep, schema: z.any() },
      { title: 'Selling Modes', component: SellingModesStep, schema: sellingModesSchema },
    ];
    const serviceSteps = [
      { title: 'Service Categories', component: ServiceCategoryStep, schema: serviceCategorySchema },
      { title: 'Service Area', component: ServiceAreaStep, schema: z.any() },
      { title: 'Availability', component: ServiceHoursStep, schema: z.any() },
      { title: 'Booking', component: BookingStep, schema: bookingSchema },
      { title: 'Credentials', component: CredentialsStep, schema: z.any() },
    ];
    const sharedFinal = [
      { title: 'Media', component: MediaStep, schema: mediaSchema },
      { title: 'Review & Publish', component: ReviewStep, schema: z.any() },
    ];

    let flowSteps: { title: string; component: React.ElementType, schema: z.ZodSchema<any> }[] = [];

    if (businessTypes.includes('Product') && businessTypes.includes('Service')) {
      flowSteps = [...productSteps, ...serviceSteps];
    } else if (businessTypes.includes('Product')) {
      flowSteps = productSteps;
    } else if (businessTypes.includes('Service')) {
      flowSteps = serviceSteps;
    }

    return [...sharedInitial, ...flowSteps, ...sharedFinal];
  }, [businessTypes]);

  const validateStep = () => {
      const currentSchema = steps[currentStep - 1].schema;
      const result = currentSchema.safeParse(formData);

      if(!result.success) {
          const newErrors: Record<string, string> = {};
          result.error.errors.forEach(err => {
              newErrors[err.path.join('.')] = err.message;
          });
          setErrors(newErrors);
          return false;
      }

      setErrors({});
      return true;
  }

  const nextStep = () => {
    if (validateStep()) {
        setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    // Final validation across all fields would go here
    console.log('Form Submitted:', JSON.stringify(formData, null, 2));
    setIsAlertOpen(true);
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const getTitle = () => {
    if (businessTypes.length > 1) return 'Product & Service';
    return businessTypes[0];
  }

  return (
    <>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Listing Submitted!</AlertDialogTitle>
            <AlertDialogDescription>
              Your listing data has been logged to the console. In a real app, this would go to an API.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => router.push('/dashboard')}
              className="bg-orange-700 hover:bg-orange-800"
            >
              Back to Dashboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">
              Add a New <span className="text-orange-700">{getTitle()}</span> Listing
            </CardTitle>
            <Button variant="ghost" onClick={onBack} className="text-blue-600 hover:text-blue-700">
              &larr; Back to selection
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <StepIndicator currentStep={currentStep} steps={steps} />
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
          <Button variant="outline" onClick={prevStep} className={`${currentStep === 1 ? 'invisible' : 'visible'} text-blue-600 border-blue-600 hover:bg-blue-50`}>
            Back
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={nextStep} className="bg-orange-700 hover:bg-orange-800">Next</Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-orange-700 hover:bg-orange-800">
              Publish
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default MultiStepListingForm;
