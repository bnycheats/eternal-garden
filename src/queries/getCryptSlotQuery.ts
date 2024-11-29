import { getCryptSlotByCryptId } from '@/supabase-client/queries/crypt';

function getCryptSlotQuery(id: string) {
  return {
    queryKey: ['getCryptSlot', id],
    queryFn: () => getCryptSlotByCryptId(id),
  };
}

export default getCryptSlotQuery;
