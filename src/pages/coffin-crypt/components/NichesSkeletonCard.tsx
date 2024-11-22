import CardContainer from '@/components/CardContainer';
import { NICHE_WIDTH } from './Niche';
import { Skeleton } from '@/components/ui/skeleton';

function NichesSkeletonCard() {
  return (
    <CardContainer>
      <Skeleton className="h-7 w-55" />
      <div className="overflow-x-scroll">
        <div className="mt-4 flex flex-wrap gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} style={{ width: NICHE_WIDTH }} className="h-10" />
          ))}
        </div>
      </div>
    </CardContainer>
  );
}

export default NichesSkeletonCard;
