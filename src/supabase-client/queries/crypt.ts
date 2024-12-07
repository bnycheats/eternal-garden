import supabase from '@/supabase-client';

import { CryptSlotResponse, CryptType, type CryptResponse } from '@/types/crypt-types';

export async function getCryptList() {
  const { data, error } = await supabase.from('crypt_list').select('*');

  if (error) {
    throw error;
  }

  return data as Array<CryptResponse>;
}

export async function getCryptListByType(type: CryptType) {
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

export async function getCryptSlotByCryptId(crypt_id: string) {
  const { data, error } = await supabase.from('crypt_slot').select('*').eq('crypt_id', crypt_id);

  if (error) {
    throw error;
  }

  return data as Array<CryptSlotResponse>;
}


export async function getCryptSlotByType(type: CryptType) {
  const { data, error } = await supabase.from('crypt_slot').select('*').eq('crypt_type', type);

  if (error) {
    throw error;
  }

  return data as Array<CryptSlotResponse>;
}