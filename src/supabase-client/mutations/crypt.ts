import supabase from '@/supabase-client';
import { z } from 'zod';

import { CryptFormSchema, CryptSlotFormSchema, type CryptResponse } from '@/types/crypt-types';

export async function addCrypt(formData: z.infer<typeof CryptFormSchema>) {
  let payload = {};
  const { lat, lon, ...other } = formData;
  if (lat && lon) {
    payload = { ...other, coordinates: `${lat}, ${lon}` };
  } else {
    payload = { ...other, coordinates: null };
  }
  const { data, error } = await supabase.from('crypt_list').insert(payload).single();

  if (error) {
    throw error;
  }

  return data as CryptResponse;
}

export async function updateCrypt(id: string, formData: z.infer<typeof CryptFormSchema>) {
  let payload = {};
  const { lat, lon, ...other } = formData;
  if (lat && lon) {
    payload = { ...other, coordinates: `${lat}, ${lon}` };
  } else {
    payload = { ...other, coordinates: null };
  }
  const { data, error } = await supabase.from('crypt_list').update(payload).eq('id', id).single();

  if (error) {
    throw error;
  }

  return data as CryptResponse;
}

export async function deleteCrypt(id: string) {
  const { error } = await supabase.from('crypt_list').delete().eq('id', id);

  if (error) {
    throw error;
  }
}

export async function addCryptSlot(formData: z.infer<typeof CryptSlotFormSchema>) {
  let payload = {};
  const { lat, lon, ...other } = formData;
  if (lat && lon) {
    payload = { ...other, coordinates: `${lat}, ${lon}` };
  } else {
    payload = { ...other, coordinates: null };
  }
  const { data, error } = await supabase.from('crypt_slot').insert(payload).single();

  if (error) {
    throw error;
  }

  return data as CryptResponse;
}
