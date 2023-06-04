'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { fetchWrapper } from '@services/api';

import ListingCard from '@components/listings/ListingCard';
import EditButton from '@components/EditButton';

import { SafeListing } from '../../types';

interface PropertiesClientProps {
  properties: SafeListing[] | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ properties }) => {
  const [deletingId, setDeletingId] = useState('');

  const { refresh } = useRouter();

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await fetchWrapper(`/api/listings/${id}`, {
          method: 'DELETE',
        });

        toast.success('Property deleted from listings.');

        refresh();
      } catch (error) {
        toast.error('Something went wrong.');
      } finally {
        setDeletingId('');
      }
    },
    [refresh]
  );

  return (
    <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {properties?.map(listing => (
        <ListingCard
          key={listing.id}
          data={listing}
          actionId={listing.id}
          onAction={onCancel}
          disabled={deletingId === listing.id}
          actionLabel="Delete property"
          editButton={<EditButton listingId={listing.id} />}
        />
      ))}
    </div>
  );
};

export default PropertiesClient;
