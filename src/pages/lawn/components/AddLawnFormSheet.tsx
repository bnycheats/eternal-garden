import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { DialogProps } from '@radix-ui/react-dialog';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CryptSlotFormSchema, CryptSlotStatus, CryptType } from '@/types/crypt-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { addCryptSlot } from '@/supabase-client/mutations/crypt';

function AddLawnFormSheet(props: AddLawnFormSheetProps) {
  const { closeSheet, cryptId, ...other } = props;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CryptSlotFormSchema>>({
    resolver: zodResolver(CryptSlotFormSchema),
    defaultValues: {
      crypt_id: cryptId,
      crypt_type: CryptType.LAWN,
      status: CryptSlotStatus.VACANT,
      lat: null,
      lon: null,
      length: null,
      angle: null,
      width: null,
      column: null,
      face: null,
      occupied_by: null,
      row: null,
      slot: null,
    },
  });

  const addMutation = useMutation({
    mutationFn: (request: z.infer<typeof CryptSlotFormSchema>) => addCryptSlot(request),
    onSuccess: () => {
      closeSheet();
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['getCryptSlotByCryptId', cryptId] }).then(() => {
        toast({
          variant: 'success',
          title: 'Lawn added successfully',
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

  const onSubmit: SubmitHandler<z.infer<typeof CryptSlotFormSchema>> = (data) => addMutation.mutate(data);

  return (
    <Sheet {...other} onOpenChange={(open) => !open && closeSheet()}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Lawn</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="mt-4 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="slot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slot Number</FormLabel>
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
                  <FormLabel>Length of lawn (meters)</FormLabel>
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
                  <FormLabel>Width of lawn (meters)</FormLabel>
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

type AddLawnFormSheetProps = {
  closeSheet: () => void;
  cryptId: string;
} & DialogProps;

export default AddLawnFormSheet;
