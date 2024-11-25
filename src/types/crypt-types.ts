import { z } from 'zod';

export enum CryptType {
  COFFIN = 'COFFIN',
  MAUSOLEUM = 'MAUSOLEUM',
  BONE = 'BONE',
  COMMON = 'COMMON',
  LAWN = 'LAWN',
  ANNEX = 'ANNEX',
}

export type CryptResponse = {
  created_at: string;
  id: string;
  name: string;
  rows: number | null;
  columns: number | null;
  coordinates: string | null;
  crypt_type: CryptType;
};

export const AddCryptFormSchema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  rows: z.number().nullable(),
  columns: z.number().nullable(),
  lon: z.number().nullable(),
  lat: z.number().nullable(),
  crypt_type: z.string().min(1, { message: 'This field is required' }),
});
