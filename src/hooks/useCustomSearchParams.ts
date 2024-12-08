import parseSearchParams from '@/utils/parseSearchParams';
import removeUndefinedEmptyNull from '@/utils/removeUndefinedEmptyNull';
import { createSearchParams, useSearchParams } from 'react-router-dom';

const useCustomSearchParams = () => {
  const [params, setParams] = useSearchParams();

  const { q } = parseSearchParams(params.toString());
  const searchParams = JSON.parse(q || '{}');

  const setSearchParams = (params: Record<string, any>) =>
    setParams((prevParams) => {
      const parsedParams = Object.fromEntries(prevParams.entries());
      const newParams = removeUndefinedEmptyNull({
        ...JSON.parse(parsedParams.q || '{}'),
        ...params,
      });
      return createSearchParams(
        removeUndefinedEmptyNull({
          ...parsedParams,
          q: newParams && Object.keys(newParams).length > 0 ? JSON.stringify(newParams) : '',
        }),
      );
    });

  return [searchParams, setSearchParams];
};

export default useCustomSearchParams;
