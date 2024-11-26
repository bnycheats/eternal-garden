import { z } from 'zod';

export enum LeaseStatus {
  'AT_NEED' = 'AT NEED',
  'PRE_NEED' = 'PRE-NEED',
}

export enum OccupantType {
  'INDIGENT' = 'INDIGENT',
  'NON_INDIGENT' = 'NON INDIGENT',
}

export enum PaidStatus {
  'PAID' = 'PAID',
  'UNPAID' = 'UNPAID',
  'PENDING' = 'PENDING',
  'PARTIALLY_PAID' = 'PARTIALLY PAID',
  'REFUNDED' = 'REFUNDED',
}

export enum Gender {
  'Female' = 'Female',
  'Male' = 'Male',
}

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

const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
const MAX_IMAGE_SIZE = 1; //In MegaBytes

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export const RegisterClientFormSchema = z.object({
  firstname: z.string().min(1, { message: 'This field is required' }),
  middlename: z.string().optional(),
  lastname: z.string().min(1, { message: 'This field is required' }),
  contact: z.string().min(1, { message: 'This field is required' }),
  suffix: z.string().optional(),
  email: z.string().min(1, { message: 'This field is required' }).email('This is not a valid email.'),
  gender: z.string().min(1, { message: 'This field is required' }),
  province: z.string().min(1, { message: 'This field is required' }),
  city_municipality: z.string().min(1, { message: 'This field is required' }),
  barangay: z.string().min(1, { message: 'This field is required' }),
  address: z.string().min(1, { message: 'This field is required' }),
  id_presented: z.nativeEnum(IdPresented).refine((id) => {
    return id.length === 0;
  }, 'This field is required'),
  id_number: z.string().min(1, { message: 'This field is required' }),
  place_issued: z.string().min(1, { message: 'This field is required' }),
  lease_date: z.string().optional(),
  date_expired: z.string().optional(),
  lease_status: z.nativeEnum(LeaseStatus).optional(),
  occupant_type: z.nativeEnum(OccupantType).optional(),
  certificate_indigency: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).every((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE);
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
    }, 'File type is not supported')
    .optional(),
  valid_id: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0;
    }, 'This field is required')
    .refine((files) => {
      return Array.from(files ?? []).every((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE);
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
    }, 'File type is not supported'),
  picture: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0;
    }, 'This field is required')
    .refine((files) => {
      return Array.from(files ?? []).every((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE);
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
    }, 'File type is not supported'),
  paid_status: z.nativeEnum(PaidStatus).optional(),
});
