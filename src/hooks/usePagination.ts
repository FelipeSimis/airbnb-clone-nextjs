type UsePaginationProps = {
  page?: number;
  totalItems: number;
  firstPagesCount: number;
  lastPagesCount: number;
  adjacentPages: number;
  itemsPerPage: number;
};

export const usePagination = ({
  page,
  totalItems,
  firstPagesCount,
  lastPagesCount,
  adjacentPages,
  itemsPerPage,
}: UsePaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentPage = page || 1;

  const getFirstPages = () => {
    if (totalPages === 1) return [1];

    const pages: (string | number)[] = [];

    for (let i = 1; i <= firstPagesCount; i += 1) {
      pages.push(i);
    }

    return pages;
  };

  const getLastPages = () => {
    if (totalPages <= 2) return [];

    const pages: number[] = [];

    for (let i = totalPages - lastPagesCount + 1; i <= totalPages; i += 1) {
      pages.push(i);
    }

    return pages;
  };

  const getMiddlePages = () => {
    const middlePages: (number | string)[] = [];

    if (currentPage && totalPages > 1) {
      const startPage = Math.max(1, currentPage - adjacentPages);
      const endPage = Math.min(totalPages, currentPage + adjacentPages);

      const shouldAddFirstBreakpoint = startPage > firstPagesCount + 1;
      const shouldAddLastBreakpoint = endPage < totalPages - lastPagesCount;

      if (shouldAddFirstBreakpoint) {
        middlePages.push('...');
      }

      const firstPageItems = getFirstPages();
      const lastPageItems = getLastPages();

      for (let i = startPage; i <= endPage; i += 1) {
        if (!firstPageItems.includes(i) || !lastPageItems.includes(i)) {
          middlePages.push(i);
        }
      }

      if (shouldAddLastBreakpoint) {
        middlePages.push('...');
      }
    }

    return middlePages;
  };

  const getPages = () => {
    const firstPages = getFirstPages();
    const middlePages = getMiddlePages();
    const lastPages = getLastPages();

    const mergedPages = [...firstPages, ...middlePages, ...lastPages];

    const uniquePages = mergedPages.filter(
      (item, index) =>
        typeof item !== 'number' || mergedPages.lastIndexOf(item) === index
    );

    return uniquePages;
  };

  return {
    currentPage,
    totalPages,
    getPages,
    getFirstPages,
    getMiddlePages,
    getLastPages,
  };
};
