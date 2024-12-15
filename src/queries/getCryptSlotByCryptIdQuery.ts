import { getCryptSlotByCryptId } from '@/supabase-client/queries/crypt';

function getCryptSlotByCryptIdQuery(id: string) {
  return {
    queryKey: ['getCryptSlotByCryptId', id],
    queryFn: () => getCryptSlotByCryptId(id),
  };
}

export default getCryptSlotByCryptIdQuery;
