'use client';

import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';

import { useFavorites } from '@hooks/useFavorites';

import { SafeUserWithFavorite } from '../types';

type HeartButtonProps = {
  listingId: string;
  currentUser?: SafeUserWithFavorite | null;
};

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites({
    listingId,
    currentUser,
  });

  return (
    <button
      type="button"
      aria-label="Add to favorites"
      onClick={toggleFavorite}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className="relative cursor-pointer transition-opacity hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />

      <AiFillHeart
        size={24}
        className={isFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </button>
  );
};

export default HeartButton;
