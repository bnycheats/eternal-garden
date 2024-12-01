import { Card } from '@/components/ui/card';
import { FaRegBuilding } from 'react-icons/fa';
import { AiFillEdit, AiFillEye, AiFillDelete } from 'react-icons/ai';
import InfoBox from './InfoBox';
import { ReactNode } from 'react';

function CryptCard(props: CryptCardProps) {
  const {
    icon = <FaRegBuilding className="text-8xl" />,
    bgColor,
    handleNavigate,
    handleRemove,
    handleEdit,
    title,
    desc,
  } = props;
  return (
    <Card className="relative rounded-none hover:shadow-lg">
      <div className="absolute right-2 top-2 flex gap-2">
        <button onClick={handleNavigate}>
          <AiFillEye />
        </button>
        <button onClick={handleEdit}>
          <AiFillEdit />
        </button>
        <button onClick={handleRemove}>
          <AiFillDelete />
        </button>
      </div>
      <div className={`h-30 p-4 ${bgColor}`}>
        <h1 className="text-xl text-white">{title}</h1>
        <p className="text-white">{desc}</p>
      </div>
      <div className="relative">
        <div className="absolute right-1/2 top-0 -translate-y-1/2 translate-x-1/2 py-2">{icon}</div>
        <div className="grid grid-cols-3 pt-10">
          <InfoBox count={200} title="SLOTS" />
          <InfoBox count={200} title="VACANT" />
          <InfoBox count={200} title="OCCUPIED" />
        </div>
      </div>
    </Card>
  );
}

type CryptCardProps = {
  icon?: ReactNode;
  bgColor: string;
  handleNavigate: () => void;
  handleRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  desc: string;
};

export default CryptCard;
