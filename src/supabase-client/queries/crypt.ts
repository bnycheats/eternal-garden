import supabase from '@/supabase-client';

import { CryptType, type CryptResponse } from '@/types/crypt-types';

export async function getCryptList(type: CryptType) {
  const { data, error } = await supabase.from('crypt_list').select('*').eq('crypt_type', type);

  if (error) {
    throw error;
  }

  return data as Array<CryptResponse>;
}

export async function getCrypt(id: string) {
  const { data, error } = await supabase.from('crypt_list').select('*').eq('id', id).single();

  if (error) {
    throw error;
  }

  return data as CryptResponse;
}
