import CardContainer from '@/components/CardContainer';
import Niche, { NICHE_WIDTH } from './Niche';

const GAP = 12;

function NichesCard(props: NichesCardProps) {
  const { slots, title, column } = props;
  return (
    <CardContainer>
      <h1 className="text-lg">{title} - Front</h1>
      <div className="overflow-x-scroll">
        <div
          className="mt-4 flex flex-wrap gap-3"
          style={{
            width: (NICHE_WIDTH + GAP) * (column ?? 20) - GAP,
          }}
        >
          {Array.from({ length: slots }).map((_, index) => (
            <Niche key={index} number={index + 1} />
          ))}
        </div>
      </div>
    </CardContainer>
  );
}

type NichesCardProps = {
  title: string;
  slots: number;
  column: number;
};

export default NichesCard;
