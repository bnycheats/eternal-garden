import { useMatches } from "react-router-dom";

interface Handle {
  title?: string;
  showPageTitle?: boolean;
  showBack?: boolean;
}

const useRouteHandler = () => {
  const matches = useMatches();
  const { handle } = matches[matches.length - 1] as { handle: Handle };
  return handle;
};

export default useRouteHandler;
