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
    LAWN_MAP: '/lawn/map',
    LAWN_SLOTS: '/lawn/:id/slots',
    MAUSOLEUM: '/mausoleum',
    MAUSOLEUM_MAP: '/mausoleum/map',
    MAUSOLEUM_DECEASED_LIST: '/mausoleum/:id/list',
    COMMON_AREA: '/common-area',
    COMMON_AREA_MAP: '/common-area/map',
    COMMON_AREA_DECEASED_LIST: '/common-area/:id/list',
    ANNEX: '/annex',
    ANNEX_MAP: '/annex/map',
    ANNEX_DECEASED_LIST: '/annex/:id/list',
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
            lazy: () => import('@/pages/dashboard/List'),
            handle: {
              title: 'Dashboard',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.BURIAL_SPACE,
            lazy: () => import('@/pages/burial-space/List'),
            handle: {
              title: 'Burial Space',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.COFFIN_CRYPT,
            lazy: () => import('@/pages/coffin-crypt/List'),
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
            lazy: () => import('@/pages/bone-crypt/List'),
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
            lazy: () => import('@/pages/lawn/List'),
            handle: {
              title: 'Lawn lots',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.LAWN_MAP,
            lazy: () => import('@/pages/lawn/Map'),
            handle: {
              title: 'Lawn Map',
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
            path: paths.authenticated.MAUSOLEUM,
            lazy: () => import('@/pages/mausoleum/List'),
            handle: {
              title: 'Mausoleum List',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.MAUSOLEUM_MAP,
            lazy: () => import('@/pages/mausoleum/Map'),
            handle: {
              title: 'Mausoleum Map',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.MAUSOLEUM_DECEASED_LIST,
            lazy: () => import('@/pages/mausoleum/DeceasedList'),
            handle: {
              title: 'Mausoleum Deceased List',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.COMMON_AREA,
            lazy: () => import('@/pages/common-area/List'),
            handle: {
              title: 'Common Area List',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.COMMON_AREA_MAP,
            lazy: () => import('@/pages/common-area/Map'),
            handle: {
              title: 'Common Area Map',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.COMMON_AREA_DECEASED_LIST,
            lazy: () => import('@/pages/common-area/DeceasedList'),
            handle: {
              title: 'Common Area Deceased List',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.ANNEX,
            lazy: () => import('@/pages/annex/List'),
            handle: {
              title: 'Annex List',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.ANNEX_MAP,
            lazy: () => import('@/pages/annex/Map'),
            handle: {
              title: 'Annex Map',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.ANNEX_DECEASED_LIST,
            lazy: () => import('@/pages/annex/DeceasedList'),
            handle: {
              title: 'Annex Deceased List',
            },
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.authenticated.CLIENTS,
            lazy: () => import('@/pages/clients/List'),
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
