import { RefObject, useCallback, useEffect } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  setIsOpen: (v: boolean) => void
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    },
    [ref, setIsOpen]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, {
      passive: true,
    });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};
