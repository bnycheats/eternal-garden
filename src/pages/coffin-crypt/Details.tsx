import { useState, Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getCrypt } from '@/supabase-client/queries/crypt';
import NichesCard from '../../components/Crypt/NichesCard';
import NichesSkeletonCard from '../../components/Crypt/NichesSkeletonCard';
import Legend from '../../components/Crypt/Legend';
import RegisterClientFormDialog from '@/components/Forms/RegisterClientFormDialog';

export function Component() {
  const { id } = useParams();

  const [openRegisterClientDialog, setOpenRegisterClientDialog] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['getCrypt'],
    queryFn: () => getCrypt(id ?? ''),
  });

  const slots = (data?.rows ?? 0) * (data?.columns ?? 0);

  const front = Math.floor(slots / 2);
  const back = slots - front;

  const handleOpenRegisterClient = () => setOpenRegisterClientDialog(true);
  const closeRegisterClientModal = () => setOpenRegisterClientDialog(false);

  return (
    <Fragment>
      <RegisterClientFormDialog open={openRegisterClientDialog} closeModal={closeRegisterClientModal} />
      <Legend />
      {isLoading ? (
        <NichesSkeletonCard />
      ) : (
        <Fragment>
          <NichesCard
            handleSelectSlot={handleOpenRegisterClient}
            startAt={0}
            title={`${data?.name} - Front`}
            slots={front}
            columns={data?.columns ?? 0}
          />
          <NichesCard
            handleSelectSlot={handleOpenRegisterClient}
            startAt={front}
            title={`${data?.name} - Back`}
            slots={back}
            columns={data?.columns ?? 0}
          />
        </Fragment>
      )}
    </Fragment>
  );
}
