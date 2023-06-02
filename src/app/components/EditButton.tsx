'use client';

import { useRouter } from 'next/navigation';
import { FiEdit } from '@react-icons/all-files/fi/FiEdit';

type EditButtonProps = {
  listingId: string;
};

const EditButton = ({ listingId }: EditButtonProps) => {
  const { push } = useRouter();

  const handleEditProperty = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    push(`/properties/edit/${listingId}`);
  };

  return (
    <button
      type="button"
      aria-label="Edit property"
      onClick={handleEditProperty}
      title="Edit property"
      className="relative cursor-pointer transition-opacity hover:opacity-80 "
    >
      <FiEdit size={24} color="#fff" />
    </button>
  );
};

export default EditButton;
