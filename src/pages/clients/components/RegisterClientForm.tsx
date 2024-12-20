import Spinner from '@/components/Spinner';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import phil from 'phil-reg-prov-mun-brgy';

import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IdPresented, OccupantType, RegisterClientFormSchema, ResidencyStatus } from '@/types/clients-types';
import { Gender } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerClient } from '@/supabase-client/mutations/clients';
import FormLabelIndicator from '@/components/FormLabelIndicator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';

function RegisterClientForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof RegisterClientFormSchema>>({
    resolver: zodResolver(RegisterClientFormSchema),
    defaultValues: {
      firstname: '',
      middlename: null,
      lastname: '',
      contact: '',
      suffix: null,
      email: '',
      gender: undefined,
      province: '',
      city_municipality: '',
      barangay: '',
      address: '',
      id_presented: undefined,
      id_number: '',
      place_issued: '',
      occupant_type: OccupantType.NON_INDIGENT,
      certificate_indigency: null,
      valid_id: undefined,
      picture: undefined,
      residency: null,
    },
  });

  const selectedProvince = form.watch('province');
  const selectedCity = form.watch('city_municipality');

  const provinces: Array<string> = phil.provinces.map((item: ProvinceType) => item.name).sort();

  const cities: Array<string> = useMemo(
    () =>
      phil.city_mun
        .filter((city: CityType) => {
          const find = phil.provinces.find((item: ProvinceType) => item.name === selectedProvince) as ProvinceType;
          return find?.prov_code === city.prov_code;
        })
        .map((city: CityType) => city.name)
        .sort(),
    [selectedProvince],
  );

  const barangays: Array<string> = useMemo(
    () =>
      phil.barangays
        .filter((barangay: BarangayType) => {
          const find = phil.city_mun.find((item: CityType) => item.name === selectedCity) as CityType;
          return find?.mun_code === barangay.mun_code;
        })
        .map((barangay: BarangayType) => barangay.name)
        .sort(),
    [selectedCity],
  );

  const registerMutation = useMutation({
    mutationFn: (request: z.infer<typeof RegisterClientFormSchema>) => registerClient(request),
    onSuccess: () => {
      form.reset();
      toast({
        variant: 'success',
        title: 'Client added successfully',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegisterClientFormSchema>> = (data) => registerMutation.mutate(data);

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 border-b-2 pb-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[field.name].isNullable()} />
                </FormLabel>
                <Input type="text" placeholder="---" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middlename"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Middle Name{' '}
                  <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[field.name].isNullable()} />
                </FormLabel>
                <Input type="text" placeholder="---" {...field} value={field.value ?? ''} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last Name <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[field.name].isNullable()} />
                </FormLabel>
                <Input type="text" placeholder="---" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="suffix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Suffix <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[field.name].isNullable()} />
                </FormLabel>
                <Input type="text" placeholder="---" {...field} value={field.value ?? ''} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 border-b-2 pb-7 sm:grid-cols-2 md:grid-cols-3">
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Province <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[field.name].isNullable()} />
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province: string, index) => (
                      <SelectItem key={index} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city_municipality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  City or Municipality{' '}
                  <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[field.name].isNullable()} />
                </FormLabel>
                <Select disabled={!selectedProvince} onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city or munipacility" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city: string, index) => (
                      <SelectItem key={index} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="barangay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Barangay <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[field.name].isNullable()} />
                </FormLabel>
                <Select disabled={!selectedCity} onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a barangay" />
                  </SelectTrigger>
                  <SelectContent>
                    {barangays.map((barangay: string, index) => (
                      <SelectItem key={index} value={barangay}>
                        {barangay}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel>
                  Home Address{' '}
                  <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[field.name].isNullable()} />
                </FormLabel>
                <Textarea placeholder="Subdivision / Village / Purok (Complete Address)" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 border-b-2 pb-7 sm:grid-cols-2 md:grid-cols-3">
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Contact # <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[field.name].isNullable()} />
                </FormLabel>
                <Input type="text" placeholder="(09xx)-xxx-xxxx" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[field.name].isNullable()} />
                </FormLabel>
                <Input type="text" placeholder="---" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Gender <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[field.name].isNullable()} />
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Gender).map((id) => (
                      <SelectItem key={id} value={id}>
                        {id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 border-b-2 pb-7 sm:grid-cols-2 md:grid-cols-3">
          <FormField
            control={form.control}
            name="certificate_indigency"
            render={({ field: { ref, name, onBlur, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Certificate of indigency{' '}
                  <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[name].isNullable()} />
                </FormLabel>
                <div>
                  <input
                    type="file"
                    ref={ref}
                    name={name}
                    onBlur={onBlur}
                    onChange={(e) => {
                      form.setValue('occupant_type', OccupantType.INDIGENT);
                      onChange(e.target.files?.[0]);
                    }}
                  />
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="valid_id"
            render={({ field: { ref, name, onBlur, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Valid ID <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[name].isNullable()} />
                </FormLabel>
                <div>
                  <input
                    type="file"
                    ref={ref}
                    name={name}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.files?.[0])}
                  />
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="picture"
            render={({ field: { ref, name, onBlur, onChange } }) => (
              <FormItem>
                <FormLabel>
                  2 x 2 ID <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[name].isNullable()} />
                </FormLabel>
                <div>
                  <input
                    type="file"
                    ref={ref}
                    name={name}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.files?.[0])}
                  />
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <FormField
            control={form.control}
            name="id_presented"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ID Presented{' '}
                  <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[field.name].isNullable()} />
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select ID" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(IdPresented).map((id) => (
                      <SelectItem key={id} value={id}>
                        {id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ID # <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[field.name].isNullable()} />
                </FormLabel>
                <Input type="text" placeholder="---" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="place_issued"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Place Issued{' '}
                  <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[field.name].isNullable()} />
                </FormLabel>
                <Input type="text" placeholder="---" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="residency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Residency <FormLabelIndicator isOptional={RegisterClientFormSchema.shape[field.name].isNullable()} />
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value ?? ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select residency status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ResidencyStatus.PANABO}>Resident of Panabo</SelectItem>
                    <SelectItem value={ResidencyStatus.OUTSIDE}>Residing outside Panabo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-4 p-4" disabled={registerMutation.isPending || !form.formState.isDirty}>
          {registerMutation.isPending && <Spinner className="h-5 w-5 text-white" />}
          Create
        </Button>
      </form>
    </Form>
  );
}

type ProvinceType = {
  name: string;
  prov_code: string;
  reg_code: string;
};

type CityType = {
  name: string;
  mun_code: string;
  prov_code: string;
};

type BarangayType = {
  name: string;
  mun_code: string;
};

export default RegisterClientForm;
