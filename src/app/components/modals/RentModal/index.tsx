'use client';

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useForm, type FieldErrors, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { fetchWrapper } from '@services/api';

import { useRentModal } from '@hooks/useModal';

import { RentFormData, rentSchema } from '@schemas/rentSchema';

import Modal from '@components/modals/Modal';
import CountrySelect, {
  CountrySelectValue,
} from '@components/inputs/CountrySelect';
import { Skeleton } from '@components/Skeleton';
import { CategoryStep } from './steps/CategoryStep';
import LocationStep from './steps/LocationStep';
import InfoStep from './steps/InfoStep';
import ImagesStep from './steps/ImagesStep';
import DescriptionStep from './steps/DescriptionStep';
import PriceStep from './steps/PriceStep';

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

const totalSteps = Object.keys(STEPS).length;

const Map = dynamic(() => import('@components/Map'), {
  ssr: false,
  loading: () => <Skeleton />,
});

export type InputStepProps = {
  isLoading: boolean;
  register: UseFormRegister<RentFormData>;
  errors: FieldErrors<RentFormData>;
};

const RentModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);

  const { isOpen, closeModal } = useRentModal();

  const { refresh } = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<RentFormData>({
    defaultValues: {
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      price: 1,
    },
    resolver: zodResolver(rentSchema),
  });

  const watchCategory = watch('category');
  const watchLocation = watch('location');
  const watchGuestCount = watch('guestCount');
  const watchRoomCount = watch('roomCount');
  const watchBathroomCount = watch('bathroomCount');
  const watchImageSrc = watch('imageSrc');

  const setCustomValue = useCallback(
    (id: keyof RentFormData, value: string | number) => {
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue]
  );

  const onPreviousStep = useCallback(() => {
    setStep(prev => prev - 1);
  }, []);

  const onNextStep = useCallback(() => {
    setStep(prev => prev + 1);
  }, []);

  const onSubmit = async (data: RentFormData) => {
    setIsLoading(true);

    try {
      await fetchWrapper('/api/listings', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      toast.success('Listing created!');

      reset();
      setStep(STEPS.CATEGORY);
      closeModal();
      refresh();
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  const actionLabel = useMemo(() => {
    if (step === totalSteps - 1) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === 0) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  const stepContentMapping = {
    [STEPS.CATEGORY]: (
      <CategoryStep
        watchCategory={watchCategory}
        setCustomValue={setCustomValue}
      />
    ),
    [STEPS.LOCATION]: (
      <LocationStep
        countrySelect={
          <CountrySelect
            value={watchLocation as unknown as CountrySelectValue}
            onChange={location =>
              setCustomValue('location', location as unknown as string)
            }
          />
        }
        map={<Map center={watchLocation?.latlng} />}
      />
    ),
    [STEPS.INFO]: (
      <InfoStep
        watchGuestCount={watchGuestCount}
        watchRoomCount={watchRoomCount}
        watchBathroomCount={watchBathroomCount}
        setCustomValue={setCustomValue}
      />
    ),
    [STEPS.IMAGES]: (
      <ImagesStep
        watchImageSrc={watchImageSrc}
        setCustomValue={setCustomValue}
      />
    ),
    [STEPS.DESCRIPTION]: (
      <DescriptionStep
        isLoading={isLoading}
        register={register}
        errors={errors}
      />
    ),
    [STEPS.PRICE]: (
      <PriceStep isLoading={isLoading} register={register} errors={errors} />
    ),
  };

  const bodyContent = stepContentMapping[step];

  return (
    <Modal
      title="Airbnb your home!"
      disabled={isLoading}
      isOpen={isOpen}
      onClose={closeModal}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === 0 ? undefined : onPreviousStep}
      body={bodyContent}
      onSubmit={step !== totalSteps - 1 ? onNextStep : handleSubmit(onSubmit)}
    />
  );
};

export default RentModal;
