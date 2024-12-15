import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useParams } from 'react-router-dom';
import NichesCard from '@/components/Burial/NichesCard';
import Legend from './components/Legend';
import { type CryptResponse, type CryptSlotResponse, CryptType, Face } from '@/types/crypt-types';
import getCryptQuery from '@/queries/getCryptQuery';
import getCryptSlotByCryptIdQuery from '@/queries/getCryptSlotByCryptIdQuery';
import usePrivateHeader from '@/hooks/usePrivateHeader';
import { CryptSlotsProvider } from '@/providers/CryptSlotsProvider';
import useCryptSlots from '@/hooks/useCryptSlots';

export { default as loader } from '@/loaders/slotsLoader';

export function Component() {
  const { id } = useParams();

  const { initialCrypt, initialCryptSlot } = useLoaderData() as {
    initialCrypt: CryptResponse;
    initialCryptSlot: Array<CryptSlotResponse>;
  };

  const { data: crypt } = useQuery({ ...getCryptQuery(id ?? ''), initialData: initialCrypt });

  const { data: cryptSlot } = useQuery({ ...getCryptSlotByCryptIdQuery(id ?? ''), initialData: initialCryptSlot });

  return (
    <CryptSlotsProvider cryptId={id ?? ''} cryptType={CryptType.COFFIN} crypt={crypt}>
      <List crypt={crypt} cryptSlot={cryptSlot} />
    </CryptSlotsProvider>
  );
}

function List(props: ListProps) {
  const { crypt, cryptSlot } = props;
  const { handleOpenAddSheet, handleOpenViewSheet } = useCryptSlots();

  const slots = (crypt?.rows ?? 0) * (crypt?.columns ?? 0) * 2;

  const front = Math.floor(slots / 2);
  const back = slots - front;

  const handleSelectSlot = (slot: number, face: Face) => {
    const findOwner = cryptSlot?.find((item) => item.slot === slot);
    if (findOwner) {
      handleOpenViewSheet(findOwner);
    } else handleOpenAddSheet({ slot, face });
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

type ListProps = {
  crypt: CryptResponse;
  cryptSlot: Array<CryptSlotResponse>;
};
