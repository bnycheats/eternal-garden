import { RegisterClientFormSchema, RegisterClientRequest, ClientResponse } from '@/types/clients-types';
import supabase from '../index';
import { z } from 'zod';

export async function registerClient(formData: z.infer<typeof RegisterClientFormSchema>) {
  const timestamp = Date.now();
  const { valid_id, certificate_indigency, picture, ...other } = formData;

  const payload: RegisterClientRequest = other;

  if (valid_id) {
    const { data, error } = await supabase.storage
      .from('docs')
      .upload(`validId/${timestamp}-${valid_id.name}`, valid_id, {
        cacheControl: '3600',
        upsert: false,
      });
    if (error) throw error;
    payload.valid_id = data.fullPath;
  }

  if (certificate_indigency) {
    const { data, error } = await supabase.storage
      .from('docs')
      .upload(`indigency/${timestamp}-${certificate_indigency.name}`, certificate_indigency, {
        cacheControl: '3600',
        upsert: false,
      });
    if (error) throw error;
    payload.certificate_indigency = data.fullPath;
  }

  if (picture) {
    const { data, error } = await supabase.storage
      .from('docs')
      .upload(`picture/${timestamp}-${picture.name}`, picture, {
        cacheControl: '3600',
        upsert: false,
      });
    if (error) throw error;
    payload.picture = data.fullPath;
  }

  const { data, error } = await supabase.from('client_list').insert(payload).select().single();

  if (error) {
    throw error;
  }

  return data as ClientResponse;
}
