import { Card } from '@/components/ui/card';
import usePrivateHeader from '@/hooks/usePrivateHeader';
import { IconContext } from 'react-icons';
import { FaBuilding, FaBone, FaHouse, FaCross } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const spaces = [
  {
    title: 'COFFIN CRYPT',
    icon: <FaBuilding />,
    color: 'bg-meta-5',
    path: '/coffin-crypt',
  },
  {
    title: 'BONE CRYPT',
    icon: <FaBone />,
    color: 'bg-meta-1',
    path: '/bone-crypt',
  },
  {
    title: 'MAUSOLEUM',
    icon: <FaHouse />,
    color: 'bg-meta-3',
    path: '/mausoleum',
  },
  {
    title: 'LAWN',
    icon: <FaCross />,
    color: 'bg-meta-6',
    path: '/lawn',
  },
  {
    title: 'COMMON AREA',
    icon: <FaCross />,
    color: 'bg-meta-4',
    path: '/common-area',
  },
  {
    title: 'ANNEX',
    icon: <FaCross />,
    color: 'bg-[blueviolet]',
    path: '/annex',
  },
];

export function Component() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => () => navigate(path);

  usePrivateHeader({
    title: 'Burial Space',
  });

  return (
    <IconContext.Provider value={{ className: 'text-white text-7xl' }}>
      <div className="bg-m grid grid-cols-1 gap-5 sm:grid-cols-2">
        {spaces.map((item, index) => (
          <Card
            key={index}
            onClick={handleNavigate(item.path)}
            className="flex cursor-pointer gap-2 rounded-none hover:shadow-lg"
          >
            <div className={`p-4 ${item.color}`}>{item.icon}</div>
            <div className="mt-2 font-medium">{item.title}</div>
          </Card>
        ))}
      </div>
    </IconContext.Provider>
  );
}
