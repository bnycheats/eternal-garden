import sizeInMB, { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/utils/sizeInMB';
import { Gender } from '.';
import { z } from 'zod';
import { ClientResponse } from './clients-types';

export enum IntermentType {
  '1st_Interment' = '1st Interment',
  '2nd_Interment' = '2nd Interment',
}

export enum DeceasedType {
  'BONES' = 'BONES',
  'REMAINS' = 'REMAINS',
}

export type DeceasedResponse = {
  created_at: string;
  id: string;
  firstname: string;
  crypt_id: string;
  middlename: string | null;
  lastname: string;
  suffix: string | null;
  dob: string;
  dod: string;
  gender: Gender;
  religion: string | null;
  slot_id: string | null;
  death_certificate: string;
  interment_type: IntermentType;
  deceased_type: DeceasedType;
  client_id: string;
  client_list: ClientResponse;
};

export const DeceasedFormSchema = z.object({
  firstname: z.string().min(1, { message: 'This field is required' }),
  crypt_id: z.string().min(1, { message: 'This field is required' }),
  middlename: z.string().nullable(),
  lastname: z.string().min(1, { message: 'This field is required' }),
  suffix: z.string().nullable(),
  dob: z.date({
    required_error: 'This field is required',
  }),
  dod: z.date({
    required_error: 'This field is required',
  }),
  gender: z.nativeEnum(Gender).refine((value) => {
    return value.length > 0;
  }, 'This field is required'),
  religion: z.string().nullable(),
  slot_id: z.string().nullable(),
  death_certificate: z
    .custom<File>()
    .refine((file) => {
      return file;
    }, 'This field is required')
    .refine((file) => {
      return ACCEPTED_IMAGE_TYPES.includes(file?.type);
    }, 'File type is not supported')
    .refine((file) => {
      return sizeInMB(file?.size) <= MAX_IMAGE_SIZE;
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`),
  interment_type: z.nativeEnum(IntermentType).refine((value) => {
    return value.length > 0;
  }, 'This field is required'),
  deceased_type: z.nativeEnum(DeceasedType).refine((value) => {
    return value.length > 0;
  }, 'This field is required'),
  client_id: z.string().min(1, { message: 'This field is required' }),
});

export type DeceasedRequest = Omit<z.infer<typeof DeceasedFormSchema>, 'death_certificate'> & {
  death_certificate?: string;
};

export const UpdateDeceasedFormSchema = DeceasedFormSchema.extend({
  death_certificate: z
    .custom<File>()
    .nullable()
    .refine((file) => {
      return !file || ACCEPTED_IMAGE_TYPES.includes(file?.type);
    }, 'File type is not supported')
    .refine((file) => {
      return !file || sizeInMB(file?.size) <= MAX_IMAGE_SIZE;
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`),
});
