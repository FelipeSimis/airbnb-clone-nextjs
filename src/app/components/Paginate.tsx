'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { FiChevronLeft } from '@react-icons/all-files/fi/FiChevronLeft';
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';

import { usePagination } from '@hooks/usePagination';

import { ITEMS_PER_PAGE } from '../../types';

type PaginateProps = {
  page?: number;
  totalItems: number;
};

const firstPagesCount = 2;
const lastPagesCount = 2;
const adjacentPages = 2;

const Paginate = ({ page, totalItems }: PaginateProps) => {
  const pathname = usePathname();

  const params = useSearchParams();

  let currentQuery = {};

  if (params) {
    currentQuery = queryString.parse(params.toString());
  }

  const { push } = useRouter();

  const { currentPage, totalPages, getPages } = usePagination({
    page,
    totalItems,
    firstPagesCount,
    lastPagesCount,
    adjacentPages,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const renderPagination = () => {
    const pages = getPages();

    return pages.map((item, index) => {
      const isActive = item === currentPage;

      const isBreakpoint = item === '...';

      let linkPage = isBreakpoint ? currentPage + 3 : item;

      if (isBreakpoint && index === firstPagesCount) {
        linkPage = currentPage - 3;
      }

      return (
        <Link
          key={linkPage}
          href={{
            pathname,
            query: {
              ...currentQuery,
              page: linkPage,
            },
          }}
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors  ${
            isActive
              ? 'bg-rose-500 text-white hover:bg-rose-700'
              : 'bg-[#d7dade] text-black hover:bg-[#b8c1cc]'
          }`}
        >
          {item}
        </Link>
      );
    });
  };

  return (
    <div className="mt-14 flex w-full items-center justify-center gap-4">
      <button
        type="button"
        aria-label={
          currentPage === 1
            ? `Go to previous page (Disabled)`
            : `Go to previous page`
        }
        disabled={currentPage - 1 === 0}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d7dade] text-black transition-colors hover:bg-[#b8c1cc]"
        onClick={() => push(`${pathname}/?page=${currentPage - 1}`)}
      >
        <FiChevronLeft size={16} />
      </button>

      {renderPagination()}

      <button
        type="button"
        aria-label={
          currentPage === totalPages
            ? `Go to next page (Disabled)`
            : `Go to next page`
        }
        disabled={currentPage === totalPages}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d7dade] text-black transition-colors
        hover:bg-[#b8c1cc]"
        onClick={() => push(`${pathname}/?page=${currentPage + 1}`)}
      >
        <FiChevronRight size={16} />
      </button>
    </div>
  );
};

export default Paginate;
