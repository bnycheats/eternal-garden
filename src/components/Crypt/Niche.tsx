import { cn } from '@/lib/utils';
import { CryptSlotStatus } from '@/types/crypt-types';

export const NICHE_WIDTH = 60;

function Niche(props: NicheProps) {
  const { slot, handleSelectSlot, status } = props;
  return (
    <div
      style={{ width: NICHE_WIDTH }}
      onClick={handleSelectSlot}
      className={cn('flex h-10 cursor-pointer items-center justify-center font-semibold text-white', {
        'bg-meta-5': status === CryptSlotStatus.VACANT,
        'bg-meta-1': status === CryptSlotStatus.OCCUPIED,
        'bg-meta-3': status === CryptSlotStatus.FULL,
      })}
    >
      {slot}
    </div>
  );
}

type NicheProps = {
  status: CryptSlotStatus;
  slot: number;
  handleSelectSlot: () => void;
};

export default Niche;
