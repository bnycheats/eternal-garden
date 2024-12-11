import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { paths } from '@/navigation/Routes';
import { CryptSlotResponse, CryptType } from '@/types/crypt-types';

import { DialogProps } from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';

function ViewDetailsSheet(props: ViewDetailsSheetProps) {
  const { header = false, closeSheet, info, ...other } = props;

  if (!info) return null;

  const { client_list } = info;

  const list: Array<{ label: string; value: any }> = [
    {
      label: 'Slot',
      value: info.slot,
    },
    {
      label: 'Face',
      value: info.face,
    },
    {
      label: 'Status',
      value: info.status,
    },
    {
      label: 'Crypt Type',
      value: info.crypt_type,
    },
    {
      label: 'Row',
      value: info.row,
    },
    {
      label: 'Column',
      value: info.column,
    },
  ];

  return (
    <Sheet {...other} onOpenChange={(open) => !open && closeSheet()}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>View Details</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-semibold">Occupied by</label>
            <div>{`${client_list.firstname} ${client_list.middlename ?? ''} ${client_list.lastname}`}</div>
            {info.occupied_by && (
              <Link className="text-xs text-meta-5 underline" to={`${paths.authenticated.CLIENTS}/${info.occupied_by}`}>
                View Client Information
              </Link>
            )}
          </div>
          {info.crypt_type !== CryptType.MAUSOLEUM &&
            list.map((item, index) => (
              <div key={index} className="flex justify-between">
                <label className="text-sm font-semibold">{item.label}</label>
                <p className="text-sm">{item.value}</p>
              </div>
            ))}
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
