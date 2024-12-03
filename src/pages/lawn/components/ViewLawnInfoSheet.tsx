import Clipboard from '@/components/Clipboard';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { paths } from '@/navigation/Routes';
import { CryptSlotResponse } from '@/types/crypt-types';

import { DialogProps } from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';

function ViewLawnInfoSheet(props: ViewLawnInfoSheetProps) {
  const { closeSheet, lawnDetails, ...other } = props;

  const list: Array<{ label: string; value: any }> = [
    {
      label: 'Status',
      value: lawnDetails.status,
    },
    {
      label: 'Crypt Type',
      value: lawnDetails.crypt_type,
    },
    {
      label: 'Coordinates',
      value: lawnDetails.coordinates,
    },
    {
      label: 'Length of lawn',
      value: `${lawnDetails.length} meter(s)`,
    },
    {
      label: 'Width of lawn',
      value: `${lawnDetails.width} meter(s)`,
    },
    {
      label: 'Angle',
      value: lawnDetails.angle ?? 0,
    },
  ];

  return (
    <Sheet {...other} onOpenChange={(open) => !open && closeSheet()}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Lawn Number: {lawnDetails.slot}</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-semibold">Occupied by</label>
            <p className="text-sm">
              <Clipboard value={lawnDetails.occupied_by ?? ''}>{lawnDetails.occupied_by}</Clipboard>
            </p>
            {lawnDetails.occupied_by && (
              <Link
                className="text-xs text-meta-5 underline"
                to={`${paths.authenticated.CLIENTS}/${lawnDetails.occupied_by}`}
              >
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

type ViewLawnInfoSheetProps = {
  closeSheet: () => void;
  lawnDetails: CryptSlotResponse;
} & DialogProps;

export default ViewLawnInfoSheet;
