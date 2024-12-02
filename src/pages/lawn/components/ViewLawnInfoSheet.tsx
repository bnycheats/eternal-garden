import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CryptSlotResponse } from '@/types/crypt-types';

import { DialogProps } from '@radix-ui/react-dialog';

function ViewLawnInfoSheet(props: ViewLawnInfoSheetProps) {
  const { closeSheet, lawnDetails, ...other } = props;

  return (
    <Sheet {...other} onOpenChange={(open) => !open && closeSheet()}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Lawn Number: {lawnDetails.slot}</SheetTitle>
        </SheetHeader>
        <table className="-ml-5 mt-5 border-separate border-spacing-x-5">
          <tbody className="text-sm">
            <tr>
              <td className="font-semibold">Occupied by:</td>
              <td>{lawnDetails.occupied_by}</td>
            </tr>
          </tbody>
        </table>
      </SheetContent>
    </Sheet>
  );
}

type ViewLawnInfoSheetProps = {
  closeSheet: () => void;
  lawnDetails: CryptSlotResponse;
} & DialogProps;

export default ViewLawnInfoSheet;
