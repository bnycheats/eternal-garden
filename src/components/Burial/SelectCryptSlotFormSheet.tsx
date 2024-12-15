import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { DialogProps } from '@radix-ui/react-dialog';
import { useQueryClient, useMutation, QueryKey } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CryptSlotFormSchema } from '@/types/crypt-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { addCryptSlot } from '@/supabase-client/mutations/crypt';
import FormLabelIndicator from '../FormLabelIndicator';
import { Combobox, ComboBoxItemType } from '../ui/combobox';
import { useState } from 'react';
import { searchClient } from '@/supabase-client/queries/clients';
import { Link } from 'react-router-dom';
import { paths } from '@/navigation/Routes';

function SelectCryptSlotFormSheet(props: SelectCryptSlotFormSheetProps) {
  const { header, invalidateQueries, closeSheet, slotDetails, ...other } = props;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [searchResult, setSearchResult] = useState<Array<ComboBoxItemType>>([]);

  const form = useForm<z.infer<typeof CryptSlotFormSchema>>({
    resolver: zodResolver(CryptSlotFormSchema),
    defaultValues: slotDetails,
  });

  const addMutation = useMutation({
    mutationFn: (request: z.infer<typeof CryptSlotFormSchema>) => addCryptSlot(request),
    onSuccess: () => {
      formReset();
      queryClient.invalidateQueries({ queryKey: ['getCryptSlotByCryptId', slotDetails.crypt_id] }).then(() => {
        toast({
          variant: 'success',
          title: 'Slot occupied successfully',
        });
      });
      if (invalidateQueries) queryClient.invalidateQueries({ queryKey: invalidateQueries });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof CryptSlotFormSchema>> = (data) => addMutation.mutate(data);

  const handleSearch = async (value: string) => {
    const response = await searchClient(value);
    setSearchResult(
      response.map(({ firstname, id, middlename, lastname }) => ({
        value: id,
        label: `${firstname ?? ''} ${middlename ?? ''} ${lastname ?? ''}`,
      })),
    );
  };

  const formReset = () => {
    form.reset();
    setSearchResult([]);
    closeSheet();
  };

  return (
    <Sheet {...other} onOpenChange={(open) => !open && formReset()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{header || `Slot ${slotDetails.slot} - ${slotDetails.face}`}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="mt-4 space-y-5.5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="occupied_by"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1 flex justify-between">
                    <span>
                      Occupied by <FormLabelIndicator isOptional={CryptSlotFormSchema.shape[field.name].isOptional()} />
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
            <SheetFooter>
              <Button type="submit" disabled={addMutation.isPending || !form.formState.isDirty}>
                {addMutation.isPending && <Spinner className="h-5 w-5 text-white" />}
                Apply
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

type SelectCryptSlotFormSheetProps = {
  header?: string;
  invalidateQueries?: Array<QueryKey>;
  closeSheet: () => void;
  slotDetails: z.infer<typeof CryptSlotFormSchema>;
} & DialogProps;

export default SelectCryptSlotFormSheet;
