'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { IconType } from '@react-icons/all-files';
import qs from 'query-string';

type CategoryBoxProps = {
  label: string;
  icon: IconType;
  description?: string;
  selected?: boolean;
};

type QueryType = {
  category?: string;
  page?: number;
};

const CategoryBox = ({
  label,
  icon: Icon,
  description,
  selected,
}: CategoryBoxProps) => {
  const { push } = useRouter();

  const params = useSearchParams();

  const handleClick = () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: QueryType = {
      ...currentQuery,
      category: label,
      page: 1,
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    push(url);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={description}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition-colors hover:text-neutral-800 ${
        selected
          ? 'border-b-neutral-800 text-neutral-800'
          : 'transparent text-neutral-500'
      }`}
    >
      <Icon size={26} />

      <div className="text-sm font-medium">{label}</div>
    </button>
  );
};

export default CategoryBox;
