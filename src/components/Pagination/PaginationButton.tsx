import { cn } from '@/lib/utils';

function PaginationButton(props: PaginationButtonProps) {
  const { active, children, ...other } = props;
  return (
    <button
      className={cn(
        'm-1 flex h-4 w-4 items-center justify-center rounded hover:enabled:bg-primary hover:enabled:text-white disabled:opacity-50 xsm:h-5 xsm:w-5 md:h-8 md:w-8',
        {
          'cursor-default bg-primary text-white hover:!bg-bodydark': active,
        },
      )}
      {...other}
    >
      {children}
    </button>
  );
}

type PaginationButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { active?: boolean };

export default PaginationButton;
