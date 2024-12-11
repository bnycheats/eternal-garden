import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { paths } from '@/navigation/Routes';
import { AiFillEye, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { CryptSlotResponse } from '@/types/crypt-types';
import { DialogProps } from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function ViewDetailsSheet(props: ViewDetailsSheetProps) {
  const { header = false, closeSheet, info, ...other } = props;

  if (!info) return null;

  const { client_list, deceased_list } = info;

  return (
    <Sheet {...other} onOpenChange={(open) => !open && closeSheet()}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>View Details</SheetTitle>
        </SheetHeader>
        <div className="mt-2 space-y-3">
          <div className="border p-2">
            <h3 className="text-sm font-semibold">Client Details</h3>
            {info.occupied_by && (
              <div className="mt-2">
                <label className="text-xs uppercase">Occupied by</label>
                <div className="flex gap-2 font-semibold">
                  {`${client_list.firstname} ${client_list.middlename ?? ''} ${client_list.lastname}`}
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger tabIndex={-1} asChild>
                        <Link to={`${paths.authenticated.CLIENTS}/${info.occupied_by}`}>
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
              {info.slot && (
                <div>
                  <label className="text-xs uppercase">Slot</label>
                  <p className="font-bold">{info.slot}</p>
                </div>
              )}
              {info.face && (
                <div>
                  <label className="text-xs uppercase">Face</label>
                  <p className="font-bold">{info.face}</p>
                </div>
              )}
              {info.status && (
                <div>
                  <label className="text-xs uppercase">Status</label>
                  <p className="font-bold">{info.status}</p>
                </div>
              )}
              {info.crypt_type && (
                <div>
                  <label className="text-xs uppercase">Crypt Type</label>
                  <p className="font-bold">{info.crypt_type}</p>
                </div>
              )}
              {info.row && (
                <div>
                  <label className="text-xs uppercase">Row</label>
                  <p className="font-bold">{info.row}</p>
                </div>
              )}
              {info.column && (
                <div>
                  <label className="text-xs uppercase">Column</label>
                  <p className="font-bold">{info.column}</p>
                </div>
              )}
              {info.width && (
                <div>
                  <label className="text-xs uppercase">Width</label>
                  <p className="font-bold">{info.width} meter(s)</p>
                </div>
              )}
              {info.length && (
                <div>
                  <label className="text-xs uppercase">Length</label>
                  <p className="font-bold">{info.length} meter(s)</p>
                </div>
              )}
              {info.angle && (
                <div>
                  <label className="text-xs uppercase">Angle</label>
                  <p className="font-bold">{info.angle}</p>
                </div>
              )}
              {info.coordinates && (
                <div>
                  <label className="text-xs uppercase">Coordinates</label>
                  <p className="font-bold">{info.coordinates}</p>
                </div>
              )}
            </div>
          </div>
          <div className="border p-2">
            <h3 className="text-sm font-semibold">Deceased List</h3>
            <ul className="mt-3 space-y-2">
              {deceased_list?.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{`${item.firstname} ${item.middlename ?? ''} ${item.lastname}`}</span>
                  <div className="flex gap-2">
                    <button>
                      <AiFillEdit className="text-meta-5" />
                    </button>
                    <button>
                      <AiFillDelete className="text-meta-1" />
                    </button>
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
