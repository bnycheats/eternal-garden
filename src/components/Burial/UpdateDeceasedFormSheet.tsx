import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
import { UpdateDeceasedFormSchema, DeceasedResponse, DeceasedType, IntermentType } from '@/types/deceased-types';
import { Gender } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateDeceased } from '@/supabase-client/mutations/deceased';

function UpdateDeceasedFormSheet(props: UpdateDeceasedFormSheetProps) {
  const { data, closeSheet, ...other } = props;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { id, death_certificate, dob, dod, ...defaulValues } = data;

  const form = useForm<z.infer<typeof UpdateDeceasedFormSchema>>({
    resolver: zodResolver(UpdateDeceasedFormSchema),
    defaultValues: { ...defaulValues, dod: new Date(dob), dob: new Date(dod), death_certificate: null },
  });

  const updateMutation = useMutation({
    mutationFn: (request: z.infer<typeof UpdateDeceasedFormSchema>) => updateDeceased(id, death_certificate, request),
    onSuccess: () => {
      closeSheet();
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['getDeceasedListByCryptId'] }).then(() => {
        toast({
          variant: 'success',
          title: 'Deceased updated successfully',
        });
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UpdateDeceasedFormSchema>> = (data) => updateMutation.mutate(data);

  return (
    <Sheet
      {...other}
      onOpenChange={(open) => {
        if (!open) {
          closeSheet();
          form.reset();
        }
      }}
    >
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Update Deceased</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="mt-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name{' '}
                      <FormLabelIndicator isOptional={UpdateDeceasedFormSchema.shape[field.name].isNullable()} />
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
                      <FormLabelIndicator isOptional={UpdateDeceasedFormSchema.shape[field.name].isNullable()} />
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
                      Last Name{' '}
                      <FormLabelIndicator isOptional={UpdateDeceasedFormSchema.shape[field.name].isNullable()} />
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
                      Suffix <FormLabelIndicator isOptional={UpdateDeceasedFormSchema.shape[field.name].isNullable()} />
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
                      <FormLabelIndicator isOptional={UpdateDeceasedFormSchema.shape[field.name].isNullable()} />
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
                      <FormLabelIndicator isOptional={UpdateDeceasedFormSchema.shape[field.name].isNullable()} />
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
                      Gender <FormLabelIndicator isOptional={UpdateDeceasedFormSchema.shape[field.name].isNullable()} />
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
                      Religion{' '}
                      <FormLabelIndicator isOptional={UpdateDeceasedFormSchema.shape[field.name].isNullable()} />
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
                      <FormLabelIndicator isOptional={UpdateDeceasedFormSchema.shape[field.name].isNullable()} />
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
                      <FormLabelIndicator isOptional={UpdateDeceasedFormSchema.shape[field.name].isNullable()} />
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
                    <FormLabel>Replace Death Certificate</FormLabel>
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
              <Button type="submit" disabled={updateMutation.isPending || !form.formState.isDirty}>
                {updateMutation.isPending && <Spinner className="h-5 w-5 text-white" />}
                Update
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

type UpdateDeceasedFormSheetProps = {
  data: DeceasedResponse;
  closeSheet: () => void;
} & DialogProps;

export default UpdateDeceasedFormSheet;
