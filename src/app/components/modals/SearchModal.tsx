'use client';

import { useCallback, useMemo, useReducer } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import type { Range } from 'react-date-range';

import { formatISO } from '@utils/formatISO';

import { useSearchModal } from '@hooks/useModal';

import Modal from '@components/modals/Modal';
import CountrySelect, {
  type CountrySelectValue,
} from '@components/inputs/CountrySelect';
import Calendar from '@components/inputs/Calendar';
import { Skeleton } from '@components/Skeleton';
import LocationStep from './RentModal/steps/LocationStep';
import InfoStep from './RentModal/steps/InfoStep';

type QueryType = {
  location?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
};

const STEPS = {
  LOCATION: 0,
  DATE: 1,
  INFO: 2,
};

const totalSteps = Object.keys(STEPS).length;

const Map = dynamic(() => import('@components/Map'), {
  ssr: false,
  loading: () => <Skeleton />,
});

const initialState = {
  step: 0,
  location: {
    label: undefined,
    flag: '',
    value: undefined,
    latlng: [51, -0.09] as [number, number],
    region: '',
  },
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  dateRange: {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
};

type StateType = {
  step: number;
  location: CountrySelectValue;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  dateRange: Range;
};

type SetterCustomValue =
  | 'SET_GUEST_COUNT'
  | 'SET_ROOM_COUNT'
  | 'SET_BATHROOM_COUNT';

type ActionType =
  | { type: 'SET_STEP'; payload: number }
  | {
      type: 'SET_LOCATION';
      payload: CountrySelectValue;
    }
  | { type: 'SET_GUEST_COUNT'; payload: number }
  | { type: 'SET_ROOM_COUNT'; payload: number }
  | { type: 'SET_BATHROOM_COUNT'; payload: number }
  | {
      type: 'SET_DATE_RANGE';
      payload: Range;
    };

const searchReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_GUEST_COUNT':
      return { ...state, guestCount: action.payload };
    case 'SET_ROOM_COUNT':
      return { ...state, roomCount: action.payload };
    case 'SET_BATHROOM_COUNT':
      return { ...state, bathroomCount: action.payload };
    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    default:
      return state;
  }
};

const SearchModal = () => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const { step, location, guestCount, roomCount, bathroomCount, dateRange } =
    state;

  const { replace } = useRouter();

  const params = useSearchParams();

  const { isOpen, closeModal } = useSearchModal();

  const onPreviousStep = useCallback(
    () =>
      dispatch({
        type: 'SET_STEP',
        payload: step - 1,
      }),
    [step]
  );

  const onNextStep = useCallback(
    () =>
      dispatch({
        type: 'SET_STEP',
        payload: step + 1,
      }),
    [step]
  );

  const onSubmit = useCallback(async () => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: QueryType = {
      ...currentQuery,
      location: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    dispatch({ type: 'SET_STEP', payload: 0 });

    closeModal();

    replace(url);
  }, [
    bathroomCount,
    closeModal,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    params,
    replace,
    roomCount,
  ]);

  const setCustomValue = useCallback(
    (id: 'guestCount' | 'roomCount' | 'bathroomCount', value: number) => {
      const setters = {
        guestCount: 'SET_GUEST_COUNT',
        roomCount: 'SET_ROOM_COUNT',
        bathroomCount: 'SET_BATHROOM_COUNT',
      };

      const actionType = setters[id];

      if (actionType) {
        dispatch({ type: actionType as SetterCustomValue, payload: value });
      }
    },
    []
  );

  const actionLabel = useMemo(() => {
    if (step === totalSteps - 1) {
      return 'Search';
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
    [STEPS.LOCATION]: (
      <LocationStep
        title="Where do you wanna go?"
        countrySelect={
          <CountrySelect
            value={location}
            onChange={value =>
              dispatch({ type: 'SET_LOCATION', payload: value })
            }
          />
        }
        map={<Map center={location?.latlng} />}
      />
    ),
    [STEPS.DATE]: (
      <Calendar
        value={dateRange}
        onChange={value =>
          dispatch({ type: 'SET_DATE_RANGE', payload: value.selection })
        }
      />
    ),
    [STEPS.INFO]: (
      <InfoStep
        watchGuestCount={guestCount}
        watchRoomCount={roomCount}
        watchBathroomCount={bathroomCount}
        setCustomValue={setCustomValue}
      />
    ),
  };

  const bodyContent = stepContentMapping[step];

  return (
    <Modal
      title="Filter"
      isOpen={isOpen}
      onClose={closeModal}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === 0 ? undefined : onPreviousStep}
      body={bodyContent}
      onSubmit={step !== totalSteps - 1 ? onNextStep : onSubmit}
    />
  );
};

export default SearchModal;
