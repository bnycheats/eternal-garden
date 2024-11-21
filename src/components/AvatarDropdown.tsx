import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { AiOutlineLogout, AiOutlineSecurityScan } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { Transition } from 'react-transition-group';

import Avatar from './Avatar';
import useAuth from '@/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/supabase-client/mutations/auth';
import { paths } from '@/navigation/Routes';
import { useToast } from '@/hooks/use-toast';
import Spinner from './Spinner';

const transitionClasses = {
  entering: 'opacity-0',
  entered: 'opacity-100',
  exiting: 'opacity-0',
  exited: 'opacity-0',
  unmounted: '',
};

function AvatarDropdown() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const DROPDOWN_MENU = [
    {
      name: 'Security',
      href: '/settings/security',
      icon: <AiOutlineSecurityScan />,
    },
  ];

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => navigate(paths.public.LOGIN),
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: error.message,
      });
    },
  });

  const handleLogout = () => logoutMutation.mutate();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative">
      <button ref={trigger} onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-4">
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">{session?.user.email}</span>
        </span>

        <Avatar name={session?.user.email} />

        <svg
          className={`hidden fill-current transition-all duration-200 sm:block ${dropdownOpen ? 'rotate-180' : ''}`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </button>

      {/* <!-- Dropdown Start --> */}
      <Transition
        nodeRef={dropdown}
        in={dropdownOpen === true}
        timeout={{
          appear: 0,
          enter: 0,
          exit: 200,
        }}
        unmountOnExit
      >
        {(state) => (
          <div
            ref={dropdown}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
            className={cn(
              `absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default transition-all duration-200 dark:border-strokedark dark:bg-boxdark`,
              transitionClasses[state]
            )}
          >
            <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
              {DROPDOWN_MENU.map((item, index) => (
                <li key={index} onClick={() => setDropdownOpen(false)}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <AiOutlineLogout />
              Logout
              {logoutMutation.isPending && <Spinner className="h-5 w-5" />}
            </button>
          </div>
        )}
      </Transition>
      {/* <!-- Dropdown End --> */}
    </div>
  );
}

export default AvatarDropdown;
