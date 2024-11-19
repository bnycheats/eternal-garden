import { Link, useRouteError } from "react-router-dom";

import { Button } from "./ui/button";

interface RouteError {
  statusText?: string;
  message?: string;
}

function ErrorBoundary() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-10 shadow-default dark:border-strokedark dark:bg-boxdark sm:py-20">
      <div className="mx-auto max-w-[410px]">
        <div className="mt-7.5 text-center">
          <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">
            Sorry, an unexpected error has occurred.
          </h2>
          <p className="font-medium">{error.statusText || error.message}</p>
          <Link className="mt-5 block" to="/">
            <Button
              type="button"
              className="h-auto w-auto p-0 text-lg"
              variant="link"
            >
              Back to dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
