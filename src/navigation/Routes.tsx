import { RouteObject } from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary';
import NotFound from '../components/NotFound';
import authGuard from '@/loaders/authGuard';

export const paths = {
  root: '/',
  authenticated: {
    DASHBOARD: '/dashboard',
    BURIAL_SPACE: '/burial-space',
    COFFIN_CRYPT: '/coffin-crypt',
    COFFIN_CRYPT_DETAILS: '/coffin-crypt/:id',
    REPORTS: '/reports',
    SALES: '/sales',
    CLIENTS: '/clients',
    DECEASED: '/deceased',
    MAP_EDITOR: '/map-editor',
    ACTIVITY_LOGS: '/activity-logs',
    USER_LOGS: '/user-logs',
    PENDING_BURIAL: '/pending-burial',
    SCHEDULE: '/schedule',
  },
  public: {
    LOGIN: '/login',
  },
};

export const routes: Array<RouteObject> = [
  {
    id: 'root',
    path: paths.root,
    loader: authGuard,
    lazy: () => import('@/layouts/MainLayout'),
  },
  {
    id: 'not-found',
    path: '/*',
    element: <NotFound />,
  },
  {
    id: 'public',
    lazy: () => import('@/layouts/PublicLayout'),
    loader: authGuard,
    children: [
      {
        path: paths.public.LOGIN,
        lazy: () => import('@/pages/login/Page'),
        handle: {
          title: 'Login',
        },
      },
    ],
  },
  {
    id: 'authenticated',
    lazy: () => import('@/layouts/PrivateLayout'),
    loader: authGuard,
    children: [
      {
        path: paths.authenticated.DASHBOARD,
        lazy: () => import('@/pages/dashboard/Page'),
        handle: {
          title: 'Dashboard',
          showPageTitle: true,
        },
        errorElement: <ErrorBoundary />,
      },
      {
        path: paths.authenticated.BURIAL_SPACE,
        lazy: () => import('@/pages/burial-space/Page'),
        handle: {
          title: 'Burial Space',
          showPageTitle: true,
        },
        errorElement: <ErrorBoundary />,
      },
      {
        path: paths.authenticated.COFFIN_CRYPT,
        lazy: () => import('@/pages/coffin-crypt/Page'),
        handle: {
          title: 'Coffin Crypt List',
          showPageTitle: true,
          showBack: true,
        },
        errorElement: <ErrorBoundary />,
      },
      {
        path: paths.authenticated.COFFIN_CRYPT_DETAILS,
        lazy: () => import('@/pages/coffin-crypt/Details'),
        handle: {
          title: 'Coffin Crypt Details',
          showPageTitle: true,
          showBack: true,
        },
        errorElement: <ErrorBoundary />,
      },
    ],
  },
];

export default routes;
