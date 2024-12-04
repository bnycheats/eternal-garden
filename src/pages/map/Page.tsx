import { Fragment, useMemo } from 'react';

import CardContainer from '@/components/CardContainer';
import Map from '@/components/Map';
import Legend from './components/Legend';
import usePrivateHeader from '@/hooks/usePrivateHeader';
import { useLoaderData } from 'react-router-dom';
import { CryptResponse, CryptSlotResponse, CryptType } from '@/types/crypt-types';
import getCryptListQuery from '@/queries/getCryptListQuery';
import { useQuery } from '@tanstack/react-query';
import { PathOptions } from 'leaflet';
import getCryptSlotByTypeQuery from '@/queries/getCryptSlotByTypeQuery';

export { default as loader } from './loaders/listLoader';

export function Component() {
  const { initialCryptList, initialLawnSlot } = useLoaderData() as {
    initialCryptList: Array<CryptResponse>;
    initialLawnSlot: Array<CryptSlotResponse>;
  };

  const { data: cryptList } = useQuery({
    ...getCryptListQuery(),
    initialData: initialCryptList,
  });

  const { data: lawnSlots } = useQuery({
    ...getCryptSlotByTypeQuery(CryptType.LAWN),
    initialData: initialLawnSlot,
  });

  const getOptions = (cryptType: CryptType): PathOptions => {
    switch (cryptType) {
      case CryptType.COFFIN:
        return {
          color: '#259ae6',
          fillColor: '#259ae6',
          fillOpacity: 1,
        };
      case CryptType.BONE:
        return {
          color: '#dc3545',
          fillColor: '#dc3545',
          fillOpacity: 1,
        };
      case CryptType.MAUSOLEUM:
        return {
          color: '#10b981',
          fillColor: '#10b981',
          fillOpacity: 1,
        };
      case CryptType.LAWN:
        return {
          color: '#ffba00',
          fillColor: '#ffba00',
          fillOpacity: 1,
        };
      default:
        return {
          color: '#313d4a',
          fillColor: '#313d4a',
          fillOpacity: 1,
        };
    }
  };

  const comibedPositions = useMemo(() => {
    const cryptListPositions =
      cryptList.map((item) => ({
        angle: item?.angle ?? 0,
        coordinates: item.coordinates,
        id: item.id,
        length: item?.length ?? 0,
        width: item?.width ?? 0,
        pathOptions: getOptions(item.crypt_type),
      })) ?? [];
    const lawnSlotsPositions =
      lawnSlots.map((item) => ({
        angle: item?.angle ?? 0,
        coordinates: item.coordinates,
        id: item.id,
        length: item?.length ?? 0,
        width: item?.width ?? 0,
        pathOptions: getOptions(item.crypt_type),
      })) ?? [];
    return [...cryptListPositions, ...lawnSlotsPositions];
  }, [cryptList, lawnSlots]);

  usePrivateHeader({
    title: 'Map',
  });

  return (
    <Fragment>
      <Legend />
      <CardContainer className="h-[calc(100vh-230px)] w-full p-0">
        <Map positions={comibedPositions} />
      </CardContainer>
    </Fragment>
  );
}
