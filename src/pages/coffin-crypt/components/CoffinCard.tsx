import { Card } from '@/components/ui/card';
import { FaRegBuilding } from 'react-icons/fa6';
import InfoBox from './InfoBox';

function CoffinCard(props: CoffinCardProps) {
  const { onClick, title } = props;
  return (
    <Card className="cursor-pointer rounded-none hover:shadow-lg" onClick={onClick}>
      <div className="h-30 bg-meta-5 p-4">
        <h1 className="text-xl text-white">{title}</h1>
        <p className="text-white">Coffin Crypt Bulding</p>
      </div>
      <div className="relative">
        <div className="absolute right-1/2 top-0 -translate-y-1/2 translate-x-1/2 bg-white py-2">
          <FaRegBuilding className="text-8xl" />
        </div>
        <div className="grid grid-cols-3 pt-10">
          <InfoBox count={200} title="SLOTS" />
          <InfoBox count={200} title="VACANT" />
          <InfoBox count={200} title="OCCUPIED" />
        </div>
      </div>
    </Card>
  );
}

type CoffinCardProps = {
  onClick: () => void;
  title: string;
};

export default CoffinCard;