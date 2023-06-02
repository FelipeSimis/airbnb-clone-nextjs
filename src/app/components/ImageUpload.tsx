'use client';

import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { RiImageAddLine } from '@react-icons/all-files/ri/RiImageAddLine';

type ImageUploadProps = {
  value: string | undefined;
  onChange: (value: string) => void;
};

type UploadResult = {
  info: {
    secure_url: string;
  };
};

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const handleUpload = (result: UploadResult) => {
    onChange(result.info.secure_url);
  };

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="rkb1u68q"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <button
            type="button"
            aria-label="Select image"
            onClick={() => open?.()}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition-opacity hover:opacity-70"
          >
            <RiImageAddLine size={50} />

            <div className="text-lg font-semibold">Click to upload</div>

            {value && (
              <div className="absolute inset-0 h-full w-full">
                <CldImage
                  src={value}
                  alt="Uploaded picture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 100vw, 50vw"
                  priority
                />
              </div>
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
