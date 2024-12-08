import supabase from '../index';
import { z } from 'zod';
import { DeceasedFormSchema, DeceasedRequest, DeceasedResponse } from '@/types/deceased-types';

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
