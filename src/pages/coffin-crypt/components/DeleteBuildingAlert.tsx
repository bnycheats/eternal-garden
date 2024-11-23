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
import { deleteCoffinCrypt } from '@/supabase-client/mutations/coffin-crypt';

function DeleteBuildingAlert(props: DeleteBuildingAlertProps) {
  const { closeModal, title, id, ...other } = props;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCoffinCrypt(id),
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['getCoffinCryptList'] }).then(() => {
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

type DeleteBuildingAlertProps = {
  id: string;
  title: string;
  closeModal: () => void;
} & AlertDialogProps;

export default DeleteBuildingAlert;
