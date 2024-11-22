import { useQuery } from '@tanstack/react-query';
import { getCoffinCryptList } from '@/supabase-client/queries/coffin-crypt';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/navigation/Routes';
import CoffinCard from './components/CoffinCard';
import CoffinSkeletonCard from './components/CoffinSkeletonCard';
import { Fragment } from 'react/jsx-runtime';
import { Button } from '@/components/ui/button';

export function Component() {
  const navigate = useNavigate();

  const { data, isFetching } = useQuery({
    queryKey: ['coffinCryptList'],
    queryFn: () => getCoffinCryptList(),
  });

  const handleNavigate = (path: string) => () => navigate(`${paths.authenticated.COFFIN_CRYPT}/${path}`);

  return (
    <Fragment>
      <Button>Add Crypt Building</Button>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {isFetching ? (
          <CoffinSkeletonCard />
        ) : (
          data?.map((item, index) => <CoffinCard key={index} onClick={handleNavigate(item.id)} title={item.title} />)
        )}
      </div>
    </Fragment>
  );
}
