import { getCryptList } from '@/supabase-client/queries/crypt';

function getCryptListQuery() {
  return {
    queryKey: ['getCryptList'],
    queryFn: () => getCryptList(),
  };
}

export default getCryptListQuery;
