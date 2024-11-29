import { getCryptList } from '@/supabase-client/queries/crypt';
import { CryptType } from '@/types/crypt-types';

function getCryptListQuery(cryptType: CryptType) {
  return {
    queryKey: ['getCryptList', cryptType],
    queryFn: () => getCryptList(cryptType),
  };
}

export default getCryptListQuery;
