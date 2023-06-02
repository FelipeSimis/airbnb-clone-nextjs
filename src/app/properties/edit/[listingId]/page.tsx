import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getCurrentUser } from '@helpers/getCurrentUser';
import { getListingById } from '@helpers/getListingById';

import EditPropertyClient from './EditPropertyClient';

type EditPropertyPageProps = {
  params: {
    listingId: string;
  };
};

export async function generateMetadata({
  params: { listingId },
}: EditPropertyPageProps): Promise<Metadata> {
  const listing = await getListingById({ listingId });

  return {
    title: `Airbnb ${listing?.title && `| Edit ${listing.title}`}`,
  };
}

const EditPropertyPage = async ({
  params: { listingId },
}: EditPropertyPageProps) => {
  const currentUser = await getCurrentUser();
  const listing = await getListingById({ listingId });

  if (currentUser?.id !== listing?.userId || !listing) {
    return redirect('/');
  }

  return <EditPropertyClient listing={listing} />;
};

export default EditPropertyPage;
