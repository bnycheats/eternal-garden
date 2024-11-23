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
import { AddBuildingFormSchema } from '@/types/coffin-crypt-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { addCoffinCrypt } from '@/supabase-client/mutations/coffin-crypt';

function AddBuildingFormDialog(props: AddBuildingFormDialogProps) {
  const { closeModal, ...other } = props;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AddBuildingFormSchema>>({
    resolver: zodResolver(AddBuildingFormSchema),
    defaultValues: {
      title: '',
      column: 0,
      slots: 0,
    },
  });

  const addMutation = useMutation({
    mutationFn: (request: z.infer<typeof AddBuildingFormSchema>) => addCoffinCrypt(request),
    onSuccess: () => {
      closeModal();
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['getCoffinCryptList'] }).then(() => {
        toast({
          variant: 'success',
          title: 'Coffin Crypt added successfully',
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

  const onSubmit: SubmitHandler<z.infer<typeof AddBuildingFormSchema>> = (data) => addMutation.mutate(data);

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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <Input type="text" placeholder="Title*" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slots</FormLabel>
                  <Input
                    placeholder="Slots*"
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? '' : value);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="column"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Column</FormLabel>
                  <Input
                    placeholder="Column*"
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? '' : value);
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

type AddBuildingFormDialogProps = {
  closeModal: () => void;
} & DialogProps;

export default AddBuildingFormDialog;
