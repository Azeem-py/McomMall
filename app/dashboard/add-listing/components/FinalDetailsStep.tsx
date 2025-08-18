'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Editor } from '@tinymce/tinymce-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ListingFormData } from '../types';

interface FinalDetailsStepProps {
  formData: ListingFormData;
  setFormData: (data: ListingFormData) => void;
}

const FinalDetailsStep: React.FC<FinalDetailsStepProps> = ({
  formData,
  setFormData,
}) => {
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
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
          <CardDescription>
            Provide a detailed description of your listing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_EDITOR_KEY}
            value={formData.description}
            onEditorChange={handleDescriptionChange}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | removeformat | help',
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>
            Add your social media links (optional).
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default FinalDetailsStep;
