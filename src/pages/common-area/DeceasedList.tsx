import CardContainer from '@/components/CardContainer';
import { Button } from '@/components/ui/button';
import usePrivateHeader from '@/hooks/usePrivateHeader';
import AddNewDeceasedFormSheet from './components/AddNewDeceasedFormSheet';
import { useCallback, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { DeceasedResponse } from '@/types/deceased-types';
import { useQuery } from '@tanstack/react-query';
import getDeceasedListByCryptIdQuery from './queries/getDeceasedListByCryptIdQuery';
import DataTable from '@/components/DataTable';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import calculateAgeDied from '@/utils/calculateAgeDied';
import supabase from '@/supabase-client';

export { default as loader } from './loaders/deceasedListLoader';

export function Component() {
  const { id } = useParams();
  const initialData = useLoaderData() as { data: Array<DeceasedResponse>; count: number | null };

  const [searchParams, setSearchParams] = useCustomSearchParams();
  const { page, size } = searchParams as SearchParams;

  const { data: deceasedList, isFetching } = useQuery({
    ...getDeceasedListByCryptIdQuery({ cryptId: id ?? '', page, size }),
    placeholderData: initialData,
  });

  const [openAddSheet, setOpenAddSheet] = useState(false);

  const handleOpenAddSheet = () => setOpenAddSheet(true);
  const closeAddSheet = () => setOpenAddSheet(false);

  const onPaginationChange = useCallback(
    ({ page, size }: { page: number; size: number }) =>
      setSearchParams({
        page,
        size,
      }),
    [],
  );

  const downloadFile = async (path: string, lastname: string) => {
    const { data, error } = await supabase.storage.from('docs').download(path.replace('docs/', ''));

    if (error) throw error;

    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${lastname}-death-certificate`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  usePrivateHeader({
    title: 'Common Area Deceased List',
    showBack: true,
    extra: (
      <div className="flex justify-center">
        <Button size="sm" onClick={handleOpenAddSheet}>
          Add New Deceased
        </Button>
      </div>
    ),
  });

  return (
    <CardContainer>
      <AddNewDeceasedFormSheet cryptId={id ?? ''} open={openAddSheet} closeSheet={closeAddSheet} />
      <DataTable
        isLoading={isFetching}
        data={deceasedList?.data ?? []}
        columns={[
          {
            header: 'Deceased',
            accessorKey: 'firstname',
            cell: ({ row }) => (
              <span>{`${row.original.firstname} ${row.original.middlename} ${row.original.lastname}`}</span>
            ),
          },
          {
            header: 'Birthday',
            accessorKey: 'dob',
          },
          {
            header: 'Death',
            accessorKey: 'dod',
          },
          {
            header: 'Age died',
            accessorKey: 'age-died',
            cell: ({ row }) => calculateAgeDied(new Date(row.original.dob), new Date(row.original.dod)),
          },
          {
            header: 'Certificate',
            accessorKey: 'death_certificate',
            cell: ({ row }) => (
              <Button
                variant="link"
                className="w-50 p-0"
                onClick={() => downloadFile(row.original.death_certificate, row.original.lastname)}
              >
                <span className="truncate">{row.original.death_certificate}</span>
              </Button>
            ),
          },
        ]}
        paginationOption={{
          totalCount: deceasedList?.count ?? 0,
          rowsPerPageOptions: [10, 20, 50],
          pageSize: size ?? DEFAULT_SIZE,
          activePage: page ?? DEFAULT_PAGE,
          onPageChange: onPaginationChange,
        }}
      />
    </CardContainer>
  );
}

export type SearchParams = {
  size?: number;
  page?: number;
};
