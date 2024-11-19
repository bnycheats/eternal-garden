import { useMatches } from "react-router-dom";

interface Handle {
  title?: {
    id: string;
    hint?: string;
    template: string;
    [key: string]: any;
  };
  showPageTitle?: boolean;
}

const useRouteHandler = () => {
  const matches = useMatches();
  const { handle } = matches[matches.length - 1] as { handle: Handle };
  return handle;
};

export default useRouteHandler;
