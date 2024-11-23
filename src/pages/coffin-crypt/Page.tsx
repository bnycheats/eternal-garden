import { useQuery } from '@tanstack/react-query';
import { getCoffinCryptList } from '@/supabase-client/queries/coffin-crypt';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/navigation/Routes';
import CoffinCard from './components/CoffinCard';
import CoffinSkeletonCard from './components/CoffinSkeletonCard';
import { Fragment } from 'react/jsx-runtime';
import { Button } from '@/components/ui/button';
import AddBuildingFormDialog from './components/AddBuildingFormDialog';
import { useState } from 'react';
import DeleteBuildingAlert from './components/DeleteBuildingAlert';
import { type CoffinCryptResponse } from '@/types/coffin-crypt-types';

export function Component() {
  const navigate = useNavigate();

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [coffinDetails, setCoffinDetails] = useState<CoffinCryptResponse | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['getCoffinCryptList'],
    queryFn: () => getCoffinCryptList(),
  });

  const handleNavigate = (path: string) => () => navigate(`${paths.authenticated.COFFIN_CRYPT}/${path}`);

  const handleRemove = (details: CoffinCryptResponse) => (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDeleteDialog(true);
    setCoffinDetails(details);
  };

  const closeAddModal = () => setOpenAddDialog(false);

  const handleOpenAddDialog = () => setOpenAddDialog(true);

  const closeDeleteModal = () => setOpenDeleteDialog(false);

  return (
    <Fragment>
      <AddBuildingFormDialog open={openAddDialog} closeModal={closeAddModal} />
      <DeleteBuildingAlert
        id={coffinDetails?.id ?? ''}
        title={coffinDetails?.title ?? ''}
        open={openDeleteDialog}
        closeModal={closeDeleteModal}
      />
      <Button onClick={handleOpenAddDialog}>Add Crypt Building</Button>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {isLoading ? (
          <CoffinSkeletonCard />
        ) : (
          data?.map((item, index) => (
            <CoffinCard
              key={index}
              title={item.title}
              handleNavigate={handleNavigate(item.id)}
              handleRemove={handleRemove(item)}
            />
          ))
        )}
      </div>
    </Fragment>
  );
}
