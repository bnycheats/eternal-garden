import { cn } from '@/lib/utils';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import PaginationButton from './PaginationButton';
import usePagination, { DOTS } from './usePagination';

function Pagination(props: PaginationProps) {
  const { position = 'left', onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const pages = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (pages && pages?.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = pages && pages[pages.length - 1];

  return (
    <ul
      className={cn('flex flex-wrap items-center', {
        'justify-start': position === 'left',
        'justify-center': position === 'center',
        'justify-end': position === 'right',
      })}
    >
      <li>
        <PaginationButton disabled={currentPage === 1} onClick={onPrevious}>
          <AiOutlineLeft className="!text-lg rtl:hidden" />
          <AiOutlineRight className="!text-lg ltr:hidden" />
        </PaginationButton>
      </li>
      {pages?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={`${pageNumber}-${index}`} className="flex h-8 w-8 items-center justify-center">
              &#8230;
            </li>
          );
        }
        return (
          <li key={`${pageNumber}-${index}`}>
            <PaginationButton active={pageNumber === currentPage} onClick={() => onPageChange(Number(pageNumber))}>
              {pageNumber}
            </PaginationButton>
          </li>
        );
      })}
      <li>
        <PaginationButton disabled={currentPage === lastPage} onClick={onNext}>
          <AiOutlineRight className="!text-lg rtl:hidden" />
          <AiOutlineLeft className="!text-lg ltr:hidden" />
        </PaginationButton>
      </li>
    </ul>
  );
}

type PaginationProps = {
  position?: 'left' | 'center' | 'right';
  onPageChange: (currentPage: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

export default Pagination;
