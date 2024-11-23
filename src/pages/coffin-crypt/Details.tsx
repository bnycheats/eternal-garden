import { getCoffinCrypt } from '@/supabase-client/queries/coffin-crypt';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import NichesCard from './components/NichesCard';
import NichesSkeletonCard from './components/NichesSkeletonCard';
import Legend from './components/Legend';

export function Component() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['coffinCrypt'],
    queryFn: () => getCoffinCrypt(id ?? ''),
  });

  const slots = data?.slots ?? 0;

  const front = Math.floor(slots / 2);
  const back = slots - front;

  return (
    <Fragment>
      <Legend />
      {isLoading ? (
        <NichesSkeletonCard />
      ) : (
        <Fragment>
          <NichesCard title={`${data?.title} - Front`} slots={front} column={data?.column ?? 0} />
          <NichesCard title={`${data?.title} - Back`} slots={back} column={data?.column ?? 0} />
        </Fragment>
      )}
    </Fragment>
  );
}
