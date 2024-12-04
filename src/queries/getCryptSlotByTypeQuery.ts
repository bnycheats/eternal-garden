import {  getCryptSlotByType } from '@/supabase-client/queries/crypt';
import { CryptType } from '@/types/crypt-types';

function getCryptSlotByTypeQuery(type: CryptType) {
  return {
    queryKey: ['getCryptSlotByType', type],
    queryFn: () => getCryptSlotByType(type),
  };
}

export default getCryptSlotByTypeQuery;
