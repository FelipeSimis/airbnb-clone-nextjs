import { useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

import { fetchWrapper } from '@services/api';

import { useLoginModal } from '@hooks/useModal';

import { SafeUserWithFavorite } from '../types';

type UseFavoritesProps = {
  listingId: string;
  currentUser?: SafeUserWithFavorite | null;
};

export const useFavorites = ({ listingId, currentUser }: UseFavoritesProps) => {
  const { openModal } = useLoginModal();

  const [favorites, setFavorites] = useState<string[]>(
    currentUser?.favorites.map(item => item.listingId) || []
  );

  const isFavorite = useMemo(() => {
    return favorites.includes(listingId);
  }, [favorites, listingId]);

  const addToFavorite = async (id: string) => {
    try {
      await fetchWrapper(`/api/favorites/${id}`, {
        method: 'POST',
      });

      setFavorites(prevFavorites => [...prevFavorites, id]);

      toast.success('Added to favorites!');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      await fetchWrapper(`/api/favorites/${id}`, {
        method: 'DELETE',
      });

      setFavorites(prevFavorites =>
        prevFavorites.filter(favoriteId => favoriteId !== id)
      );

      toast.success('Removed from favorites!');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const toggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return openModal();
    }

    try {
      if (isFavorite) {
        return await removeFavorite(listingId);
      }

      return await addToFavorite(listingId);
    } catch (error) {
      return toast.error('Something went wrong!');
    }
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
};
