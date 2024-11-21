import { Suspense, useState } from 'react';
import useRouteHandler from '@/hooks/useRouteHandler';
import { AiOutlineLeft } from 'react-icons/ai';
import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';
import { MenuModelType } from '@/components/Menu';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { getMenus } from '../helpers/getMenus';

export function Component() {
  const handle = useRouteHandler();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems: MenuModelType[] = getMenus();

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Suspense>
          <Sidebar model={menuItems} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </Suspense>

        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {(handle?.showBack || (handle?.showPageTitle && handle?.title)) && (
                <div className="mb-6 flex justify-between gap-3">
                  {handle?.showPageTitle && handle?.title && (
                    <h2 className="text-title-md2 font-semibold text-black dark:text-white">{handle.title}</h2>
                  )}
                  {handle?.showBack && (
                    <Button
                      className="flex h-auto text-lg font-bold lg:hidden"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        history.back();
                      }}
                    >
                      <AiOutlineLeft />
                      Back
                    </Button>
                  )}
                </div>
              )}
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
}
