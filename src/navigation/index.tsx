import Spinner from "@/components/Spinner";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "./Routes";

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

function Navigation() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<Spinner centered fullScreen />}
    />
  );
}

export default Navigation;
