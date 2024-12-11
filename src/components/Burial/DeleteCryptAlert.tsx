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
import { type CryptType } from '@/types/crypt-types';
import Spinner from '../Spinner';

function DeleteCryptAlert(props: DeleteCryptAlertProps) {
  const { closeModal, title, id, cryptType, ...other } = props;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCrypt(id),
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['getCryptListByType', cryptType] }).then(() => {
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
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete();
            }}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending && <Spinner className="h-5 w-5 text-white" />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type DeleteCryptAlertProps = {
  id: string;
  title: string;
  closeModal: () => void;
  cryptType?: CryptType;
} & AlertDialogProps;

export default DeleteCryptAlert;
