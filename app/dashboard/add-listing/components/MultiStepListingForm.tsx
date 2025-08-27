'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogAction,
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
import { useAddListing } from '@/service/listings/hook';
import {
  type BookingMethod,
  type BusinessHourPayload,
  type CreateBusinessPayload,
  type DayOfWeek,
  type ListingType,
  type ProductSellerProfilePayload,
  type SellingMode,
  type ServiceModel,
  type ServiceProviderProfilePayload,
  type SocialLinkPayload,
  type SpecialDayPayload,
  type StorefrontLinkPayload,
} from '@/service/listings/types';
import { Separator } from '@/components/ui/separator';
import { Check, Loader2 } from 'lucide-react';
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
const profanityCheck = (value: string) =>
  !badWords.some(word => value.toLowerCase().includes(word));

// Zod Schemas for validation
const urlValidation = z
  .string()
  .refine(
    value => {
      if (!value) return true; // Optional fields are handled by .optional()
      // Allow URLs with or without a protocol
      const urlWithProtocol = /^(https?:\/\/)/.test(value)
        ? value
        : `https://${value}`;
      return z.string().url().safeParse(urlWithProtocol).success;
    },
    { message: 'Invalid URL.' }
  )
  .optional()
  .or(z.literal(''));

const businessInfoSchema = z
  .object({
    businessName: z
      .string()
      .min(1, { message: 'Business name is required.' })
      .refine(profanityCheck, {
        message: 'Business name contains inappropriate language.',
      }),
    legalName: z.string().optional(),
    companyRegNo: z.string().optional(),
    vatNo: z.string().optional(),
    shortDesc: z
      .string()
      .min(20, { message: 'Must be 20-180 characters.' })
      .max(180, { message: 'Must be 20-180 characters.' })
      .refine(profanityCheck, {
        message: 'Description contains inappropriate language.',
      }),
    longDesc: z.string().optional(),
    phone: z
      .string()
      .min(1, { message: 'Phone number is required.' })
      .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, {
        message: 'Invalid phone number.',
      }),
    email: z
      .string()
      .email({ message: 'Invalid email.' })
      .min(1, { message: 'Email is required.' }),
    socials: z
      .object({
        website: urlValidation.refine(val => val && val.length > 0, {
          message: 'A valid website URL is required.',
        }),
        facebook: urlValidation,
        instagram: urlValidation,
        twitter: urlValidation,
        youtube: urlValidation,
        linkedin: urlValidation,
      })
      .optional(),
  })
  .passthrough();

const mediaSchema = z
  .object({
    logo: z
      .object({
        file: z.instanceof(File).nullable(),
        altText: z.string(),
      })
      .refine(data => (data.file ? data.altText.length > 0 : true), {
        message: 'Logo alt text is required when an image is uploaded.',
        path: ['altText'],
      })
      .nullable(),
    banner: z
      .object({
        file: z.instanceof(File).nullable(),
        altText: z.string(),
      })
      .refine(data => (data.file ? data.altText.length > 0 : true), {
        message: 'Banner alt text is required when an image is uploaded.',
        path: ['altText'],
      })
      .nullable(),
  })
  .passthrough();

const productCategorySchema = z
  .object({
    productData: z
      .object({
        primaryCategory: z
          .string()
          .min(1, { message: 'Primary category is required.' }),
      }),
  })
  .passthrough();

const productLocationSchema = z
  .object({
    address: z.string().min(1, { message: 'Address is required.' }),
  })
  .passthrough();

const sellingModesSchema = z
  .object({
    productData: z
      .object({
        sellingModes: z
          .object({
            inStorePickup: z.boolean(),
            localDelivery: z.boolean(),
            ukWideShipping: z.boolean(),
          })
          .refine(
            data =>
              data.inStorePickup || data.localDelivery || data.ukWideShipping,
            {
              message: 'At least one selling mode must be selected.',
              path: ['sellingModes'],
            }
          ),
      }),
  })
  .passthrough();

const serviceCategorySchema = z
  .object({
    serviceData: z
      .object({
        tradeCategory: z
          .string()
          .min(1, { message: 'Trade category is required.' }),
      }),
  })
  .passthrough();

