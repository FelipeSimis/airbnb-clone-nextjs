'use client';

import { Suspense, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { AiOutlineMenu } from '@react-icons/all-files/ai/AiOutlineMenu';

import { useLoginModal, useRegisterModal, useRentModal } from '@hooks/useModal';
import { useOutsideClick } from '@hooks/useOutsideClick';

import Avatar from '@components/Avatar';
import NavigationEvents from '@components/NavigationEvents';
import MenuItem from './MenuItem';

import { SafeUser } from '../../types';

type UserMenuProps = {
  currentUser?: SafeUser | null;
};

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { openModal: openLoginModal } = useLoginModal();
  const { openModal: openRegisterModal } = useRegisterModal();
  const { openModal: openRentModal } = useRentModal();

  useOutsideClick({
    ref: menuRef,
    buttonRef,
    setIsOpen,
  });

  const { push } = useRouter();

  const handleToggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const onRent = () => {
    if (!currentUser) {
      return openLoginModal();
    }

    return openRentModal();
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onRent}
          className="hidden rounded-full px-4 py-3 text-sm font-semibold transition-colors hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </button>

        <button
          type="button"
          onClick={handleToggleMenu}
          ref={buttonRef}
          aria-label="Open menu"
          className="flex items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition-colors hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />

          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4"
        >
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem label="My trips" onClick={() => push('/trips')} />
                <MenuItem
                  label="My favorites"
                  onClick={() => push('/favorites')}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => push('/reservations')}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => push('/properties')}
                />
                <MenuItem label="Airbnb my home" onClick={onRent} />

                <hr />

                <MenuItem label="Logout" onClick={signOut} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={openLoginModal} />
                <MenuItem label="Sign Up" onClick={openRegisterModal} />
              </>
            )}
          </div>
        </div>
      )}

      <Suspense>
        <NavigationEvents setIsOpen={setIsOpen} />
      </Suspense>
    </div>
  );
};

export default UserMenu;
