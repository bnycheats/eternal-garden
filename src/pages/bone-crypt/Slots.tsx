import { useState, Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import NichesCard from '@/components/Crypt/NichesCard';
import Legend from '@/components/Crypt/Legend';
import SelectCryptSlotFormSheet from '@/components/Crypt/SelectCryptSlotFormSheet';
import { type CryptResponse, type CryptSlotResponse, CryptSlotStatus, CryptType, Face } from '@/types/crypt-types';
import getCryptQuery from '@/queries/getCryptQuery';
import getCryptSlotQuery from '@/queries/getCryptSlotQuery';

export { default as loader } from '@/loaders/slotsLoader';

export function Component() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { initialCrypt, initialCryptSlot } = useLoaderData() as {
    initialCrypt: CryptResponse;
    initialCryptSlot: Array<CryptSlotResponse>;
  };

  const [openAddSheet, setOpenAddSheet] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);

  const { data: crypt } = useQuery({ ...getCryptQuery(id ?? ''), initialData: initialCrypt });

  const { data: cryptSlot } = useQuery({ ...getCryptSlotQuery(id ?? ''), initialData: initialCryptSlot });

  const occupies = cryptSlot?.map((item) => item.slot?.toString() ?? '') ?? [];
  const slots = (crypt?.rows ?? 0) * (crypt?.columns ?? 0) * 2;

  const front = Math.floor(slots / 2);
  const back = slots - front;

  const handleSelectSlot = (slot: number, face: Face) => {
    const findOwner = cryptSlot?.find((item) => item.slot === slot);
    if (findOwner) {
      navigate(findOwner.id);
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

  return (
    <Fragment>
      {selectedSlot && (
        <SelectCryptSlotFormSheet
          slotDetails={{
            crypt_id: id ?? '',
            occupied_by: null,
            crypt_type: CryptType.BONE,
            slot: selectedSlot?.slot ?? null,
            face: selectedSlot?.face ?? null,
            row: Math.ceil((selectedSlot?.slot ?? 0) / (crypt?.columns ?? 0)),
            column: (selectedSlot?.slot ?? 0) % (crypt?.columns ?? 0),
            lon: null,
            lat: null,
            status: CryptSlotStatus.OCCUPIED,
          }}
          open={openAddSheet}
          closeSheet={closeAddSheet}
        />
      )}
      <Legend />
      {niches.map((item, index) => (
        <NichesCard
          key={index}
          face={item.face}
          occupies={occupies}
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
