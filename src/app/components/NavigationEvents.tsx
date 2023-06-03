'use client';

import { useCallback, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type NavigationEventsProps = {
  setIsOpen: (isOpen: boolean) => void;
};

const NavigationEvents = ({ setIsOpen }: NavigationEventsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setIsOpenCallback = useCallback(
    (isOpen: boolean) => {
      setIsOpen(isOpen);
    },
    [setIsOpen]
  );

  useEffect(() => {
    setIsOpenCallback(false);
  }, [pathname, searchParams, setIsOpenCallback]);

  return null;
};

export default NavigationEvents;
