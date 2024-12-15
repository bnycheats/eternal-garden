import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { DialogProps } from '@radix-ui/react-dialog';
import { CalendarIcon } from 'lucide-react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormLabelIndicator from '@/components/FormLabelIndicator';
import { DeceasedFormSchema, DeceasedType, IntermentType } from '@/types/deceased-types';
import { Gender } from '@/types';
import { addDeceased } from '@/supabase-client/mutations/deceased';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { paths } from '@/navigation/Routes';
import { Combobox, ComboBoxItemType } from '@/components/ui/combobox';
import { searchClient } from '@/supabase-client/queries/clients';
import { useEffect, useState } from 'react';
import { CryptSlotFormSchema, CryptSlotStatus, CryptType } from '@/types/crypt-types';
import { addCryptSlot } from '@/supabase-client/mutations/crypt';

function AddNewDeceasedFormSheet(props: AddNewDeceasedFormSheetProps) {
  const { clientId, slotId, cryptId, cryptType, slotPayload, closeSheet, successCallBack, description, ...other } =
    props;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [searchResult, setSearchResult] = useState<Array<ComboBoxItemType>>([]);

  const form = useForm<z.infer<typeof DeceasedFormSchema>>({
    resolver: zodResolver(DeceasedFormSchema),
    defaultValues: {
      firstname: '',
      middlename: null,
      lastname: '',
      suffix: null,
      dob: new Date(),
      dod: new Date(),
      gender: undefined,
      religion: null,
      slot_id: null,
      crypt_id: cryptId,
      death_certificate: undefined,
      client_id: clientId,
      deceased_type: undefined,
      interment_type: undefined,
    },
  });

  const addMutation = useMutation({
    mutationFn: (request: z.infer<typeof DeceasedFormSchema>) => addDeceased(request),
    onSuccess: () => {
      closeSheet();
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['getDeceasedListByCryptId'] }).then(() => {
        toast({
          variant: 'success',
          title: 'Deceased added successfully',
        });
      });
      if (successCallBack) successCallBack();
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof DeceasedFormSchema>> = (data) => {
    if (slotId) {
      addMutation.mutate({ ...data, slot_id: slotId });
    } else {
      addCryptSlot({
        crypt_id: cryptId,
        crypt_type: cryptType,
        status: CryptSlotStatus.OCCUPIED,
        occupied_by: data.client_id,
        angle: null,
        column: null,
        face: null,
        lat: null,
        length: null,
        lon: null,
        row: null,
        slot: null,
        width: null,
        ...slotPayload,
      }).then((slot) => addMutation.mutate({ ...data, slot_id: slot.id }));
    }
  };

  const handleSearch = async (value: string) => {
    const response = await searchClient(value);
    setSearchResult(
      response.map(({ firstname, id, middlename, lastname }) => ({
        value: id,
        label: `${firstname ?? ''} ${middlename ?? ''} ${lastname ?? ''}`,
      })),
    );
  };

  const onInit = () => {
    if (clientId) {
      form.setValue('client_id', clientId);
    }
  };

  useEffect(onInit, [clientId]);

  return (
    <Sheet
      {...other}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
          closeSheet();
        }
      }}
    >
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Deceased</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <Form {...form}>
          <form className="mt-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              {!clientId && (
                <FormField
                  control={form.control}
                  name="client_id"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="mb-1 flex justify-between">
                        <span>
                          Occupied by{' '}
                          <FormLabelIndicator isOptional={DeceasedFormSchema.shape[field.name].isOptional()} />
                        </span>
                        <Link className="text-xs text-meta-5 underline" to={paths.authenticated.CLIENTS_CREATE}>
                          Add New Client
                        </Link>
                      </FormLabel>
                      <Combobox
                        className="w-full"
                        searchPlaceholder="Search client..."
                        selectItemMsg="Select client"
                        items={searchResult}
                        onSelect={(value) => field.onChange(value)}
                        onSearchChange={handleSearch}
                        value={field.value ?? ''}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name <FormLabelIndicator isOptional={DeceasedFormSchema.shape[field.name].isNullable()} />
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
                      Middle Name <FormLabelIndicator isOptional={DeceasedFormSchema.shape[field.name].isNullable()} />
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
                      Last Name <FormLabelIndicator isOptional={DeceasedFormSchema.shape[field.name].isNullable()} />
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
                      Suffix <FormLabelIndicator isOptional={DeceasedFormSchema.shape[field.name].isNullable()} />
                    </FormLabel>
                    <Input type="text" placeholder="---" {...field} value={field.value ?? ''} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      Date of Birth{' '}
                      <FormLabelIndicator isOptional={DeceasedFormSchema.shape[field.name].isNullable()} />
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dod"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      Date of Death{' '}
                      <FormLabelIndicator isOptional={DeceasedFormSchema.shape[field.name].isNullable()} />
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                      Gender <FormLabelIndicator isOptional={DeceasedFormSchema.shape[field.name].isNullable()} />
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
              <FormField
                control={form.control}
                name="religion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Religion <FormLabelIndicator isOptional={DeceasedFormSchema.shape[field.name].isNullable()} />
                    </FormLabel>
                    <Input type="text" placeholder="---" {...field} value={field.value ?? ''} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interment_type"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      Interment Type{' '}
                      <FormLabelIndicator isOptional={DeceasedFormSchema.shape[field.name].isNullable()} />
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Please select interment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(IntermentType).map((id) => (
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
                name="deceased_type"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      Deceased Type{' '}
                      <FormLabelIndicator isOptional={DeceasedFormSchema.shape[field.name].isNullable()} />
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Please select interment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(DeceasedType).map((id) => (
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
                name="death_certificate"
                render={({ field: { ref, name, onBlur, onChange } }) => (
                  <FormItem>
                    <FormLabel>
                      Death Certificate <FormLabelIndicator isOptional={DeceasedFormSchema.shape[name].isNullable()} />
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
            <SheetFooter>
              <Button type="submit" disabled={addMutation.isPending || !form.formState.isDirty}>
                {addMutation.isPending && <Spinner className="h-5 w-5 text-white" />}
                Add
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

type AddNewDeceasedFormSheetProps = {
  clientId?: string;
  slotId?: string;
  cryptId: string;
  cryptType: CryptType;
  slotPayload?: Partial<z.infer<typeof CryptSlotFormSchema>>;
  closeSheet: () => void;
  successCallBack?: () => void;
  description?: string;
} & DialogProps;

export default AddNewDeceasedFormSheet;
