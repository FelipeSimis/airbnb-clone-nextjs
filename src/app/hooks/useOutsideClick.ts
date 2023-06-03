import { RefObject, useCallback, useEffect } from 'react';

type Props = {
  ref: RefObject<HTMLDivElement>;
  buttonRef?: RefObject<HTMLButtonElement>;
  setIsOpen: (v: boolean) => void;
};

export const useOutsideClick = ({ ref, buttonRef, setIsOpen }: Props) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const isOutsideClick =
        !ref.current?.contains(event.target as Node) &&
        !buttonRef?.current?.contains(event.target as Node);

      if (isOutsideClick) {
        setIsOpen(false);
      }
    },
    [buttonRef, ref, setIsOpen]
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
