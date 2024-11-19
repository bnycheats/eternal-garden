import { Navigate, RouteObject } from "react-router-dom";

import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "../components/NotFound";

export const paths = {
  root: "/",
  authenticated: {
    DASHBOARD: "/dashboard",
  },
  public: {
    LOGIN: "/login",
  },
};

export const routes: Array<RouteObject> = [
  {
    id: "root",
    path: paths.root,
    lazy: () => import("@/layouts/MainLayout"),
    children: [
      {
        id: "not-found",
        path: "/*",
        element: <NotFound />,
      },
      {
        id: "public",
        lazy: () => import("@/layouts/PublicLayout"),
        children: [
          {
            path: paths.public.LOGIN,
            lazy: () => import("@/pages/login/Login"),
            handle: {
              title: "Login",
            },
          },
        ],
      },
      {
        id: "authenticated",
        lazy: () => import("@/layouts/PrivateLayout"),
        children: [
          {
            index: true,
            element: <Navigate to={paths.authenticated.DASHBOARD} />,
          },
          {
            path: paths.authenticated.DASHBOARD,
            lazy: () => import("@/pages/dashboard/Dashboard"),
            handle: {
              title: "Dashboard",
            },
            errorElement: <ErrorBoundary />,
          },
        ],
      },
    ],
  },
];

export default routes;
