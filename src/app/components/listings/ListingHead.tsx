'use client';

import { CldImage } from 'next-cloudinary';

import { useCountries } from '@hooks/useCountries';

import Heading from '@components/Heading';

type ListingHeadProps = {
  title: string;
  imageSrc: string;
  locationValue: string;
  heartButton: React.ReactNode;
};

const ListingHead = ({
  title,
  imageSrc,
  locationValue,
  heartButton,
}: ListingHeadProps) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      <div className="relative w-full overflow-hidden rounded-xl sm:h-[60vh]">
        <a
          href={imageSrc}
          target="_blank"
          title="View full image"
          rel="noopener noreferrer"
        >
          <CldImage
            src={imageSrc}
            alt="Property image"
            width={1024}
            height={700}
            sizes="(max-width: 768px) 100vw, 1024px"
            className="h-full w-full object-cover"
            priority
            format="webp"
          />
        </a>

        <div className="absolute right-5 top-5">{heartButton}</div>
      </div>
    </>
  );
};

export default ListingHead;
