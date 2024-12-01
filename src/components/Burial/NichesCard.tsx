import CardContainer from '@/components/CardContainer';
import Niche, { NICHE_WIDTH } from './Niche';
import { CryptSlotResponse, CryptSlotStatus, Face } from '@/types/crypt-types';

const GAP = 12;

function NichesCard(props: NichesCardProps) {
  const { cryptSlot, startAt, slots, title, columns, handleSelectSlot, face } = props;
  return (
    <CardContainer>
      <h1 className="text-lg">{title}</h1>
      <div className="overflow-x-auto">
        <div
          className="mt-4 flex flex-wrap gap-3"
          style={{
            width: (NICHE_WIDTH + GAP) * (columns ?? 20) - GAP,
          }}
        >
          {Array.from({ length: slots }).map((_, index) => {
            const slot = index + 1 + startAt;
            return (
              <Niche
                key={index}
                status={cryptSlot?.find((item) => item.slot === slot)?.status ?? CryptSlotStatus.VACANT}
                handleSelectSlot={() => handleSelectSlot(slot, face)}
                slot={slot}
              />
            );
          })}
        </div>
      </div>
    </CardContainer>
  );
}

type NichesCardProps = {
  face: Face;
  startAt: number;
  title: string;
  slots: number;
  cryptSlot: Array<CryptSlotResponse>;
  columns: number;
  handleSelectSlot: (slot: number, face: Face) => void;
};

export default NichesCard;
