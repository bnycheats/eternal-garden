import { z } from 'zod';

export type CoffinCryptResponse = {
  created_at: string;
  id: string;
  slots: number;
  title: string;
  column: number;
};

export const AddBuildingFormSchema = z.object({
  title: z.string().min(1, { message: 'This field is required' }),
  slots: z.number().min(0, { message: 'This field is required' }),
  column: z.number().min(0, { message: 'This field is required' }),
});
