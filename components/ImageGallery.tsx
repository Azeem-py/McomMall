'use client';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full h-[450px] grid grid-cols-1 md:grid-cols-2 gap-2 overflow-hidden rounded-xl">
      <div className="h-full w-full relative">
        <Image
          src={images[0]}
          alt="Main listing image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="h-full hidden md:grid grid-cols-1 grid-rows-2 gap-2">
        <div className="h-full w-full relative">
          <Image
            src={images[0]}
            alt="Listing image 2"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="h-full w-full relative">
          <Image
            src={images[0]}
            alt="Listing image 3"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
