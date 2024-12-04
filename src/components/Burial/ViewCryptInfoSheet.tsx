import Clipboard from '@/components/Clipboard';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { paths } from '@/navigation/Routes';
import { CryptSlotResponse } from '@/types/crypt-types';

import { DialogProps } from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';

function ViewCryptInfoSheet(props: ViewCryptInfoSheetProps) {
  const { closeSheet, info, ...other } = props;

  if (!info) return null;

  const list: Array<{ label: string; value: any }> = [
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
          <SheetTitle>
            Slot {info.slot} - {info.face}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-semibold">Occupied by</label>
            <p className="text-sm">
              <Clipboard value={info.occupied_by ?? ''}>{info.occupied_by}</Clipboard>
            </p>
            {info.occupied_by && (
              <Link className="text-xs text-meta-5 underline" to={`${paths.authenticated.CLIENTS}/${info.occupied_by}`}>
                View Client Information
              </Link>
            )}
          </div>
          {list.map((item, index) => (
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

type ViewCryptInfoSheetProps = {
  closeSheet: () => void;
  info: CryptSlotResponse | null;
} & DialogProps;

export default ViewCryptInfoSheet;
