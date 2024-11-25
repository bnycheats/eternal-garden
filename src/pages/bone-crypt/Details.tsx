import { getCrypt } from '@/supabase-client/queries/crypt';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import NichesCard from '../../components/Crypt/NichesCard';
import NichesSkeletonCard from '../../components/Crypt/NichesSkeletonCard';
import Legend from '../../components/Crypt/Legend';

export function Component() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['getCoffinCrypt'],
    queryFn: () => getCrypt(id ?? ''),
  });

  const slots = (data?.rows ?? 0) * (data?.columns ?? 0);

  const front = Math.floor(slots / 2);
  const back = slots - front;

  return (
    <Fragment>
      <Legend />
      {isLoading ? (
        <NichesSkeletonCard />
      ) : (
        <Fragment>
          <NichesCard startAt={0} title={`${data?.name} - Front`} slots={front} columns={data?.columns ?? 0} />
          <NichesCard startAt={front} title={`${data?.name} - Back`} slots={back} columns={data?.columns ?? 0} />
        </Fragment>
      )}
    </Fragment>
  );
}
