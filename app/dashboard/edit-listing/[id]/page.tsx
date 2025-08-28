'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  useGetBusinessData,
  useEditListing,
} from '@/service/listings/hook';
import { CreateBusinessPayload } from '@/service/listings/types';
import BusinessInfoForm from '@/app/dashboard/add-listing/components/BusinessInfoForm';
import BusinessSocialsForm from '@/app/dashboard/add-listing/components/BusinessSocialsForm';
import BusinessDetailsForm from '@/app/dashboard/add-listing/components/BusinessDetailsForm';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';

const EditListingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CreateBusinessPayload>({
    businessName: '',
    listingType: [],
    ownerName: '',
    categories: [],
    location: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      latitude: null,
      longitude: null,
    },
    contact: {
      email: '',
      website: '',
      phone: '',
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      x: '',
      youtube: '',
      linkedin: '',
    },
    businessDetails: {
      description: '',
      services: [],
      amenities: [],
      openingHours: {},
    },
    logoUrl: '',
    gallery: [],
  });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const {
    data: listingData,
    isLoading,
    isError,
  } = useGetBusinessData({ id: id as string });
  const { mutate: editListing, isPending } = useEditListing();

  useEffect(() => {
    if (listingData) {
      setFormData({
        businessName: listingData.businessName,
        listingType: listingData.listingType,
        ownerName: listingData.ownerName,
        categories: listingData.categories,
        location: listingData.location,
        contact: listingData.contact,
        socialMedia: listingData.socialMedia,
        businessDetails: listingData.businessDetails,
        logoUrl: listingData.logoUrl,
        gallery: listingData.gallery,
      });
    }
  }, [listingData]);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editListing(
      { listingId: id as string, payload: formData },
      {
        onSuccess: () => {
          setIsSuccessModalOpen(true);
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading listing data.</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Listing</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <BusinessInfoForm
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 2 && (
              <BusinessSocialsForm
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 3 && (
              <BusinessDetailsForm
                formData={formData}
                setFormData={setFormData}
              />
            )}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button type="button" onClick={prevStep} variant="outline">
                  Previous
                </Button>
              )}
              {step < 3 && (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              )}
              {step === 3 && (
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Updating...' : 'Update Listing'}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold mb-4">Listing Updated!</h2>
            <p className="mb-6">Your listing has been successfully updated.</p>
            <Button
              onClick={() => router.push('/dashboard/my-listings')}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
            >
              Back to My Listings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditListingPage;
