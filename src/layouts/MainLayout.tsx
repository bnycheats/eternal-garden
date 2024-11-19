import { Suspense, useEffect } from "react";
import useRouteHandler from "@/hooks/useRouteHandler";
import { Outlet } from "react-router-dom";

import Spinner from "@/components/Spinner";

export function Component() {
  const handle = useRouteHandler();

  const onInit = () => {
    if (handle?.title) {
      document.title = `Fyorin Admin | ${handle.title}`;
    } else document.title = "Fyorin Admin";
  };

  useEffect(onInit, [handle]);

  return (
    <Suspense fallback={<Spinner centered fullScreen />}>
      <Outlet />
    </Suspense>
  );
}
