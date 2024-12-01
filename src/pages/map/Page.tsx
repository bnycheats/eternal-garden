import { Fragment } from 'react';

import CardContainer from '@/components/CardContainer';
import Map from '@/components/Map';
import Legend from './components/Legend';
import usePrivateHeader from '@/hooks/usePrivateHeader';
import { useLoaderData } from 'react-router-dom';
import { CryptResponse } from '@/types/crypt-types';
import getCryptListQuery from '@/queries/getCryptListQuery';
import { useQuery } from '@tanstack/react-query';

export { default as loader } from './loaders/pageLoader';

export function Component() {
  const initialData = useLoaderData() as Array<CryptResponse>;

  const { data } = useQuery({
    ...getCryptListQuery(),
    initialData,
  });

  usePrivateHeader({
    title: 'Map',
  });

  return (
    <Fragment>
      <Legend />
      <CardContainer className="h-[calc(100vh-230px)] w-full p-0">
        <Map
          center={[7.31805, 125.662755]}
          positions={data.map((item) => ({
            angle: item.angle,
            coordinates: item.coordinates,
            crypt_type: item.crypt_type,
            id: item.id,
            length: item.length,
            width: item.width,
          }))}
        />
      </CardContainer>
    </Fragment>
  );
}
