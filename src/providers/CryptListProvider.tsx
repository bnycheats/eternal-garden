import AddCryptFormSheet from '@/components/Burial/AddCryptFormSheet';
import DeleteCryptAlert from '@/components/Burial/DeleteCryptAlert';
import UpdateCryptFormSheet from '@/components/Burial/UpdateCryptFormSheet';
import { CryptResponse, CryptType } from '@/types/crypt-types';
import { PropsWithChildren, createContext, useState } from 'react';

export const CryptListProviderContext = createContext<CryptListProviderContextValue>({
  handleOpenAddSheet: () => {},
  handleOpenUpdateSheet: () => {},
  handleOpenDeleteModal: () => {},
});

export function CryptListProvider(props: CryptListProviderProps) {
  const { cryptType, children } = props;

  const [openAddSheet, setOpenAddSheet] = useState(false);
  const [openUpdateSheet, setOpenUpdateSheet] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [updateDetails, setUpdateDetails] = useState<CryptResponse | null>(null);
  const [deleteDetails, setDeleteDetails] = useState<CryptResponse | null>(null);

  const handleOpenAddSheet = () => setOpenAddSheet(true);

  const handleOpenUpdateSheet = (details: CryptResponse) => {
    setUpdateDetails(details);
    setOpenUpdateSheet(true);
  };

  const handleOpenDeleteModal = (details: CryptResponse) => {
    setDeleteDetails(details);
    setOpenDeleteModal(true);
  };

  const handleCloseAddSheet = () => setOpenAddSheet(false);

  const handleCloseUpdateSheet = () => {
    setOpenUpdateSheet(false);
    setTimeout(() => setUpdateDetails(null), 300);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setTimeout(() => setDeleteDetails(null), 300);
  };

  return (
    <CryptListProviderContext.Provider value={{ handleOpenAddSheet, handleOpenUpdateSheet, handleOpenDeleteModal }}>
      <AddCryptFormSheet crypt_type={cryptType} open={openAddSheet} closeSheet={handleCloseAddSheet} />
      {deleteDetails && (
        <DeleteCryptAlert
          id={deleteDetails.id}
          cryptType={deleteDetails.crypt_type}
          title={deleteDetails.name}
          open={openDeleteModal}
          closeModal={handleCloseDeleteModal}
        />
      )}
      {updateDetails && (
        <UpdateCryptFormSheet details={updateDetails} open={openUpdateSheet} closeSheet={handleCloseUpdateSheet} />
      )}
      {children}
    </CryptListProviderContext.Provider>
  );
}

export type CryptListProviderContextValue = {
  handleOpenAddSheet: () => void;
  handleOpenUpdateSheet: (details: CryptResponse) => void;
  handleOpenDeleteModal: (details: CryptResponse) => void;
};

type CryptListProviderProps = PropsWithChildren & { cryptType: CryptType };
