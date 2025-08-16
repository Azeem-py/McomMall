import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LucideImage } from 'lucide-react';

interface SingleImageInputProps {
  onImageChange?: (image: string | null) => void;
}

const SingleImageInput: React.FC<SingleImageInputProps> = ({
  onImageChange,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must not exceed 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = reader.result as string;
        setSelectedImage(image);
        if (onImageChange) {
          onImageChange(image);
        }
      };
      reader.readAsDataURL(file);
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
      className="w-full h-full aspect-square border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-100 cursor-pointer"
      onClick={handleClick}
    >
      {selectedImage ? (
        <Image
          src={selectedImage}
          alt="Selected"
          width={256}
          height={256}
          className="object-cover rounded-lg w-full h-full"
        />
      ) : (
        <div className="flex flex-col items-center text-gray-400">
          <LucideImage size={24} />
          <p className="text-xs mt-1">Click to upload image (max 2MB)</p>
        </div>
      )}
      <input type="file" accept="image/*" className="hidden" />
    </motion.div>
  );
};

export default SingleImageInput;
