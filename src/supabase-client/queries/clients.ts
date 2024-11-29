import supabase from '@/supabase-client';
import { type ClientResponse } from '@/types/clients-types';

export async function searchClient(searchText: string) {
  const { data, error } = await supabase.rpc('search_client', { keyword: searchText });

  if (error) {
    throw error;
  }

  return data as Array<ClientResponse>;
}
