import { useState, Fragment } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLoaderData, useParams } from 'react-router-dom';
import NichesCard from '@/components/Burial/NichesCard';
import Legend from './components/Legend';
import { type CryptResponse, type CryptSlotResponse, CryptType, Face } from '@/types/crypt-types';
import getCryptQuery from '@/queries/getCryptQuery';
import getCryptSlotQuery from '@/queries/getCryptSlotQuery';
import usePrivateHeader from '@/hooks/usePrivateHeader';
import AddNewDeceasedFormSheet from '@/components/Burial/AddNewDeceasedFormSheet';
import ViewDetailsSheet from '@/components/Burial/ViewDetailsSheet';

export { default as loader } from '@/loaders/slotsLoader';

export function Component() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { initialCrypt, initialCryptSlot } = useLoaderData() as {
    initialCrypt: CryptResponse;
    initialCryptSlot: Array<CryptSlotResponse>;
  };

  const [openAddSheet, setOpenAddSheet] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [viewSlot, setViewSlot] = useState<CryptSlotResponse | null>(null);

  const { data: crypt } = useQuery({ ...getCryptQuery(id ?? ''), initialData: initialCrypt });

  const { data: cryptSlot } = useQuery({ ...getCryptSlotQuery(id ?? ''), initialData: initialCryptSlot });

  const slots = (crypt?.rows ?? 0) * (crypt?.columns ?? 0) * 2;

  const front = Math.floor(slots / 2);
  const back = slots - front;

  const handleSelectSlot = (slot: number, face: Face) => {
    const findOwner = cryptSlot?.find((item) => item.slot === slot);
    if (findOwner) {
      setViewSlot(findOwner);
    } else {
      setOpenAddSheet(true);
      setSelectedSlot({ slot, face });
    }
  };

  const closeAddSheet = () => {
    setOpenAddSheet(false);
    setTimeout(() => setSelectedSlot(null), 300);
  };

  const niches = [
    {
      face: Face.FRONT,
      title: `${crypt?.name} - ${Face.FRONT}`,
      startAt: 0,
      slots: front,
    },
    {
      face: Face.BACK,
      title: `${crypt?.name} - ${Face.BACK}`,
      startAt: front,
      slots: back,
    },
  ];

  usePrivateHeader({
    title: 'Coffin Crypt Slots',
    showBack: true,
    extra: <Legend />,
  });

  return (
    <Fragment>
      <ViewDetailsSheet info={viewSlot} open={!!viewSlot} closeSheet={() => setViewSlot(null)} />
      <AddNewDeceasedFormSheet
        description={`Slot ${selectedSlot?.slot} - ${selectedSlot?.face}`}
        cryptId={id ?? ''}
        cryptType={CryptType.COMMON}
        slotPayload={{
          crypt_type: CryptType.COFFIN,
          row: Math.ceil((selectedSlot?.slot ?? 0) / (crypt?.columns ?? 0)),
          column: (selectedSlot?.slot ?? 0) % (crypt?.columns ?? 0),
          ...selectedSlot,
        }}
        open={openAddSheet}
        closeSheet={closeAddSheet}
        successCallBack={() => {
          queryClient.invalidateQueries({ queryKey: ['getCryptSlot', id] });
        }}
      />
      {niches.map((item, index) => (
        <NichesCard
          key={index}
          face={item.face}
          cryptSlot={cryptSlot}
          handleSelectSlot={handleSelectSlot}
          startAt={item.startAt}
          title={item.title}
          slots={item.slots}
          columns={crypt?.columns ?? 0}
        />
      ))}
    </Fragment>
  );
}

type SelectedSlot = {
  slot: number;
  face: Face;
};
