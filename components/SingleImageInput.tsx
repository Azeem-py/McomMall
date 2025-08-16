'use client';

import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LucideImage } from 'lucide-react';

interface SingleImageInputProps {
  onImageChange?: (image: File | null) => void;
}

const SingleImageInput: React.FC<SingleImageInputProps> = ({
  onImageChange,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must not exceed 5MB');
        return;
      }

      // Generate preview for UI
      setPreview(URL.createObjectURL(file));

      // Pass the raw File back to parent
      if (onImageChange) {
        onImageChange(file);
      }
    } else {
      setPreview(null);
      if (onImageChange) {
        onImageChange(null);
      }
    }
  };

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener(
      'change',
      handleImageChange as unknown as EventListener
    );
    input.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full aspect-square border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-100 cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {preview ? (
        <Image
          src={preview}
          alt="Selected"
          width={256}
          height={256}
          className="object-cover rounded-lg w-full h-full"
        />
      ) : (
        <div className="flex flex-col items-center text-gray-400">
          <LucideImage size={24} />
          <p className="text-xs mt-1">Click to upload image (max 5MB)</p>
        </div>
      )}
      <input type="file" accept="image/*" className="hidden" />
    </motion.div>
  );
};

export default SingleImageInput;
