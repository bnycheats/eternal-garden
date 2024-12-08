import { Fragment, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useNavigate } from 'react-router-dom';
import CryptCard from '@/components/Burial/CryptCard';
import { Button } from '@/components/ui/button';
import DeleteCryptAlert from '@/components/Burial/DeleteCryptAlert';
import { CryptType, type CryptResponse } from '@/types/crypt-types';
import AddCryptFormSheet from '@/components/Burial/AddCryptFormSheet';
import UpdateCryptFormSheet from '@/components/Burial/UpdateCryptFormSheet';
import getCryptListByTypeQuery from '@/queries/getCryptListByTypeQuery';
import usePrivateHeader from '@/hooks/usePrivateHeader';
import { paths } from '@/navigation/Routes';

export { default as loader } from './loaders/listLoader';

export function Component() {
  const navigate = useNavigate();
  const initialData = useLoaderData() as Array<CryptResponse>;

  const [openAddSheet, setOpenAddSheet] = useState(false);
  const [openUpdateSheet, setOpenUpdateSheet] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [updateDetails, setUpdateDetails] = useState<CryptResponse | null>(null);
  const [deleteDetails, setDeleteDetails] = useState<CryptResponse | null>(null);

  const { data } = useQuery({
    ...getCryptListByTypeQuery(CryptType.COMMON),
    initialData,
  });

  const handleNavigate = (path: string) => () => navigate(`${path}/list`);

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
    title: 'Common Area List',
    showBack: true,
    extra: (
      <div className="bg-m flex justify-center gap-2">
        <Button size="sm" variant="outline" onClick={() => navigate(paths.authenticated.COMMON_AREA_MAP)}>
          Open Map
        </Button>
        <Button size="sm" onClick={handleOpenAddSheet}>
          Add Common Area
        </Button>
      </div>
    ),
  });

  return (
    <Fragment>
      <AddCryptFormSheet crypt_type={CryptType.COMMON} open={openAddSheet} closeSheet={closeAddSheet} />
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
      {!data || data.length === 0 ? (
        <div className="mt-20 text-center">No data found</div>
      ) : (
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {data?.map((item, index) => (
            <CryptCard
              key={index}
              bgColor="bg-meta-4"
              title={item.name}
              desc="Common Area"
              handleNavigate={handleNavigate(item.id)}
              handleRemove={handleRemove(item)}
              handleEdit={handleEdit(item)}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
}
