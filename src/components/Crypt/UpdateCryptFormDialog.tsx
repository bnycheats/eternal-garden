import Spinner from '@/components/Spinner';
import { useToast } from '@/hooks/use-toast';
import { type DialogProps } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AddCryptFormSchema, type CryptResponse } from '@/types/crypt-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateCrypt } from '@/supabase-client/mutations/crypt';

function UpdateCryptFormDialog(props: UpdateCryptFormDialogProps) {
  const { details, closeModal, queryKey, ...other } = props;
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

  const form = useForm<z.infer<typeof AddCryptFormSchema>>({
    resolver: zodResolver(AddCryptFormSchema),
    defaultValues: {
      ...otherDetails,
      lat,
      lon,
    },
  });

  const updateMutation = useMutation({
    mutationFn: (request: z.infer<typeof AddCryptFormSchema>) => updateCrypt(id, request),
    onSuccess: () => {
      closeModal();
      form.reset();
      queryClient.invalidateQueries({ queryKey: [queryKey] }).then(() => {
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

  const onSubmit: SubmitHandler<z.infer<typeof AddCryptFormSchema>> = (data) => updateMutation.mutate(data);

  return (
    <Dialog {...other} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">Update Crypt Building</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-5.5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" placeholder="Name*" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rows"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rows</FormLabel>
                  <Input
                    placeholder="Rows*"
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
                    placeholder="Columns*"
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
              name="lon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longtitude</FormLabel>
                  <Input
                    placeholder="Longtitude*"
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
                    placeholder="Latitude*"
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
            <div>
              <Button
                type="submit"
                className="w-full p-4"
                disabled={updateMutation.isPending || !form.formState.isDirty || !form.formState.isValid}
              >
                {updateMutation.isPending && <Spinner className="h-5 w-5 text-white" />}
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

type UpdateCryptFormDialogProps = {
  details: CryptResponse;
  closeModal: () => void;
  queryKey: string;
} & DialogProps;

export default UpdateCryptFormDialog;
