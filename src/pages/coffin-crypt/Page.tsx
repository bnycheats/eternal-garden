import { Fragment, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useNavigate } from 'react-router-dom';
import CryptCard from '@/components/Crypt/CryptCard';
import CryptkeletonCard from '@/components/Crypt/CryptkeletonCard';
import { Button } from '@/components/ui/button';
import DeleteCryptAlert from '@/components/Crypt/DeleteCryptAlert';
import { CryptType, type CryptResponse } from '@/types/crypt-types';
import AddCryptFormSheet from '@/components/Crypt/AddCryptFormSheet';
import UpdateCryptFormSheet from '@/components/Crypt/UpdateCryptFormSheet';
import getCryptListQuery from '@/queries/getCryptListQuery';
import usePrivateHeader from '@/hooks/usePrivateHeader';

export { default as loader } from './loaders/pageLoader';

export function Component() {
  const navigate = useNavigate();
  const initialData = useLoaderData() as Array<CryptResponse>;

  const [openAddSheet, setOpenAddSheet] = useState(false);
  const [openUpdateSheet, setOpenUpdateSheet] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [updateDetails, setUpdateDetails] = useState<CryptResponse | null>(null);
  const [deleteDetails, setDeleteDetails] = useState<CryptResponse | null>(null);

  const { data, isLoading } = useQuery({
    ...getCryptListQuery(CryptType.COFFIN),
    placeholderData: initialData,
  });

  const handleNavigate = (path: string) => () => navigate(`${path}/slots`);

  const handleRemove = (details: CryptResponse) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDeleteModal(true);
    setDeleteDetails(details);
  };

  const handleEdit = (details: CryptResponse) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenUpdateSheet(true);
    setUpdateDetails(details);
  };

  const handleOpenAddSheet = () => setOpenAddSheet(true);

  const closeAddSheet = () => setOpenAddSheet(false);

  const closeUpdateSheet = () => {
    setOpenUpdateSheet(false);
    setUpdateDetails(null);
  };

  const closeDeleteModal = () => setOpenDeleteModal(false);

  usePrivateHeader({
    title: 'Coffin Crypt List',
    showBack: true,
    extra: (
      <div className="flex justify-center gap-2">
        <Button variant="outline">Open Map </Button>
        <Button onClick={handleOpenAddSheet}>Add Crypt Building</Button>
      </div>
    ),
  });

  return (
    <Fragment>
      <AddCryptFormSheet crypt_type={CryptType.COFFIN} open={openAddSheet} closeSheet={closeAddSheet} />
      {updateDetails && (
        <UpdateCryptFormSheet details={updateDetails} open={openUpdateSheet} closeSheet={closeUpdateSheet} />
      )}
      <DeleteCryptAlert
        id={deleteDetails?.id ?? ''}
        cryptType={deleteDetails?.crypt_type}
        title={deleteDetails?.name ?? ''}
        open={openDeleteModal}
        closeModal={closeDeleteModal}
      />
      {!isLoading && (!data || data.length === 0) ? (
        <div className="mt-20 text-center">No data found</div>
      ) : (
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {isLoading ? (
            <CryptkeletonCard />
          ) : (
            data?.map((item, index) => (
              <CryptCard
                key={index}
                bgColor="bg-meta-5"
                title={item.name}
                desc="Coffin Crypt Bulding"
                handleNavigate={handleNavigate(item.id)}
                handleRemove={handleRemove(item)}
                handleEdit={handleEdit(item)}
              />
            ))
          )}
        </div>
      )}
    </Fragment>
  );
}
