import { Navigate, RouteObject } from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary';
import NotFound from '../components/NotFound';
import protectedLoader from '@/loaders/protectedLoader';

export const paths = {
  root: '/',
  authenticated: {
    DASHBOARD: '/dashboard',
    BURIAL_SPACE: '/burial-space',
    COFFIN_CRYPT: '/coffin-crypt',
    COFFIN_CRYPT_MAP: '/coffin-crypt/map',
    COFFIN_CRYPT_SLOTS: '/coffin-crypt/:id/slots',
    BONE_CRYPT: '/bone-crypt',
    BONE_CRYPT_MAP: '/bone-crypt/map',
    BONE_CRYPT_SLOTS: '/bone-crypt/:id/slots',
    LAWN: '/lawn',
    LAWN_SLOTS: '/lawn/:id/slots',
    CLIENTS: '/clients',
    CLIENTS_CREATE: '/clients/create',
    CLIENTS_EDIT: '/clients/edit/:clientId',
    CLIENTS_DETAILS: '/clients/details/:clientId',
    REPORTS: '/reports',
    SALES: '/sales',
    DECEASED: '/deceased',
    MAP_EDITOR: '/map-editor',
    ACTIVITY_LOGS: '/activity-logs',
    USER_LOGS: '/user-logs',
    PENDING_BURIAL: '/pending-burial',
    SCHEDULE: '/schedule',
    MAP: '/map',
  },
  public: {
    LOGIN: '/login',
  },
};

export const routes: Array<RouteObject> = [
  {
    id: 'root',
    path: paths.root,
    lazy: () => import('@/layouts/MainLayout'),
    children: [
      {
        index: true,
        element: <Navigate to={paths.public.LOGIN} />,
      },
      {
        id: 'not-found',
        path: '/*',
        element: <NotFound />,
      },
      {
        id: 'public',
        lazy: () => import('@/layouts/PublicLayout'),
        loader: protectedLoader,
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
        loader: protectedLoader,
        children: [
          {
            path: paths.authenticated.DASHBOARD,
            lazy: () => import('@/pages/dashboard/Page'),
            handle: {
              title: 'Dashboard',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.BURIAL_SPACE,
            lazy: () => import('@/pages/burial-space/Page'),
            handle: {
              title: 'Burial Space',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.COFFIN_CRYPT,
            lazy: () => import('@/pages/coffin-crypt/Page'),
            handle: {
              title: 'Coffin Crypt List',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.COFFIN_CRYPT_MAP,
            lazy: () => import('@/pages/coffin-crypt/Map'),
            handle: {
              title: 'Coffin Crypt Map',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.COFFIN_CRYPT_SLOTS,
            lazy: () => import('@/pages/coffin-crypt/Slots'),
            handle: {
              title: 'Coffin Crypt Slots',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.BONE_CRYPT,
            lazy: () => import('@/pages/bone-crypt/Page'),
            handle: {
              title: 'Bone Crypt List',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.BONE_CRYPT_MAP,
            lazy: () => import('@/pages/bone-crypt/Map'),
            handle: {
              title: 'Bone Crypt Map',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.BONE_CRYPT_SLOTS,
            lazy: () => import('@/pages/bone-crypt/Slots'),
            handle: {
              title: 'Bone Crypt Slots',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.LAWN,
            lazy: () => import('@/pages/lawn/Page'),
            handle: {
              title: 'Lawn lots',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.LAWN_SLOTS,
            lazy: () => import('@/pages/lawn/Slots'),
            handle: {
              title: 'Lawn Slots',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.CLIENTS,
            lazy: () => import('@/pages/clients/Page'),
            handle: {
              title: 'Clients',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.CLIENTS_CREATE,
            lazy: () => import('@/pages/clients/Create'),
            handle: {
              title: 'Create Client',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.MAP,
            lazy: () => import('@/pages/map/Page'),
            handle: {
              title: 'Map',
            },
            errorElement: <ErrorBoundary />,
          },
        ],
      },
    ],
  },
];

export default routes;
