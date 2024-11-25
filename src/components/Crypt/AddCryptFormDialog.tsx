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
import { AddCryptFormSchema, CryptType } from '@/types/crypt-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { addCrypt } from '@/supabase-client/mutations/crypt';

function AddCryptFormDialog(props: AddCryptFormDialogProps) {
  const { closeModal, crypt_type, queryKey, ...other } = props;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AddCryptFormSchema>>({
    resolver: zodResolver(AddCryptFormSchema),
    defaultValues: {
      name: '',
      rows: null,
      columns: null,
      crypt_type,
      lat: null,
      lon: null,
    },
  });

  const addMutation = useMutation({
    mutationFn: (request: z.infer<typeof AddCryptFormSchema>) => addCrypt(request),
    onSuccess: () => {
      closeModal();
      form.reset();
      queryClient.invalidateQueries({ queryKey: [queryKey] }).then(() => {
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

  const onSubmit: SubmitHandler<z.infer<typeof AddCryptFormSchema>> = (data) => addMutation.mutate(data);

  return (
    <Dialog {...other} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">Add Crypt Building</DialogTitle>
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
                disabled={addMutation.isPending || !form.formState.isDirty || !form.formState.isValid}
              >
                {addMutation.isPending && <Spinner className="h-5 w-5 text-white" />}
                Add
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

type AddCryptFormDialogProps = {
  closeModal: () => void;
  crypt_type: CryptType;
  queryKey: string;
} & DialogProps;

export default AddCryptFormDialog;
