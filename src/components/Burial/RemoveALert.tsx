import Spinner from '@/components/Spinner';
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
import { useMutation } from '@tanstack/react-query';
import { removeDeceased } from '@/supabase-client/mutations/deceased';
import queryClient from '@/utils/query-client';
import { useToast } from '@/hooks/use-toast';

function RemoveALert(props: RemoveALertProps) {
  const { id, name, closeModal, ...other } = props;

  const { toast } = useToast();

  const removeMutation = useMutation({
    mutationFn: (id: string) => removeDeceased(id),
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['getDeceasedListByCryptId'] }).then(() => {
        toast({
          variant: 'success',
          title: 'Deceased removed successfully',
        });
      });
      queryClient.invalidateQueries({ queryKey: ['getCryptSlotById'] });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: error.message,
      });
    },
  });

  return (
    <AlertDialog {...other} onOpenChange={(open) => !open && closeModal()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to remove {name} ?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              removeMutation.mutate(id);
            }}
            disabled={removeMutation.isPending}
          >
            {removeMutation.isPending && <Spinner className="h-5 w-5 text-white" />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type RemoveALertProps = {
  id: string;
  name: string;
  closeModal: () => void;
} & AlertDialogProps;

export default RemoveALert;
