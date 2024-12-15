import AddNewDeceasedFormSheet from '@/components/Burial/AddNewDeceasedFormSheet';
import ViewDetailsSheet from '@/components/Burial/ViewDetailsSheet';
import { CryptResponse, CryptSlotResponse, CryptType, Face } from '@/types/crypt-types';
import { useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, createContext, useMemo, useState } from 'react';

export const CryptSlotsProviderContext = createContext<CryptSlotsProviderContextValue>({
  handleOpenAddSheet: () => {},
  handleOpenViewSheet: () => {},
});

export function CryptSlotsProvider(props: CryptSlotsProviderProps) {
  const { cryptId, cryptType, crypt, children } = props;
  const queryClient = useQueryClient();

  const [openAddSheet, setOpenAddSheet] = useState<boolean>(false);
  const [openViewSheet, setOpenViewSheet] = useState<boolean>(false);

  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [viewSlot, setViewSlot] = useState<CryptSlotResponse | null>(null);

  const extraProps = useMemo(() => {
    if ([CryptType.COFFIN, CryptType.BONE].includes(cryptType) && crypt && !viewSlot) {
      return {
        description: `Slot ${selectedSlot?.slot} - ${selectedSlot?.face}`,
        slotPayload: {
          crypt_type: CryptType.COFFIN,
          row: Math.ceil((selectedSlot?.slot ?? 0) / (crypt?.columns ?? 0)),
          column: (selectedSlot?.slot ?? 0) % (crypt?.columns ?? 0),
          ...selectedSlot,
        },
        successCallBack: () => {
          queryClient.invalidateQueries({ queryKey: ['getCryptSlotByCryptId', cryptId] });
        },
      };
    }
    return {};
  }, [cryptType, crypt, selectedSlot, viewSlot]);

  const handleOpenAddSheet = (slot?: SelectedSlot) => {
    if (slot) setSelectedSlot(slot);
    setOpenAddSheet(true);
  };

  const handleCloseAddSheet = () => {
    setOpenAddSheet(false);
    setTimeout(() => setSelectedSlot(null), 300);
  };

  const handleOpenViewSheet = (cryptSlot: CryptSlotResponse) => {
    setOpenViewSheet(true);
    setViewSlot(cryptSlot);
  };

  const handleCloseViewSheet = () => {
    setOpenViewSheet(false);
    setTimeout(() => setViewSlot(null), 300);
  };

  return (
    <CryptSlotsProviderContext.Provider value={{ handleOpenAddSheet, handleOpenViewSheet }}>
      <ViewDetailsSheet info={viewSlot} open={openViewSheet} closeSheet={handleCloseViewSheet} />
      <AddNewDeceasedFormSheet
        clientId={viewSlot?.client_list?.id}
        slotId={viewSlot?.id}
        successCallBack={() => queryClient.invalidateQueries({ queryKey: ['getCryptSlotById', viewSlot?.id] })}
        cryptId={cryptId}
        cryptType={cryptType}
        open={openAddSheet}
        closeSheet={handleCloseAddSheet}
        {...extraProps}
      />
      {children}
    </CryptSlotsProviderContext.Provider>
  );
}

export type CryptSlotsProviderContextValue = {
  handleOpenAddSheet: (slot?: SelectedSlot, slotId?: string) => void;
  handleOpenViewSheet: (cryptSlot: CryptSlotResponse) => void;
};

type CryptSlotsProviderProps = PropsWithChildren & {
  cryptId: string;
  cryptType: CryptType;
  crypt?: CryptResponse;
};

export type SelectedSlot = {
  slot: number;
  face: Face;
};