const bookingSchema = z
  .object({
    serviceData: z
      .object({
        bookingMethod: z.string(),
        bookingURL: z.string().optional(),
      })
      .refine(
        data => {
          if (data.bookingMethod === 'online') {
            return (
              data.bookingURL &&
              z.string().url().safeParse(data.bookingURL).success
            );
          }
          return true;
        },
        {
          message: 'A valid booking URL is required for online booking.',
          path: ['bookingURL'],
        }
      ),
  })
  .passthrough();

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
  const [formData, setFormData] = useState<ListingFormData>(() => {
    const initialData: ListingFormData = {
      businessTypes: businessTypes as ('Product' | 'Service')[],
      businessName: '',
      phone: '',
      email: '',
      shortDesc: '',
      socials: { website: '' },
      logo: null,
      banner: null,
    };
    if (businessTypes.includes('Product')) {
      initialData.productData = {
        primaryCategory: '',
        subCategories: [],
        showAddressPublicly: true,
        deliveryArea: { type: 'radius', value: '' },
        sellingModes: {
          inStorePickup: false,
          localDelivery: false,
          ukWideShipping: false,
        },
        fulfilmentNotes: '',
        returnsPolicy: '',
        storefrontLinks: {},
      };
    }
    if (businessTypes.includes('Service')) {
      initialData.serviceData = {
        tradeCategory: '',
        serviceLocation: {
          atBusinessLocation: false,
          customerTravels: false,
        },
        serviceArea: { type: 'radius', value: '' },
        hoursType: 'weekly',
        bookingMethod: 'call',
        pricingVisibility: 'quote',
      };
    }
    return initialData;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const { mutate: addListing, isPending } = useAddListing();

  const steps = useMemo(() => {
    const sharedInitial = [
      {
        title: 'Business Info',
        component: BusinessInfoStep,
        schema: businessInfoSchema,
      },
    ];
    const productSteps = [
      {
        title: 'Product Categories',
        component: ProductCategoryStep,
        schema: productCategorySchema,
      },
      {
        title: 'Location',
        component: ProductLocationStep,
        schema: productLocationSchema,
      },
      { title: 'Hours', component: ProductHoursStep, schema: z.any() },
      {
        title: 'Selling Modes',
        component: SellingModesStep,
        schema: sellingModesSchema,
      },
    ];
    const serviceSteps = [
      {
        title: 'Service Categories',
        component: ServiceCategoryStep,
        schema: serviceCategorySchema,
      },
      { title: 'Service Area', component: ServiceAreaStep, schema: z.any() },
      { title: 'Availability', component: ServiceHoursStep, schema: z.any() },
      { title: 'Booking', component: BookingStep, schema: bookingSchema },
      { title: 'Credentials', component: CredentialsStep, schema: z.any() },
    ];
    const sharedFinal = [
      { title: 'Media', component: MediaStep, schema: mediaSchema },
      { title: 'Review & Publish', component: ReviewStep, schema: z.any() },
    ];

    let flowSteps: {
      title: string;
      component: React.ElementType;
      schema: z.ZodSchema<unknown>;
    }[] = [];

    if (
      businessTypes.includes('Product') &&
      businessTypes.includes('Service')
    ) {
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

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach(err => {
        newErrors[err.path.join('.')] = err.message;
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const transformFormDataToPayload = (
    data: ListingFormData
  ): CreateBusinessPayload => {
    const listingType = data.businessTypes.map(
      t => t.toLowerCase() as ListingType
    );

    const formatUrl = (url?: string): string | undefined => {
      if (!url) return undefined;
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
      return `https://${url}`;
    };

    // --- Location and Service Area ---
    const location: CreateBusinessPayload['location'] = {
      addressLine1: data.address || '',
      postcode: '', // Note: No postcode in ListingFormData, needs to be extracted from address
      city: '', // Note: No city in ListingFormData, needs to be extracted from address
      showPublicly: data.productData?.showAddressPublicly || false,
      deliveryRadiusKm:
        data.productData?.deliveryArea?.type === 'radius'
          ? Number(data.productData.deliveryArea.value)
          : undefined,
      servicePostcodes:
        data.productData?.deliveryArea?.type === 'postcodes'
          ? (data.productData.deliveryArea.value as string[])
          : data.serviceData?.serviceArea?.type === 'postcodes'
          ? data.serviceData.serviceArea.value.split(',').map(p => p.trim())
          : undefined,
      serviceModel:
        data.serviceData?.serviceLocation?.atBusinessLocation &&
        data.serviceData?.serviceLocation?.customerTravels
          ? 'both'
          : data.serviceData?.serviceLocation?.atBusinessLocation
          ? 'at_location'
          : data.serviceData?.serviceLocation?.customerTravels
          ? 'travel_to_customer'
          : undefined,
    };

    // --- Social Links ---
    const socialLinks: SocialLinkPayload[] = Object.entries(data.socials)
      .map(([platform, url]) => {
        const formattedUrl = formatUrl(url);
        return formattedUrl ? { platform, url: formattedUrl } : null;
      })
      .filter((link): link is SocialLinkPayload => link !== null);

    // --- Business Hours ---
    const dayMapping: { [key: string]: DayOfWeek } = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 0,
    };
    const businessHours: BusinessHourPayload[] = [];
    if (data.productData?.weeklyHours) {
      for (const [day, times] of Object.entries(data.productData.weeklyHours)) {
        if (times) {
          (times as { start: string; end: string }[]).forEach(time => {
            businessHours.push({
              dayOfWeek: dayMapping[day],
              openTime: time.start,
              closeTime: time.end,
            });
          });
        }
      }
    }

    // --- Special Days ---
    const specialDays: SpecialDayPayload[] =
      data.productData?.specialDays?.map(day => ({
        date: day.date.toISOString().split('T')[0],
        description: '', // No description field in source
        isOpen: !day.isClosed,
        openTime: day.openingHours?.[0]?.start,
        closeTime: day.openingHours?.[0]?.end,
      })) || [];

    // --- Product Seller Profile ---
    let productSellerProfile: ProductSellerProfilePayload | undefined;
    if (data.productData) {
      const sellingModes: SellingMode[] = [];
      if (data.productData.sellingModes?.inStorePickup)
        sellingModes.push('pickup');
      if (data.productData.sellingModes?.localDelivery)
        sellingModes.push('local_delivery');
      if (data.productData.sellingModes?.ukWideShipping)
        sellingModes.push('uk_shipping');

      const storefrontLinks: StorefrontLinkPayload[] = Object.entries(
        data.productData.storefrontLinks || {}
      )
        .map(([platform, url]) =>
          url
            ? { platform: platform as StorefrontLinkPayload['platform'], url }
            : null
        )
        .filter((link): link is StorefrontLinkPayload => link !== null);

      productSellerProfile = {
        sellingModes,
        fulfilmentNotes: data.productData.fulfilmentNotes,
        returnsPolicy: data.productData.returnsPolicy,
        hasAgeRestrictedItems: false, // This is not in the form data
        storefrontLinks,
      };
    }

    // --- Service Provider Profile ---
    let serviceProviderProfile: ServiceProviderProfilePayload | undefined;
    if (data.serviceData) {
      serviceProviderProfile = {
        bookingMethod: data.serviceData.bookingMethod as BookingMethod,
        bookingUrl: data.serviceData.bookingURL,
        quoteOnly: data.serviceData.pricingVisibility === 'quote',
        hasPublicLiabilityInsurance: false, // This is not in the form data
        certifications: [], // File upload needed
      };
    }

    const payload: CreateBusinessPayload = {
      listingType,
      businessName: data.businessName,
      legalName: data.legalName,
      companyRegistrationNumber: data.companyRegNo,
      vatNumber: data.vatNo,
      shortDescription: data.shortDesc,
      about: data.longDesc,
      website: data.socials.website,
      businessPhone: data.phone,
      businessEmail: data.email,
      logoUrl: undefined, // Requires file upload handling
      bannerUrl: undefined, // Requires file upload handling
      logoAltText: data.logo?.altText,
      bannerAltText: data.banner?.altText,
      location,
      socialLinks,
      categoryIds: [
        data.productData?.primaryCategory,
        data.serviceData?.tradeCategory,
      ]
        .filter((id): id is string => !!id)
        .filter((id, index, self) => self.indexOf(id) === index),
      businessHours,
      specialDays,
      productSellerProfile,
      serviceProviderProfile,
    };

    return payload;
  };

  const handleSubmit = () => {
    // A more comprehensive final validation should be done here
    // before attempting to submit.
    const payload = transformFormDataToPayload(formData);
    console.log('Submitting Payload:', JSON.stringify(payload, null, 2));
    addListing(payload);
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
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">
              Add a New <span className="text-orange-700">{getTitle()}</span>{' '}
              Listing
            </CardTitle>
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-blue-600 hover:text-blue-700"
            >
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
                schema={steps[currentStep - 1].schema}
              />
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            className={`${
              currentStep === 1 ? 'invisible' : 'visible'
            } text-blue-600 border-blue-600 hover:bg-blue-50`}
          >
            Back
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              className="bg-orange-700 hover:bg-orange-800"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="bg-orange-700 hover:bg-orange-800"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? 'Publishing...' : 'Publish'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default MultiStepListingForm;
