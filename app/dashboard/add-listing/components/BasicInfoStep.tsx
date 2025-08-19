'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SingleImageInput from '@/components/SingleImageInput';
import UploadBox from '@/components/UploadBox';
import { ListingFormData } from '@/service/listings/types';

interface BasicInfoStepProps {
  formData: ListingFormData;
  setFormData: (data: ListingFormData) => void;
  errors: Record<string, string>;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (image: File | null) => {
    setFormData({ ...formData, logo: image });
  };

  const handleGalleryChange = (images: File[]) => {
    setFormData({ ...formData, gallery: images });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Core Details</CardTitle>
          <CardDescription>
            Provide the essential details for your listing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Listing Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., John's Plumbing Services"
                required
              />
              {errors.title && (
                <p className="text-destructive text-xs mt-1">{errors.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>
                Listing Logo <span className="text-destructive">*</span>
              </Label>
              <div className="w-32 h-32">
                <SingleImageInput onImageChange={handleLogoChange} />
              </div>
              {errors.logo && (
                <p className="text-destructive text-xs mt-1">{errors.logo}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Service">Service</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="Event">Event</SelectItem>
                  <SelectItem value="Classified">Classified</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                name="keywords"
                value={
                  Array.isArray(formData.keywords)
                    ? formData.keywords.join(', ')
                    : formData.keywords
                }
                onChange={handleChange}
                placeholder="e.g., plumber, renovation, pipes"
              />
              <p className="text-xs text-muted-foreground">
                Separate keywords with commas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
          <CardDescription>
            Add a location to your listing (optional).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="address">Location Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g., 123 Main St, Anytown, USA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="googleMapsPlaceId">Google Maps Place ID</Label>
              <Input
                id="googleMapsPlaceId"
                name="googleMapsPlaceId"
                value={formData.googleMapsPlaceId}
                onChange={handleChange}
                placeholder="e.g., ChIJgUbEo8JajokRjGe-3b5g3_A"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery</CardTitle>
          <CardDescription>
            Upload images for your listing gallery (optional).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploadBox
            onImagesChange={handleGalleryChange}
            maxFiles={3}
            maxSize={5}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInfoStep;
