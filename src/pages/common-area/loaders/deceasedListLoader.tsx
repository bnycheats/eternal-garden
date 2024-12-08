import { queryClientGetData } from '@/utils/query-client';
import { LoaderFunctionArgs } from 'react-router-dom';
import getDeceasedListByCryptIdQuery from '../queries/getDeceasedListByCryptIdQuery';
import parseSearchParams from '@/utils/parseSearchParams';
import { SearchParams } from '../DeceasedList';

const deceasedListLoader = async ({ params, request }: LoaderFunctionArgs) => {
  const { id: cryptId } = params as { id: string };
  const { searchParams } = new URL(request.url);
  const { q } = parseSearchParams(searchParams.toString());
  const { page, size } = JSON.parse(q || '{}') as SearchParams;

  return await queryClientGetData(
    getDeceasedListByCryptIdQuery({
      cryptId,
      page,
      size,
    }),
  );
};

export default deceasedListLoader;
