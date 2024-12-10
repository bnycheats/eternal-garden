import supabase from '../index';
import { z } from 'zod';
import { DeceasedFormSchema, DeceasedRequest, DeceasedResponse, UpdateDeceasedFormSchema } from '@/types/deceased-types';

export async function addDeceased(formData: z.infer<typeof DeceasedFormSchema>) {
  const timestamp = Date.now();
  const { death_certificate, ...other } = formData;

  const payload: DeceasedRequest = other;

  if (death_certificate) {
    const { data, error } = await supabase.storage
      .from('docs')
      .upload(`deathCertificate/${timestamp}-${death_certificate.name}`, death_certificate, {
        cacheControl: '3600',
        upsert: false,
      });
    if (error) throw error;
    payload.death_certificate = data.fullPath;
  }

  const { data, error } = await supabase.from('deceased_list').insert(payload).single();

  if (error) {
    throw error;
  }

  return data as DeceasedResponse;
}

export async function removeDeceased(id: string) {
  const { data, error } = await supabase.from('deceased_list').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return data;
}

export async function updateDeceased(
  deceasedId: string,
  certificatePath: string,
  formData: z.infer<typeof UpdateDeceasedFormSchema>,
) {
  const { death_certificate, ...other } = formData;

  const payload: DeceasedRequest = other;

  if (death_certificate && certificatePath) {
    const { data, error } = await supabase.storage.from('docs').update(certificatePath, death_certificate, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) throw error;
    payload.death_certificate = data.fullPath;
  }

  const { data, error } = await supabase.from('deceased_list').update(payload).eq('id', deceasedId);

  if (error) {
    throw error;
  }

  return data;
}
