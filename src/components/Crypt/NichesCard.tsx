import CardContainer from '@/components/CardContainer';
import Niche, { NICHE_WIDTH } from './Niche';
import { Face } from '@/types/crypt-types';

const GAP = 12;

function NichesCard(props: NichesCardProps) {
  const { occupies, startAt, slots, title, columns, handleSelectSlot, face } = props;
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
                isOccupied={occupies?.includes(slot.toString())}
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
  occupies: Array<string>;
  columns: number;
  handleSelectSlot: (slot: number, face: Face) => void;
};

export default NichesCard;
