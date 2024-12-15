import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineDownload, AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import RemoveALert from './RemoveALert';
import { DeceasedResponse } from '@/types/deceased-types';
import supabase from '@/supabase-client';
import UpdateDeceasedFormSheet from '@/components/Burial/UpdateDeceasedFormSheet';

function DeceasedActionMenu(props: DeceasedActionMenuProps) {
  const { data } = props;

  const fullname = `${data.firstname} ${data.middlename ?? ''} ${data.lastname}`;

  const [openRemoveAlert, setOpenRemoveAlert] = useState(false);
  const [openUpdateSheet, setOpenUpdateSheet] = useState(false);

  const handleOpenRemoveAlert = () => setOpenRemoveAlert(true);
  const closeOpenRemoveAlert = () => setOpenRemoveAlert(false);

  const handleOpenUpdateSheet = () => setOpenUpdateSheet(true);
  const closeOpenUpdateSheet = () => setOpenUpdateSheet(false);

  const downloadFile = (path: string, fullName: string) => async () => {
    const { data, error } = await supabase.storage.from('docs').download(path.replace('docs/', ''));

    if (error) throw error;

    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fullName}-death-certificate`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-end">
      <RemoveALert id={data.id} name={fullname} open={openRemoveAlert} closeModal={closeOpenRemoveAlert} />
      <UpdateDeceasedFormSheet data={data} open={openUpdateSheet} closeSheet={closeOpenUpdateSheet} />
      <DropdownMenu>
        <DropdownMenuTrigger tabIndex={-1}>
          <BiDotsVerticalRounded />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleOpenUpdateSheet}>
            <AiOutlineEdit />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenRemoveAlert}>
            <AiFillDelete />
            Remove
          </DropdownMenuItem>
          <DropdownMenuItem onClick={downloadFile(data.death_certificate, fullname)}>
            <AiOutlineDownload />
            Download Certificate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

type DeceasedActionMenuProps = {
  data: DeceasedResponse;
};

export default DeceasedActionMenu;
