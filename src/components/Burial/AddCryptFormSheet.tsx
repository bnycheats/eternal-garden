import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { DialogProps } from '@radix-ui/react-dialog';
import { Fragment } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CryptFormSchema, CryptType } from '@/types/crypt-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { addCrypt } from '@/supabase-client/mutations/crypt';
import FormLabelIndicator from '../FormLabelIndicator';

function AddCryptFormSheet(props: AddCryptFormSheetProps) {
  const { closeSheet, crypt_type, ...other } = props;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CryptFormSchema>>({
    resolver: zodResolver(CryptFormSchema),
    defaultValues: {
      name: '',
      rows: null,
      columns: null,
      crypt_type,
      lat: null,
      lon: null,
      length: null,
      angle: null,
      width: null,
    },
  });

  const addMutation = useMutation({
    mutationFn: (request: z.infer<typeof CryptFormSchema>) => addCrypt(request),
    onSuccess: () => {
      closeSheet();
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['getCryptListByType', crypt_type] }).then(() => {
        toast({
          variant: 'success',
          title: 'Crypt added successfully',
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
        return 'Add Crypt';
      case CryptType.MAUSOLEUM:
        return 'Add Mausoleum';
      case CryptType.COMMON:
        return 'Add Common Area';
      case CryptType.ANNEX:
        return 'Add Annex';
      default:
        return 'Add Crypt Building';
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof CryptFormSchema>> = (data) => addMutation.mutate(data);

  return (
    <Sheet {...other} onOpenChange={(open) => !open && closeSheet()}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{getTitle(crypt_type)}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="mt-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      Name <FormLabelIndicator isOptional={CryptFormSchema.shape[field.name].isOptional()} />
                    </FormLabel>
                    <Input type="text" placeholder="---" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {[CryptType.COFFIN, CryptType.BONE].includes(crypt_type) && (
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
                    name="columns"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Columns</FormLabel>
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
              {[CryptType.COFFIN, CryptType.BONE, CryptType.MAUSOLEUM, CryptType.COMMON, CryptType.ANNEX].includes(
                crypt_type,
              ) && (
                <Fragment>
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
                      <FormItem className="col-span-2">
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
                      <FormItem className="col-span-2">
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
                      <FormItem className="col-span-2">
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
            </div>
            <SheetFooter>
              <Button
                type="submit"
                disabled={addMutation.isPending || !form.formState.isDirty || !form.formState.isValid}
              >
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

type AddCryptFormSheetProps = {
  closeSheet: () => void;
  crypt_type: CryptType;
} & DialogProps;

export default AddCryptFormSheet;
