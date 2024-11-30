import { Suspense, useEffect } from 'react';
import useRouteHandler, { type Handle } from '@/hooks/useRouteHandler';
import { Outlet } from 'react-router-dom';

import Spinner from '@/components/Spinner';

export function Component() {
  const handle = useRouteHandler() as Handle;

  const onInit = () => {
    if (handle?.title) {
      document.title = `Eternal Garden | ${handle.title}`;
    } else document.title = 'Eternal Garden';
  };

  useEffect(onInit, [handle]);

  return (
    <Suspense fallback={<Spinner centered fullScreen />}>
      <Outlet />
    </Suspense>
  );
}
