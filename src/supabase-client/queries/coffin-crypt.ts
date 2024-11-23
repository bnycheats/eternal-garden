import supabase from '@/supabase-client';

import {  type CoffinCryptResponse } from '@/types/coffin-crypt-types';

export async function getCoffinCryptList() {
  const { data, error } = await supabase.from('coffin_crypt').select('*');

  if (error) {
    throw error;
  }

  return data as Array<CoffinCryptResponse>;
}

export async function getCoffinCrypt(id: string) {
  const { data, error } = await supabase.from('coffin_crypt').select('*').eq('id', id).single();

  if (error) {
    throw error;
  }

  return data as CoffinCryptResponse;
}
