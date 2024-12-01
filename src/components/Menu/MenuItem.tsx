import { Fragment, useRef } from 'react';
import { cn } from '@/lib/utils';
import { NavLink, useLocation } from 'react-router-dom';
import { Transition } from 'react-transition-group';

import MenuItemGroup from './MenuItemGroup';
import SubMenu, { type SubMenuType } from './SubMenu';

const transitionClasses = {
  entering: 'max-h-0 opacity-0',
  entered: 'max-h-230 opacity-100',
  exiting: 'max-h-0 opacity-0',
  exited: 'max-h-0 opacity-0',
  unmounted: '',
};

export const activeClass = 'bg-graydark text-white dark:bg-meta-4';

function MenuItem(props: MenuItemProps) {
  const { hidden, to, label, icon, children } = props;

  const { pathname } = useLocation();
  const nodeRef = useRef<HTMLDivElement>(null);

  if (hidden) return null;

  if ('children' in props) {
    return (
      <MenuItemGroup
        active={
          pathname === to || pathname.startsWith(to ?? '') || !!children?.map((item) => item.to).includes(pathname)
        }
      >
        {(toggle, open) => {
          return (
            <Fragment>
              <NavLink
                to={to ?? '#'}
                className={cn(
                  'group relative flex items-center justify-between rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4',
                  {
                    [activeClass]: pathname === to,
                  },
                )}
                onClick={() => {
                  if (!open) toggle();
                }}
              >
                <div className="flex items-center gap-2.5">
                  {icon && icon}
                  {label}
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    toggle();
                  }}
                  className="absolute flex h-full w-9 items-center justify-center hover:bg-form-strokedark ltr:right-0 rtl:left-0"
                >
                  <svg
                    className={cn('fill-current transition-all duration-200', {
                      'rotate-180': open,
                    })}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                      fill=""
                    />
                  </svg>
                </div>
              </NavLink>
              {children && (
                <Transition
                  nodeRef={nodeRef}
                  in={open}
                  timeout={{
                    appear: 0,
                    enter: 0,
                    exit: 200,
                  }}
                  unmountOnExit
                >
                  {(state) => (
                    <div
                      ref={nodeRef}
                      className={cn(
                        'translate transform overflow-hidden transition-all duration-200',
                        transitionClasses[state],
                      )}
                    >
                      <SubMenu items={children} />
                    </div>
                  )}
                </Transition>
              )}
            </Fragment>
          );
        }}
      </MenuItemGroup>
    );
  }

  return (
    <NavLink
      to={to ?? '#'}
      className={cn(
        'group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4',
        {
          [activeClass]: pathname.startsWith(to ?? ''),
        },
      )}
      onClick={(e) => {
        if (to === pathname) e.preventDefault();
      }}
    >
      {icon && icon}
      {label}
    </NavLink>
  );
}

export type MenuItemProps = {
  hidden?: boolean;
  itemKey: string;
  to?: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: SubMenuType[];
};

export default MenuItem;
