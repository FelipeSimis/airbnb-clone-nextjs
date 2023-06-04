'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

import { fetchWrapper } from '@services/api';

import {
  EditPropertyData,
  partialEditPropertySchema,
} from '@schemas/editPropertySchema';

import { useCountries } from '@hooks/useCountries';

import Container from '@components/Container';
import Heading from '@components/Heading';
import Input from '@components/inputs/Input';
import { categories } from '@components/navbar/Categories';
import CategoryInput from '@components/inputs/CategoryInput';
import Counter from '@components/Counter';
import CountrySelect, {
  type CountrySelectValue,
} from '@components/inputs/CountrySelect';
import { Skeleton } from '@components/Skeleton';
import Button from '@components/Button';

import { SafeListing, SafeUser } from '../../../../types';

const Map = dynamic(() => import('@components/Map'), {
  ssr: false,
  loading: () => <Skeleton />,
});

const ImageUpload = dynamic(() => import('@components/ImageUpload'), {
  ssr: false,
  loading: () => <Skeleton height="h-[40vh]" />,
});

type EditPropertyClientProps = {
  listing: SafeListing & {
    user: SafeUser;
  };
};

const EditPropertyClient = ({ listing }: EditPropertyClientProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { getByValue } = useCountries();

  const listingLocation = getByValue(listing.locationValue);

  const { push } = useRouter();

  const defaultValues = {
    title: listing?.title,
    description: listing?.description,
    roomCount: listing?.roomCount,
    bathroomCount: listing?.bathroomCount,
    guestCount: listing?.guestCount,
    category: listing?.category,
    price: listing?.price,
    imageSrc: listing?.image,
    location: listingLocation,
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditPropertyData>({
    resolver: zodResolver(partialEditPropertySchema),
    defaultValues,
  });

  const watchCategory = watch('category');
  const watchLocation = watch('location');
  const watchGuestCount = watch('guestCount');
  const watchRoomCount = watch('roomCount');
  const watchBathroomCount = watch('bathroomCount');
  const watchImageSrc = watch('imageSrc');

  const setCustomValue = useCallback(
    (id: keyof EditPropertyData, value: string | number) => {
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue]
  );

  const onSubmit = async <T extends keyof EditPropertyData>(
    data: EditPropertyData
  ) => {
    setIsLoading(true);

    const updatedData = {} as EditPropertyData;

    Object.keys(data).forEach(key => {
      if (data[key as T] !== defaultValues[key as T]) {
        updatedData[key as T] = data[key as T];
      }
    });

    try {
      await fetchWrapper(`/api/listings/${listing.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
      });

      toast.success('Listing updated!');

      push(`/listings/${listing.id}`);
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Heading title="Edit your property" showBackLink />

            <ImageUpload
              value={watchImageSrc}
              onChange={imageSrc => setCustomValue('imageSrc', imageSrc)}
            />

            <Input
              id="title"
              label="Title"
              register={register}
              error={errors.title}
              defaultValue={listing?.title}
            />

            <Input
              id="description"
              label="Description"
              register={register}
              error={errors.description}
              defaultValue={listing?.description}
            />

            <Input
              id="price"
              label="Price"
              register={register}
              error={errors.price}
              defaultValue={listing?.price}
            />

            <div className="grid grid-cols-1 gap-3 overflow-y-auto scrollbar scrollbar-thumb-gray-300 scrollbar-thumb-rounded-md scrollbar-w-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {categories.map(item => (
                <div key={item.label} className="col-span-1">
                  <CategoryInput
                    label={item.label}
                    selected={watchCategory === item.label}
                    icon={item.icon}
                    onClick={category => setCustomValue('category', category)}
                  />
                </div>
              ))}
            </div>

            <Counter
              title="Number of guests"
              subtitle="How many guests?"
              value={watchGuestCount}
              onChange={guestCount => setCustomValue('guestCount', guestCount)}
            />

            <Counter
              title="Number of rooms"
              subtitle="How many rooms?"
              value={watchRoomCount}
              onChange={roomCount => setCustomValue('roomCount', roomCount)}
            />

            <Counter
              title="Number of bathrooms"
              subtitle="How many bathrooms?"
              value={watchBathroomCount}
              onChange={bathroomCount =>
                setCustomValue('bathroomCount', bathroomCount)
              }
            />

            <CountrySelect
              value={watchLocation as unknown as CountrySelectValue}
              onChange={location =>
                setCustomValue('location', location as unknown as string)
              }
            />

            <Map center={watchLocation?.latlng} />

            <Button
              label="Edit"
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EditPropertyClient;
