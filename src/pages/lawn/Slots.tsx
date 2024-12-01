import CardContainer from '@/components/CardContainer';
import { Fragment, useState } from 'react';
import Map from '@/components/Map';
import usePrivateHeader from '@/hooks/usePrivateHeader';
import { useLoaderData, useParams } from 'react-router-dom';
import { CryptResponse, CryptSlotResponse, CryptSlotStatus } from '@/types/crypt-types';
import { useQuery } from '@tanstack/react-query';
import getCryptQuery from '@/queries/getCryptQuery';
import getCryptSlotQuery from '@/queries/getCryptSlotQuery';
import Legend from './components/Legends';
import { Button } from '@/components/ui/button';
import AddLawnFormSheet from './components/AddLawnFormSheet';
import { PathOptions } from 'leaflet';

export { default as loader } from '@/loaders/slotsLoader';

export function Component() {
  const { id } = useParams();

  const { initialCrypt, initialCryptSlot } = useLoaderData() as {
    initialCrypt: CryptResponse;
    initialCryptSlot: Array<CryptSlotResponse>;
  };

  const [openAddSheet, setOpenAddSheet] = useState(false);

  const { data: crypt } = useQuery({ ...getCryptQuery(id ?? ''), initialData: initialCrypt });

  const { data: cryptSlot } = useQuery({ ...getCryptSlotQuery(id ?? ''), initialData: initialCryptSlot });

  const handleOpenAddSheet = () => setOpenAddSheet(true);

  const closeAddSheet = () => setOpenAddSheet(false);

  const getOptions = (status: CryptSlotStatus): PathOptions => {
    switch (status) {
      case CryptSlotStatus.OCCUPIED:
        return {
          color: '#dc3545',
          fillColor: '#dc3545',
          fillOpacity: 1,
        };
      case CryptSlotStatus.VACANT:
        return {
          color: '#10b981',
          fillColor: '#10b981',
          fillOpacity: 1,
        };
      default:
        return {
          color: '#f0950c',
          fillColor: '#f0950c',
          fillOpacity: 1,
        };
    }
  };

  usePrivateHeader({
    title: crypt?.name ?? '',
    showBack: true,
    extra: (
      <div className="flex justify-center gap-2">
        <Button size="sm" onClick={handleOpenAddSheet}>
          Add Lawn
        </Button>
      </div>
    ),
  });

  return (
    <Fragment>
      <Legend />
      <AddLawnFormSheet cryptId={id ?? ''} open={openAddSheet} closeSheet={closeAddSheet} />
      <CardContainer className="h-[calc(100vh-230px)] w-full p-0">
        <Map
          center={[7.319603, 125.66301]}
          positions={cryptSlot.map((item) => ({
            angle: item?.angle ?? 0,
            coordinates: item.coordinates,
            crypt_type: item.crypt_type,
            id: item.id,
            length: item?.length ?? 0,
            width: item?.width ?? 0,
            pathOptions: getOptions(item.status),
          }))}
        />
      </CardContainer>
    </Fragment>
  );
}
