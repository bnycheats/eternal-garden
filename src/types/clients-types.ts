import { z } from 'zod';
import { Gender } from '.';
import sizeInMB, { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/utils/sizeInMB';

// export enum LeaseStatus {
//   'AT_NEED' = 'AT NEED',
//   'PRE_NEED' = 'PRE-NEED',
// }

export enum OccupantType {
  'INDIGENT' = 'INDIGENT',
  'NON_INDIGENT' = 'NON INDIGENT',
}

// export enum PaidStatus {
//   'PAID' = 'PAID',
//   'UNPAID' = 'UNPAID',
//   'PENDING' = 'PENDING',
//   'PARTIALLY_PAID' = 'PARTIALLY PAID',
//   'REFUNDED' = 'REFUNDED',
// }

export enum IdPresented {
  GSIS_ID = 'GSIS ID',
  POSTAL_ID = 'POSTAL ID',
  VOTERS_ID = 'VOTERS ID',
  PHILIPPINE_PASSPORT = 'PHILIPPINE PASSPORT',
  PHILHEALTH_ID = 'PHILHEALTH ID',
  SSS_ID = 'SSS ID',
  PWD_ID = 'PWD ID',
  NATIONAL_ID = 'NATIONAL ID',
  PRC_ID = 'PRC ID',
  DRIVERS_LICENSE = 'DRIVERS LICENSE',
  UMID = 'UMID',
}

export enum ResidencyStatus {
  'PANABO' = 'PANABO',
  'OUTSIDE' = 'OUTSIDE',
}

export const RegisterClientFormSchema = z.object({
  firstname: z.string().min(1, { message: 'This field is required' }),
  middlename: z.string().nullable(),
  lastname: z.string().min(1, { message: 'This field is required' }),
  contact: z.string().min(1, { message: 'This field is required' }),
  suffix: z.string().nullable(),
  email: z.string().min(1, { message: 'This field is required' }).email('This is not a valid email.'),
  gender: z.nativeEnum(Gender).refine((gender) => {
    return gender.length > 0;
  }, 'This field is required'),
  province: z.string().min(1, { message: 'This field is required' }),
  city_municipality: z.string().min(1, { message: 'This field is required' }),
  barangay: z.string().min(1, { message: 'This field is required' }),
  address: z.string().min(1, { message: 'This field is required' }),
  id_presented: z.nativeEnum(IdPresented).refine((id) => {
    return id.length > 0;
  }, 'This field is required'),
  id_number: z.string().min(1, { message: 'This field is required' }),
  place_issued: z.string().min(1, { message: 'This field is required' }),
  occupant_type: z.nativeEnum(OccupantType).nullable(),
  certificate_indigency: z
    .custom<File>()
    .refine((file) => {
      return ACCEPTED_IMAGE_TYPES.includes(file?.type);
    }, 'File type is not supported')
    .refine((file) => {
      return sizeInMB(file?.size) <= MAX_IMAGE_SIZE;
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .nullable(),
  valid_id: z
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
  picture: z
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
  residency: z.nativeEnum(ResidencyStatus).nullable(),
});

export type RegisterClientRequest = Omit<
  z.infer<typeof RegisterClientFormSchema>,
  'certificate_indigency' | 'valid_id' | 'picture'
> & {
  certificate_indigency?: string;
  valid_id?: string;
  picture?: string;
};

export type ClientResponse = RegisterClientRequest & {
  id: string;
  created_at: string;
};
