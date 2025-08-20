import React from 'react';
import { ListingFormData, Media } from '../../../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface StepProps {
  formData: ListingFormData;
  setFormData: React.Dispatch<React.SetStateAction<ListingFormData>>;
  errors: Record<string, string>;
}

interface ImageUploadProps {
  id: 'logo' | 'banner';
  label: string;
  recommendedSize: string;
  value: Media | null;
  onChange: (id: 'logo' | 'banner', value: Media | null) => void;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  label,
  recommendedSize,
  value,
  onChange,
  error,
}) => {
  const [preview, setPreview] = React.useState<string | null>(
    value?.file ? URL.createObjectURL(value.file) : null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newPreview = URL.createObjectURL(file);
      setPreview(newPreview);
      onChange(id, { file, altText: value?.altText || '' });
    }
  };

  const handleAltTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value) {
      onChange(id, { ...value, altText: e.target.value });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Label htmlFor={`${id}-alt`}>{label}</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Recommended size: {recommendedSize}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-48 h-48 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50">
          {preview ? (
            <Image
              src={preview}
              alt={value?.altText || 'Image preview'}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          ) : (
            <div className="text-center text-muted-foreground">
              <UploadCloud className="mx-auto w-8 h-8" />
              <p className="text-xs mt-1">Click button to upload</p>
            </div>
          )}
        </div>
        <div className="flex-grow space-y-2">
          <Label htmlFor={`${id}-file-upload`}>Image File</Label>
          <Input
            id={`${id}-file-upload`}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          <Label htmlFor={`${id}-alt`}>Alt Text (Required)</Label>
          <Input
            id={`${id}-alt`}
            value={value?.altText || ''}
            onChange={handleAltTextChange}
            placeholder="A descriptive caption for the image"
            required
          />
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

const MediaStep: React.FC<StepProps> = ({ formData, setFormData, errors }) => {
  const handleMediaChange = (id: 'logo' | 'banner', value: Media | null) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-8">
      <ImageUpload
        id="logo"
        label="Business Logo"
        recommendedSize="512x512px"
        value={formData.logo}
        onChange={handleMediaChange}
        error={errors.logo}
      />
      <ImageUpload
        id="banner"
        label="Business Banner"
        recommendedSize="1600x600px"
        value={formData.banner}
        onChange={handleMediaChange}
        error={errors.banner}
      />
    </div>
  );
};

export default MediaStep;
