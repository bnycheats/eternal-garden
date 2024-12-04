import CardContainer from '@/components/CardContainer';
import { Fragment } from 'react';
import Map from '@/components/Map';
import usePrivateHeader from '@/hooks/usePrivateHeader';
import { useLoaderData } from 'react-router-dom';
import { CryptResponse, CryptType } from '@/types/crypt-types';
import getCryptListByTypeQuery from '@/queries/getCryptListByTypeQuery';
import { useQuery } from '@tanstack/react-query';

export { default as loader } from './loaders/pageLoader';

export function Component() {
  const initialData = useLoaderData() as Array<CryptResponse>;

  const { data } = useQuery({
    ...getCryptListByTypeQuery(CryptType.LAWN),
    initialData,
  });

  usePrivateHeader({
    title: 'Lawn Map',
    showBack: true,
  });

  return (
    <Fragment>
      <div className="flex items-center gap-1 pb-4">
        <div className="h-3 w-3 bg-meta-8" />
        <span className="text-xs">Lawn</span>
      </div>
      <CardContainer className="mb-0 h-[calc(100vh-230px)] w-full p-0">
        <Map
          positions={data.map((item) => ({
            angle: item?.angle ?? 0,
            coordinates: item.coordinates,
            id: item.id,
            length: item?.length ?? 0,
            width: item?.width ?? 0,
            pathOptions: {
              color: '#ffba00',
              fillColor: '#ffba00',
              fillOpacity: 1,
            },
          }))}
        />
      </CardContainer>
    </Fragment>
  );
}
