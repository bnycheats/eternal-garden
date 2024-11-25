import { AlertDialogProps } from '@radix-ui/react-alert-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { deleteCrypt } from '@/supabase-client/mutations/crypt';

function DeleteCryptAlert(props: DeleteCryptAlertProps) {
  const { closeModal, title, id, queryKey, ...other } = props;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCrypt(id),
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: [queryKey] }).then(() => {
        toast({
          variant: 'success',
          title: `${title} deleted successfully`,
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

  const handleDelete = () => deleteMutation.mutate(id);

  return (
    <AlertDialog {...other} onOpenChange={(open) => !open && closeModal()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want delete this {title}?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type DeleteCryptAlertProps = {
  id: string;
  title: string;
  closeModal: () => void;
  queryKey: string;
} & AlertDialogProps;

export default DeleteCryptAlert;
