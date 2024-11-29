import { getCrypt } from '@/supabase-client/queries/crypt';

function getCryptQuery(id: string) {
  return {
    queryKey: ['getCrypt', id],
    queryFn: () => getCrypt(id),
  };
}

export default getCryptQuery;
