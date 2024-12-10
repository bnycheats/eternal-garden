import supabase from '@/supabase-client';
import { DeceasedResponse } from '@/types/deceased-types';

export async function getDeceasedListByCryptId(cryptId: string, page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const { data, count, error } = await supabase
    .from('deceased_list')
    .select('*, client_list (*)', { count: 'exact' })
    .range(start, end)
    .eq('crypt_id', cryptId).order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  return { data, count } as { data: Array<DeceasedResponse>; count: number | null };
}
