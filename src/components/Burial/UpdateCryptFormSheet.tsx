import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Fragment } from 'react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { DialogProps } from '@radix-ui/react-dialog';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CryptFormSchema, CryptResponse, CryptType } from '@/types/crypt-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateCrypt } from '@/supabase-client/mutations/crypt';
import FormLabelIndicator from '../FormLabelIndicator';

function UpdateCryptFormSheet(props: UpdateCryptFormSheetProps) {
  const { details, closeSheet, ...other } = props;
  const { id, coordinates, ...otherDetails } = details;

  let lat = null;
  let lon = null;

  if (coordinates) {
    const split = coordinates.split(',');
    lat = parseFloat(split[0]);
    lon = parseFloat(split[1]);
  }

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CryptFormSchema>>({
    resolver: zodResolver(CryptFormSchema),
    defaultValues: {
      ...otherDetails,
      lat,
      lon,
    },
  });

  const updateMutation = useMutation({
    mutationFn: (request: z.infer<typeof CryptFormSchema>) => updateCrypt(id, request),
    onSuccess: () => {
      closeSheet();
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['getCryptListByType', details.crypt_type] }).then(() => {
        toast({
          variant: 'success',
          title: 'Crypt updated successfully',
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

  const getTitle = (type: CryptType) => {
    switch (type) {
      case CryptType.LAWN:
        return 'Edit Crypt';
      default:
        return 'Edit Crypt Building';
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof CryptFormSchema>> = (data) => updateMutation.mutate(data);

  return (
    <Sheet {...other} onOpenChange={(open) => !open && closeSheet()}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{getTitle(otherDetails.crypt_type)}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="mt-4 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <FormLabelIndicator isOptional={CryptFormSchema.shape[field.name].isOptional()} />
                  </FormLabel>
                  <Input type="text" placeholder="---" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            {(otherDetails.crypt_type === CryptType.COFFIN || otherDetails.crypt_type === CryptType.BONE) && (
              <Fragment>
                <FormField
                  control={form.control}
                  name="rows"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rows</FormLabel>
                      <Input
                        placeholder="---"
                        type="number"
                        disabled
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          field.onChange(isNaN(value) ? null : value);
                        }}
                      />
                      <span className="text-xs text-meta-8">Existing values for rows cannot be changed.</span>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="columns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Columns</FormLabel>
                      <Input
                        placeholder="---"
                        type="number"
                        disabled
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          field.onChange(isNaN(value) ? null : value);
                        }}
                      />
                      <span className="text-xs text-meta-8">Existing values for columns cannot be changed.</span>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longtitude</FormLabel>
                      <Input
                        placeholder="---"
                        type="number"
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          field.onChange(isNaN(value) ? null : value);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <Input
                        placeholder="---"
                        type="number"
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          field.onChange(isNaN(value) ? null : value);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length of building (meters)</FormLabel>
                      <Input
                        placeholder="---"
                        type="number"
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          field.onChange(isNaN(value) ? null : value);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width of building (meters)</FormLabel>
                      <Input
                        placeholder="---"
                        type="number"
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          field.onChange(isNaN(value) ? null : value);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="angle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Angle (default to 0°)</FormLabel>
                      <Input
                        placeholder="---"
                        type="number"
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          field.onChange(isNaN(value) ? null : value);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Fragment>
            )}
            <SheetFooter>
              <Button
                type="submit"
                disabled={updateMutation.isPending || !form.formState.isDirty || !form.formState.isValid}
              >
                {updateMutation.isPending && <Spinner className="h-5 w-5 text-white" />}
                Save
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

type UpdateCryptFormSheetProps = {
  details: CryptResponse;
  closeSheet: () => void;
} & DialogProps;

export default UpdateCryptFormSheet;
