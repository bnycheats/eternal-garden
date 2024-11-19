import Spinner from "@/components/Spinner";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Root from "./Root";

const router = createBrowserRouter(createRoutesFromElements(Root), {
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
