import { Fragment, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCryptList } from '@/supabase-client/queries/crypt';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/navigation/Routes';
import CryptCard from '@/components/Crypt/CryptCard';
import CryptkeletonCard from '@/components/Crypt/CryptkeletonCard';
import { Button } from '@/components/ui/button';
import AddCryptFormDialog from '@/components/Crypt/AddCryptFormDialog';
import UpdateCryptFormDialog from '@/components/Crypt/UpdateCryptFormDialog';
import DeleteCryptAlert from '@/components/Crypt/DeleteCryptAlert';
import { CryptType, type CryptResponse } from '@/types/crypt-types';

export function Component() {
  const navigate = useNavigate();

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [updateDetails, setUpdateDetails] = useState<CryptResponse | null>(null);
  const [deleteDetails, setDeleteDetails] = useState<CryptResponse | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['getBoneCryptList'],
    queryFn: () => getCryptList(CryptType.BONE),
  });

  const handleNavigate = (path: string) => () => navigate(`${paths.authenticated.BONE_CRYPT}/${path}`);

  const handleRemove = (details: CryptResponse) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDeleteDialog(true);
    setDeleteDetails(details);
  };

  const handleEdit = (details: CryptResponse) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenUpdateDialog(true);
    setUpdateDetails(details);
  };

  const handleOpenAddDialog = () => setOpenAddDialog(true);

  const closeAddModal = () => setOpenAddDialog(false);
  const closeUpdateModal = () => {
    setOpenUpdateDialog(false);
    setUpdateDetails(null);
  };
  const closeDeleteModal = () => setOpenDeleteDialog(false);

  return (
    <Fragment>
      <AddCryptFormDialog
        queryKey="getBoneCryptList"
        crypt_type={CryptType.BONE}
        open={openAddDialog}
        closeModal={closeAddModal}
      />
      {updateDetails && (
        <UpdateCryptFormDialog
          queryKey="getBoneCryptList"
          details={updateDetails}
          open={openUpdateDialog}
          closeModal={closeUpdateModal}
        />
      )}
      <DeleteCryptAlert
        id={deleteDetails?.id ?? ''}
        queryKey="getBoneCryptList"
        title={deleteDetails?.name ?? ''}
        open={openDeleteDialog}
        closeModal={closeDeleteModal}
      />
      <Button onClick={handleOpenAddDialog}>Add Crypt Building</Button>
      {!data || data.length === 0 ? (
        <div className="mt-20 text-center">No data found</div>
      ) : (
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {isLoading ? (
            <CryptkeletonCard />
          ) : (
            data?.map((item, index) => (
              <CryptCard
                key={index}
                bgColor="bg-meta-1"
                title={item.name}
                desc="Bone Crypt Bulding"
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
