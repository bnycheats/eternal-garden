import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { paths } from '@/navigation/Routes';
import { AiFillEye } from 'react-icons/ai';
import { CryptSlotResponse } from '@/types/crypt-types';
import { DialogProps } from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import DeceasedActionMenu from './DeceasedActionMenu';
import { Button } from '../ui/button';
import useCryptSlots from '@/hooks/useCryptSlots';
import { useQuery } from '@tanstack/react-query';
import getCryptSlotByIdQuery from '@/queries/getCryptSlotByIdQuery';

function ViewDetailsSheet(props: ViewDetailsSheetProps) {
  const { header = false, closeSheet, info, ...other } = props;
  const { handleOpenAddSheet } = useCryptSlots();

  const { data: details } = useQuery({
    ...getCryptSlotByIdQuery(info?.id ?? ''),
    enabled: !!info,
    staleTime: 0,
    initialData: info,
  });

  if (!details) return null;

  const { client_list, deceased_list } = details;

  return (
    <Sheet {...other} onOpenChange={(open) => !open && closeSheet()}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>View Details</SheetTitle>
        </SheetHeader>
        <div className="mt-2 space-y-3">
          <div className="border p-2">
            <h3 className="text-sm font-semibold">Client Details</h3>
            {details.occupied_by && (
              <div className="mt-2">
                <label className="text-xs uppercase">Occupied by</label>
                <div className="flex gap-2 font-semibold">
                  {`${client_list.firstname} ${client_list.middlename ?? ''} ${client_list.lastname}`}
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger tabIndex={-1} asChild>
                        <Link to={`${paths.authenticated.CLIENTS}/${details.occupied_by}`}>
                          <AiFillEye className="text-meta-5" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Click to view client details</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            )}
          </div>
          <div className="border p-2">
            <h3 className="text-sm font-semibold">Slot Details</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {details.slot && (
                <div>
                  <label className="text-xs uppercase">Slot</label>
                  <p className="font-bold">{details.slot}</p>
                </div>
              )}
              {details.face && (
                <div>
                  <label className="text-xs uppercase">Face</label>
                  <p className="font-bold">{details.face}</p>
                </div>
              )}
              {details.status && (
                <div>
                  <label className="text-xs uppercase">Status</label>
                  <p className="font-bold">{details.status}</p>
                </div>
              )}
              {details.crypt_type && (
                <div>
                  <label className="text-xs uppercase">Crypt Type</label>
                  <p className="font-bold">{details.crypt_type}</p>
                </div>
              )}
              {details.row && (
                <div>
                  <label className="text-xs uppercase">Row</label>
                  <p className="font-bold">{details.row}</p>
                </div>
              )}
              {details.column && (
                <div>
                  <label className="text-xs uppercase">Column</label>
                  <p className="font-bold">{details.column}</p>
                </div>
              )}
              {details.width && (
                <div>
                  <label className="text-xs uppercase">Width</label>
                  <p className="font-bold">{details.width} meter(s)</p>
                </div>
              )}
              {details.length && (
                <div>
                  <label className="text-xs uppercase">Length</label>
                  <p className="font-bold">{details.length} meter(s)</p>
                </div>
              )}
              {details.angle && (
                <div>
                  <label className="text-xs uppercase">Angle</label>
                  <p className="font-bold">{details.angle}</p>
                </div>
              )}
              {details.coordinates && (
                <div>
                  <label className="text-xs uppercase">Coordinates</label>
                  <p className="font-bold">{details.coordinates}</p>
                </div>
              )}
            </div>
          </div>
          <div className="border p-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Deceased List</h3>
              <Button
                size="sm"
                variant="link"
                tabIndex={-1}
                className="h-auto p-0 text-xs underline"
                onClick={() => {
                  if (handleOpenAddSheet && details.slot && details.face) {
                    handleOpenAddSheet({ slot: details.slot, face: details.face }, details.id);
                  }
                }}
              >
                Add New Deceased
              </Button>
            </div>
            <ul className="mt-3 space-y-2">
              {deceased_list?.map((item, index) => (
                <li key={index} className="flex items-center justify-between text-xs">
                  <span>{`${item.firstname} ${item.middlename ?? ''} ${item.lastname}`}</span>
                  <div className="flex gap-2">
                    <DeceasedActionMenu data={item} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

type ViewDetailsSheetProps = {
  header?: string;
  closeSheet: () => void;
  info: CryptSlotResponse | null;
} & DialogProps;

export default ViewDetailsSheet;
