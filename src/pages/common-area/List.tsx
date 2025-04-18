import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useNavigate } from 'react-router-dom';
import CryptCard from '@/components/Burial/CryptCard';
import { Button } from '@/components/ui/button';
import { CryptType, type CryptResponse } from '@/types/crypt-types';
import getCryptListByTypeQuery from '@/queries/getCryptListByTypeQuery';
import usePrivateHeader from '@/hooks/usePrivateHeader';
import { paths } from '@/navigation/Routes';
import { CryptListProvider } from '@/providers/CryptListProvider';
import useBurialActions from '@/hooks/useCryptList';

export { default as loader } from './loaders/listLoader';

export function Component() {
  return (
    <CryptListProvider cryptType={CryptType.COMMON}>
      <List />
    </CryptListProvider>
  );
}

function List() {
  const navigate = useNavigate();
  const initialData = useLoaderData() as Array<CryptResponse>;

  const { handleOpenUpdateSheet, handleOpenAddSheet, handleOpenDeleteModal } = useBurialActions();

  const { data } = useQuery({
    ...getCryptListByTypeQuery(CryptType.COMMON),
    initialData,
  });

  const handleNavigate = (path: string) => () => navigate(`${path}/list`);

  const handleRemove = (details: CryptResponse) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleOpenDeleteModal(details);
  };

  const handleEdit = (details: CryptResponse) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleOpenUpdateSheet(details);
  };

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

  if (!data || data.length === 0) return <div className="mt-20 text-center">No data found</div>;

  return (
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
  );
}
