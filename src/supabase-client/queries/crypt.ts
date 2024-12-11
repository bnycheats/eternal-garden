import supabase from '@/supabase-client';

import { CryptSlotResponse, CryptType, type CryptResponse } from '@/types/crypt-types';

export async function getCryptList() {
  const { data, error } = await supabase.from('crypt_list').select('*').order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  return data as Array<CryptResponse>;
}

export async function getCryptListByType(type: CryptType) {
  const { data, error } = await supabase
    .from('crypt_list')
    .select('*')
    .eq('crypt_type', type)
    .order('created_at', { ascending: true });

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
  const { data, error } = await supabase
    .from('crypt_slot')
    .select('*, client_list (*), deceased_list(*)')
    .eq('crypt_id', crypt_id)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  return data as Array<CryptSlotResponse>;
}

export async function getCryptSlotByType(type: CryptType) {
  const { data, error } = await supabase
    .from('crypt_slot')
    .select('*, client_list (*), deceased_list(*)')
    .eq('crypt_type', type)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  return data as Array<CryptSlotResponse>;
}
