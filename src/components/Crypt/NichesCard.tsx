import CardContainer from '@/components/CardContainer';
import Niche, { NICHE_WIDTH } from './Niche';

const GAP = 12;

function NichesCard(props: NichesCardProps) {
  const { startAt, slots, title, columns } = props;
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
          {Array.from({ length: slots }).map((_, index) => (
            <Niche key={index} number={index + 1 + startAt} />
          ))}
        </div>
      </div>
    </CardContainer>
  );
}

type NichesCardProps = {
  startAt: number;
  title: string;
  slots: number;
  columns: number;
};

export default NichesCard;
