import { cn } from '@/lib/utils';

export const NICHE_WIDTH = 60;

function Niche(props: NicheProps) {
  const { slot, handleSelectSlot, isOccupied } = props;
  return (
    <div
      style={{ width: NICHE_WIDTH }}
      onClick={handleSelectSlot}
      className={cn('flex h-10 cursor-pointer items-center justify-center font-semibold text-white', {
        'bg-meta-5': !isOccupied,
        'bg-meta-1': isOccupied,
      })}
    >
      {slot}
    </div>
  );
}

type NicheProps = {
  isOccupied: boolean;
  slot: number;
  handleSelectSlot: () => void;
};

export default Niche;
