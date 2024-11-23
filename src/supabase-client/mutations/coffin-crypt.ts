import supabase from '@/supabase-client';
import { z } from 'zod';

import { AddBuildingFormSchema, type CoffinCryptResponse } from '@/types/coffin-crypt-types';

export async function addCoffinCrypt(payload: z.infer<typeof AddBuildingFormSchema>) {
  const { data, error } = await supabase.from('coffin_crypt').insert(payload).single();

  if (error) {
    throw error;
  }

  return data as CoffinCryptResponse;
}

export async function updateCoffinCrypt(id: string, payload: z.infer<typeof AddBuildingFormSchema>) {
  const { data, error } = await supabase.from('coffin_crypt').update(payload).eq('id', id).single();

  if (error) {
    throw error;
  }

  return data as CoffinCryptResponse;
}

export async function deleteCoffinCrypt(id: string) {
  const { error } = await supabase.from('coffin_crypt').delete().eq('id', id);

  if (error) {
    throw error;
  }
}
