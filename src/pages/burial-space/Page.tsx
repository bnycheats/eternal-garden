import { Card } from '@/components/ui/card';
import { IconContext } from 'react-icons';
import { FaBuilding, FaBone, FaHouse, FaCross } from 'react-icons/fa6';

const spaces = [
  {
    title: 'COFFIN CTYPT',
    icon: <FaBuilding />,
    color: 'bg-meta-5',
  },
  {
    title: 'BONE CTYPT',
    icon: <FaBone />,
    color: 'bg-meta-1',
  },
  {
    title: 'MAUSOLEUM',
    icon: <FaHouse />,
    color: 'bg-meta-3',
  },
  {
    title: 'LAWN',
    icon: <FaCross />,
    color: 'bg-meta-6',
  },
  {
    title: 'COMMON AREA',
    icon: <FaCross />,
    color: 'bg-meta-4',
  },
  {
    title: 'ANNEX',
    icon: <FaCross />,
    color: 'bg-meta-2',
  },
];

export function Component() {
  return (
    <IconContext.Provider value={{ className: 'text-white text-7xl' }}>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
        {spaces.map((item, index) => (
          <Card key={index} className="flex gap-2 rounded-none">
            <div className={`p-4 ${item.color}`}>{item.icon}</div>
            <div className="mt-2 font-medium">{item.title}</div>
          </Card>
        ))}
      </div>
    </IconContext.Provider>
  );
}
