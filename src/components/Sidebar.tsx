import { useEffect, useRef } from "react";
// import Logo from "@/images/logo/logo.svg";
import { cn } from "@/lib/utils";
import { IconContext } from "react-icons";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

import Menu, { MenuModelType } from "./Menu";
import { paths } from "@/navigation/Routes";

function Sidebar({
  model,
  sidebarOpen,
  setSidebarOpen,
}: {
  model: MenuModelType[];
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}) {
  const location = useLocation();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  //close Sidebar menu if location change//
  useEffect(() => {
    if (sidebarOpen) setSidebarOpen(false);
  }, [location]);

  return (
    <aside
      ref={sidebar}
      className={cn(
        "absolute top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear ltr:left-0 rtl:right-0 dark:bg-boxdark lg:static",
        {
          "ltr:translate-x-0 rtl:-translate-x-0": sidebarOpen,
          "ltr:-translate-x-full rtl:translate-x-full ltr:lg:translate-x-0 rtl:lg:translate-x-0":
            !sidebarOpen,
        }
      )}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to={paths.root}>
          <h1 className="font-bold text-2xl text-white">CMTS</h1>
        </NavLink>
        <button
          ref={trigger}
          className="block lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
        >
          <svg
            className="fill-current rtl:rotate-180"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <IconContext.Provider value={{ className: "fill-white text-xl" }}>
          <Menu model={model} />
        </IconContext.Provider>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
}

export default Sidebar;
