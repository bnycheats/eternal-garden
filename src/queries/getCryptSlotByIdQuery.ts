import { getCryptSlotById } from '@/supabase-client/queries/crypt';

function getCryptSlotByIdQuery(id: string) {
  return {
    queryKey: ['getCryptSlotById', id],
    queryFn: () => getCryptSlotById(id),
  };
}

export default getCryptSlotByIdQuery;
