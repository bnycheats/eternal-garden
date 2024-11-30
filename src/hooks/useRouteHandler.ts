import { useMatches } from "react-router-dom";


const useRouteHandler = () => {
  const matches = useMatches();
  const { handle } = matches[matches.length - 1] as { handle: Handle };
  return handle;
};

export type Handle = {
  title?: string;
}


export default useRouteHandler;
