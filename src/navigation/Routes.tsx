import { RouteObject } from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary';
import NotFound from '../components/NotFound';
import protectedLoader from '@/loaders/protectedLoader';

export const paths = {
  root: '/',
  authenticated: {
    DASHBOARD: '/dashboard',
    BURIAL_SPACE: '/burial-space',
    COFFIN_CRYPT: '/coffin-crypt',
    COFFIN_CRYPT_SLOTS: '/coffin-crypt/:id/slots',
    COFFIN_CRYPT_SLOT_DETAILS: '/coffin-crypt/:id/slots/:slotId',
    BONE_CRYPT: '/bone-crypt',
    BONE_CRYPT_SLOTS: '/bone-crypt/:id/slots',
    BONE_CRYPT_SLOT_DETAILS: '/bone-crypt/:id/slots/:slotId',
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
  },
  public: {
    LOGIN: '/login',
  },
};

export const routes: Array<RouteObject> = [
  {
    id: 'root',
    path: paths.root,
    loader: protectedLoader,
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
        path: paths.authenticated.COFFIN_CRYPT_SLOTS,
        lazy: () => import('@/pages/coffin-crypt/Slots'),
        handle: {
          title: 'Coffin Crypt Details',
          showPageTitle: true,
          showBack: true,
        },
        errorElement: <ErrorBoundary />,
      },
      {
        path: paths.authenticated.COFFIN_CRYPT_SLOT_DETAILS,
        lazy: () => import('@/pages/coffin-crypt/SlotDetails'),
        handle: {
          title: 'Coffin Crypt Slot Details',
          showPageTitle: true,
          showBack: true,
        },
        errorElement: <ErrorBoundary />,
      },
      {
        path: paths.authenticated.BONE_CRYPT,
        lazy: () => import('@/pages/bone-crypt/Page'),
        handle: {
          title: 'Bone Crypt List',
          showPageTitle: true,
          showBack: true,
        },
        errorElement: <ErrorBoundary />,
      },
      {
        path: paths.authenticated.BONE_CRYPT_SLOTS,
        lazy: () => import('@/pages/bone-crypt/Slots'),
        handle: {
          title: 'Bone Crypt Details',
          showPageTitle: true,
          showBack: true,
        },
        errorElement: <ErrorBoundary />,
      },
      {
        path: paths.authenticated.BONE_CRYPT_SLOT_DETAILS,
        lazy: () => import('@/pages/bone-crypt/SlotDetails'),
        handle: {
          title: 'Bone Crypt Slot Details',
          showPageTitle: true,
          showBack: true,
        },
        errorElement: <ErrorBoundary />,
      },
      {
        path: paths.authenticated.CLIENTS,
        lazy: () => import('@/pages/clients/Page'),
        handle: {
          title: 'Clients',
          showPageTitle: true,
        },
        errorElement: <ErrorBoundary />,
      },
      {
        path: paths.authenticated.CLIENTS_CREATE,
        lazy: () => import('@/pages/clients/Create'),
        handle: {
          title: 'Create Client',
          showPageTitle: true,
          showBack: true,
        },
        errorElement: <ErrorBoundary />,
      },
    ],
  },
];

export default routes;
