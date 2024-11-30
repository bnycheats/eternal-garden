import { z } from 'zod';

export enum CryptType {
  COFFIN = 'COFFIN',
  MAUSOLEUM = 'MAUSOLEUM',
  BONE = 'BONE',
  COMMON = 'COMMON',
  LAWN = 'LAWN',
  ANNEX = 'ANNEX',
}

export enum CryptSlotStatus {
  'VACANT' = 'VACANT',
  'OCCUPIED' = 'OCCUPIED',
  'FULL' = 'FULL',
}

export enum Face {
  'FRONT' = 'FRONT',
  'BACK' = 'BACK',
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

export type CryptSlotResponse = {
  created_at: string;
  id: string;
  name: string;
  crypt_id: string;
  status: CryptSlotStatus;
  row: number | null;
  column: number | null;
  coordinates: string | null;
  crypt_type: CryptType;
  face: Face | null;
  occupied_by: string | null;
  slot: number | null;
};

export const CryptFormSchema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  rows: z.number().nullable(),
  columns: z.number().nullable(),
  lon: z.number().nullable(),
  lat: z.number().nullable(),
  crypt_type: z.string().min(1, { message: 'This field is required' }),
});

export const CryptSlotFormSchema = z.object({
  crypt_id: z.string().min(1, { message: 'This field is required' }),
  status: z.nativeEnum(CryptSlotStatus).nullable(),
  occupied_by: z.string().nullable(),
  slot: z.number().nullable(),
  row: z.number().nullable(),
  column: z.number().nullable(),
  lon: z.number().nullable(),
  lat: z.number().nullable(),
  face: z.nativeEnum(Face).nullable(),
  crypt_type: z.string().min(1, { message: 'This field is required' }),
});
