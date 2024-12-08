import { Fragment, useMemo, useRef } from 'react';
import Spinner from './Spinner';
import { cn } from '@/lib/utils';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  type Row,
  type TableOptions,
} from '@tanstack/react-table';
import { Transition } from 'react-transition-group';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Pagination from './Pagination';

const paginationTransitionClasses = {
  entering: 'opacity-0 invisible',
  entered: 'opacity-100 visible',
  exiting: 'opacity-0 visible',
  exited: 'opacity-0 visible',
  unmounted: '',
};

function DataTable<TData, TValue>({
  className,
  thClassName,
  tcClassName,
  columns,
  data,
  emptyMessage = <NoResult />,
  isLoading,
  paginationOption,
  expandedRowContent,
  enableRowSelection = false,
  ...other
}: DataTableProps<TData, TValue> & Omit<TableOptions<TData>, 'data' | 'columns' | 'getCoreRowModel'>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection,
    getExpandedRowModel: getExpandedRowModel(),
    ...other,
  });

  return (
    <div className={cn('py-2', className)}>
      <div className="relative">
        <div
          className={cn('inset-0 z-1 hidden cursor-not-allowed bg-stroke/30 dark:bg-black/50', {
            'absolute block': isLoading,
          })}
        />
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className={cn('p-2 font-bold', thClassName)} key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    className={cn('group hover:!bg-bodydark1 dark:hover:!bg-boxdark-2', {
                      '!bg-bodydark1 dark:!bg-boxdark-2': row.getIsSelected(),
                      'cursor-pointer': enableRowSelection,
                    })}
                    onClick={row.getToggleSelectedHandler()}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className={cn('p-2', tcClassName)} key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && expandedRowContent && (
                    <TableRow>
                      <TableCell colSpan={row.getVisibleCells().length}>{expandedRowContent(row)}</TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {paginationOption && <DataTablePagination isLoading={isLoading} {...paginationOption} />}
    </div>
  );
}

function DataTablePagination(props: PaginationOptionProps & { isLoading?: boolean }) {
  const paginationNodeRef = useRef<HTMLDivElement>(null);

  const { isLoading, pageSize, activePage, totalCount, rowsPerPageOptions, onPageChange } = props;

  const pageFrom = useMemo<number>(() => pageSize * (activePage - 1) + 1, [pageSize, activePage]);

  const pageTo = useMemo<number>(() => {
    const to = pageSize * Number(activePage);
    if (to <= (totalCount ?? 0)) return to;
    return totalCount ?? 0;
  }, [totalCount, activePage, pageSize]);

  return (
    <Transition
      nodeRef={paginationNodeRef}
      in={true}
      timeout={{
        enter: 300,
        exit: 0,
      }}
      unmountOnExit
    >
      {(state) => (
        <div
          ref={paginationNodeRef}
          className={cn(
            'flex items-center justify-between gap-2 py-4 transition-all duration-200 max-[720px]:flex-col',
            paginationTransitionClasses[state],
          )}
        >
          <label className="text-sm font-medium">{`Showing ${pageFrom} to ${pageTo} of ${totalCount} entries`}</label>
          <div className="flex items-center gap-2 max-[510px]:flex-col">
            <div className="flex flex-wrap items-center">
              {isLoading && <Spinner className="h-5 w-5" />}
              <Pagination
                currentPage={activePage}
                onPageChange={(currentPage) => {
                  onPageChange({
                    size: pageSize,
                    page: currentPage,
                  });
                }}
                pageSize={pageSize}
                totalCount={totalCount}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={pageSize.toString()}
                onValueChange={(selected) =>
                  onPageChange({
                    size: Number(selected),
                    page: 1,
                  })
                }
              >
                <SelectTrigger className="w-auto min-w-[55px] p-2 text-sm">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {rowsPerPageOptions.map((item, key) => (
                      <SelectItem key={key} value={item.toString()}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <label className="text-sm font-medium">Entries Per Page</label>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
}

function NoResult() {
  return <div className="text-center">No result.</div>;
}

interface DataTableProps<TData, TValue> {
  className?: string;
  thClassName?: string;
  tcClassName?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyMessage?: React.ReactNode;
  isLoading?: boolean;
  expandedRowContent?: (row: Row<TData>) => React.ReactElement;
  paginationOption?: PaginationOptionProps;
}

interface PaginationOptionProps {
  totalCount: number;
  activePage: number;
  pageSize: number;
  rowsPerPageOptions: number[];
  onPageChange: ({ page, size }: { page: number; size: number }) => void;
}

export default DataTable;
