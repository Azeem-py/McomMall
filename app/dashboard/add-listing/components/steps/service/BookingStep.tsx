import React from 'react';
import { ListingFormData } from '../../../types';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface StepProps {
  formData: ListingFormData;
  setFormData: React.Dispatch<React.SetStateAction<ListingFormData>>;
  errors: Record<string, string>;
}

const BookingStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const serviceData = formData.serviceData || {};
  const bookingMethod = serviceData.bookingMethod || 'call';
  const pricingVisibility = serviceData.pricingVisibility || 'quote';

  const handleServiceDataChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      serviceData: {
        ...prev.serviceData,
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking Method</CardTitle>
          <CardDescription>How should customers book your services? (Required)</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={bookingMethod}
            onValueChange={(value) => handleServiceDataChange('bookingMethod', value)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="call" id="call" />
              <Label htmlFor="call">Call to book</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="quote" id="quote" />
              <Label htmlFor="quote">Request a quote</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online">Book online</Label>
            </div>
          </RadioGroup>
          {bookingMethod === 'online' && (
            <div className="mt-4">
              <Label htmlFor="bookingURL">Booking URL</Label>
              <Input
                id="bookingURL"
                type="url"
                placeholder="https://yourbookingplatform.com"
                value={serviceData.bookingURL || ''}
                onChange={(e) => handleServiceDataChange('bookingURL', e.target.value)}
              />
            </div>
          )}
          {errors['serviceData.bookingMethod'] && <p className="text-sm text-red-500 mt-1">{errors['serviceData.bookingMethod']}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing Visibility</CardTitle>
          <CardDescription>How do you want to display your pricing?</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={pricingVisibility}
            onValueChange={(value) => handleServiceDataChange('pricingVisibility', value)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fixed" id="fixed" />
              <Label htmlFor="fixed">Fixed price</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hourly" id="hourly" />
              <Label htmlFor="hourly">Hourly rate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="quote" id="quote-price" />
              <Label htmlFor="quote-price">Quote only</Label>
            </div>
          </RadioGroup>
          {errors['serviceData.pricingVisibility'] && <p className="text-sm text-red-500 mt-1">{errors['serviceData.pricingVisibility']}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingStep;
