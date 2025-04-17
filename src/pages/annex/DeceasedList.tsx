import CardContainer from '@/components/CardContainer';
import { Button } from '@/components/ui/button';
import usePrivateHeader from '@/hooks/usePrivateHeader';
import AddNewDeceasedFormSheet from '../../components/Burial/AddNewDeceasedFormSheet';
import { useCallback, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { DeceasedResponse } from '@/types/deceased-types';
import { useQuery } from '@tanstack/react-query';
import getDeceasedListByCryptIdQuery from '../../queries/getDeceasedListByCryptIdQuery';
import DataTable from '@/components/DataTable';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import calculateAgeDied from '@/utils/calculateAgeDied';
import ActionMenu from '@/components/Burial/DeceasedActionMenu';
import { format } from 'date-fns';
import { CryptType } from '@/types/crypt-types';

export { default as loader } from '../../loaders/deceasedListLoader';

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

  usePrivateHeader({
    title: 'Annex Deceased List',
    showBack: true,
    extra: (
      <div className="flex justify-center">
        <Button size="sm" onClick={handleOpenAddSheet}>
          Add New Deceaseds
        </Button>
      </div>
    ),
  });

  return (
    <CardContainer>
      <AddNewDeceasedFormSheet
        cryptId={id ?? ''}
        cryptType={CryptType.ANNEX}
        open={openAddSheet}
        closeSheet={closeAddSheet}
      />
      <DataTable
        isLoading={isFetching}
        data={deceasedList?.data ?? []}
        columns={[
          {
            header: 'Created',
            accessorKey: 'created_at',
            cell: ({ cell }) => format(new Date(cell.getValue() as Date), 'PPpp'),
          },
          {
            header: 'Deceased',
            accessorKey: 'firstname',
            cell: ({ row }) => (
              <span>{`${row.original.firstname} ${row.original.middlename ?? ''} ${row.original.lastname}`}</span>
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
            header: 'Client Name',
            accessorKey: 'client-name',
            cell: ({ row }) => (
              <span>{`${row.original.client_list.firstname} ${row.original.client_list.middlename} ${row.original.client_list.lastname}`}</span>
            ),
          },
          {
            header: '',
            accessorKey: 'action',
            cell: ({ row }) => <ActionMenu data={row.original} />,
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
