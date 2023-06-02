'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { BiSearch } from '@react-icons/all-files/bi/BiSearch';

import { eachDayOfInterval } from '@utils/eachDayOfInterval';

import { useSearchModal } from '@hooks/useModal';
import { useCountries } from '@hooks/useCountries';

export const Search = () => {
  const { openModal } = useSearchModal();

  const searchParams = useSearchParams();

  const { getByValue } = useCountries();

  const locationParam = searchParams.get('location');
  const startDateParam = searchParams.get('startDate');
  const endDateParam = searchParams.get('endDate');
  const guestCount = searchParams.get('guestCount');

  const location = useMemo(() => {
    if (locationParam) {
      return getByValue(locationParam)?.label;
    }

    return 'Anywhere';
  }, [getByValue, locationParam]);

  const date = useMemo(() => {
    if (startDateParam && endDateParam) {
      const days =
        eachDayOfInterval({
          start: new Date(startDateParam),
          end: new Date(endDateParam),
        }).length - 1;

      return days === 0 ? 'Any Week' : `${days} night${days > 1 ? 's' : ''}`;
    }

    return 'Any Week';
  }, [endDateParam, startDateParam]);

  const guests = useMemo(() => {
    return guestCount
      ? `${guestCount} guest${Number(guestCount) === 1 ? '' : 's'}`
      : 'Add Guests';
  }, [guestCount]);

  return (
    <button
      type="button"
      onClick={openModal}
      className="w-full cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition-colors hover:shadow-md md:w-auto"
    >
      <div className="flex items-center justify-between">
        <div className="px-6 text-sm font-semibold">{location}</div>

        <div className="hidden flex-1 border-x-[1px] px-6 text-center text-sm font-semibold sm:block">
          {date}
        </div>

        <div className="flex items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
          <div className="hidden sm:block">{guests}</div>

          <div className="rounded-full bg-rose-500 p-2 text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </button>
  );
};
