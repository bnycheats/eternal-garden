import { Card } from '@/components/ui/card';
import { FaRegBuilding } from 'react-icons/fa6';
import { AiFillCloseCircle } from 'react-icons/ai';
import InfoBox from './InfoBox';

function CoffinCard(props: CoffinCardProps) {
  const { handleNavigate, handleRemove, title } = props;
  return (
    <Card className="relative cursor-pointer rounded-none hover:shadow-lg" onClick={handleNavigate}>
      <AiFillCloseCircle
        className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full bg-white text-3xl text-meta-1"
        onClick={handleRemove}
      />
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
  handleNavigate: () => void;
  handleRemove: (e: React.MouseEvent<SVGElement>) => void;
  title: string;
};

export default CoffinCard;
