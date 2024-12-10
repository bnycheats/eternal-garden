import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants';
import { getDeceasedListByCryptId } from '@/supabase-client/queries/deceased';

function getDeceasedListByCryptIdQuery(params: QueryParams) {
  const { cryptId, page, size } = params;
  return {
    queryKey: ['getDeceasedListByCryptId', cryptId, page, size],
    queryFn: () => getDeceasedListByCryptId(cryptId, page ?? DEFAULT_PAGE, size ?? DEFAULT_SIZE),
  };
}

type QueryParams = {
  cryptId: string;
  page?: number;
  size?: number;
};

export default getDeceasedListByCryptIdQuery;
