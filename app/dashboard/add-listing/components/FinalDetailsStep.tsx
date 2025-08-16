'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { ListingFormData } from '../types';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface FinalDetailsStepProps {
  formData: ListingFormData;
  setFormData: (data: ListingFormData) => void;
}

const FinalDetailsStep: React.FC<FinalDetailsStepProps> = ({ formData, setFormData }) => {
  const handleDescriptionChange = (value: string) => {
    setFormData({ ...formData, description: value });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      socials: {
        ...formData.socials,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Description</h3>
        <div style={{ height: '300px' }}>
            <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={handleDescriptionChange}
            style={{ height: '250px' }}
            />
        </div>
      </div>

      {/* Social Media */}
      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Social Media (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="youtube">YouTube Video Link</Label>
            <Input
              id="youtube"
              name="youtube"
              value={formData.socials.youtube || ''}
              onChange={handleSocialChange}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook Page</Label>
            <Input
              id="facebook"
              name="facebook"
              value={formData.socials.facebook || ''}
              onChange={handleSocialChange}
              placeholder="https://www.facebook.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram Profile</Label>
            <Input
              id="instagram"
              name="instagram"
              value={formData.socials.instagram || ''}
              onChange={handleSocialChange}
              placeholder="https://www.instagram.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">X/Twitter Handle</Label>
            <Input
              id="twitter"
              name="twitter"
              value={formData.socials.twitter || ''}
              onChange={handleSocialChange}
              placeholder="@yourhandle"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalDetailsStep;
