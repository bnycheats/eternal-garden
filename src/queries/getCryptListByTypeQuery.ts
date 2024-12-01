import { getCryptListByType } from '@/supabase-client/queries/crypt';
import { CryptType } from '@/types/crypt-types';

function getCryptListByTypeQuery(cryptType: CryptType) {
  return {
    queryKey: ['getCryptListByType', cryptType],
    queryFn: () => getCryptListByType(cryptType),
  };
}

export default getCryptListByTypeQuery;
