import { Route } from "react-router-dom";

import NotFound from "../components/NotFound";

const Root = (
  <Route lazy={() => import("@/layouts/MainLayout")}>
    <Route path="/*" element={<NotFound />} />
    <Route lazy={() => import("@/layouts/PublicLayout")}>
      <Route
        path="login"
        lazy={() => import("@/pages/login/Login")}
        handle={{
          title: "Login",
        }}
      />
    </Route>
  </Route>
);

export default Root;
