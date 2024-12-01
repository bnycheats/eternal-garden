import { cn } from '@/lib/utils';
import { NavLink, useLocation } from 'react-router-dom';

import { activeClass } from './MenuItem';

function SubMenu(props: SubMenuProps) {
  const { pathname } = useLocation();
  return (
    <ul className="mt-1.5 flex flex-col gap-1.5 ltr:pl-7.5 rtl:pr-7.5">
      {props.items.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.to ?? '#'}
            className={() =>
              cn(
                'group relative flex items-center justify-between rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark hover:text-white dark:hover:bg-meta-4',
                {
                  [activeClass]: pathname === item.to,
                },
              )
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export type SubMenuType = {
  to?: string;
  label: React.ReactNode;
};

export type SubMenuProps = {
  items: SubMenuType[];
};

export default SubMenu;
