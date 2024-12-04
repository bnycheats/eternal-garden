import { Fragment, useState } from 'react';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { useLoaderData, useNavigate } from 'react-router-dom';
import CryptCard from '@/components/Burial/CryptCard';
import { Button } from '@/components/ui/button';
import DeleteCryptAlert from '@/components/Burial/DeleteCryptAlert';
import { CryptSlotResponse, CryptSlotStatus, CryptType, type CryptResponse } from '@/types/crypt-types';
import AddCryptFormSheet from '@/components/Burial/AddCryptFormSheet';
import UpdateCryptFormSheet from '@/components/Burial/UpdateCryptFormSheet';
import getCryptListByTypeQuery from '@/queries/getCryptListByTypeQuery';
import usePrivateHeader from '@/hooks/usePrivateHeader';
import { paths } from '@/navigation/Routes';
import SelectCryptSlotFormSheet from '@/components/Burial/SelectCryptSlotFormSheet';
import getCryptSlotByTypeQuery from '@/queries/getCryptSlotByTypeQuery';
import ViewCryptInfoSheet from '@/components/Burial/ViewCryptInfoSheet';

export { default as loader } from './loaders/listLoader';

export function Component() {
  const navigate = useNavigate();

  const { initialCrypt, initialCryptSlot } = useLoaderData() as {
    initialCrypt: Array<CryptResponse>;
    initialCryptSlot: Array<CryptSlotResponse>;
  };

  const [openAddSheet, setOpenAddSheet] = useState(false);
  const [openUpdateSheet, setOpenUpdateSheet] = useState(false);
  const [openAddCryptSlotSheet, setOpenAddCryptSlotSheet] = useState(false);
  const [openViewClientSheet, setOpenViewClientSheet] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [updateDetails, setUpdateDetails] = useState<CryptResponse | null>(null);
  const [deleteDetails, setDeleteDetails] = useState<CryptResponse | null>(null);
  const [selectedCrypt, setSelectedCrypt] = useState<CryptResponse | null>(null);

  const { data: cryptList } = useQuery({
    ...getCryptListByTypeQuery(CryptType.MAUSOLEUM),
    initialData: initialCrypt,
  });

  const { data: cryptSlots } = useQuery({
    ...getCryptSlotByTypeQuery(CryptType.MAUSOLEUM),
    initialData: initialCryptSlot,
  });

  const handleRemove = (details: CryptResponse) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDeleteModal(true);
    setDeleteDetails(details);
  };

  const handleEdit = (details: CryptResponse) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenUpdateSheet(true);
    setUpdateDetails(details);
  };

  const handleOpenAddSheet = () => setOpenAddSheet(true);

  const handleViewClient = (details: CryptResponse) => () => {
    setOpenViewClientSheet(true);
    setSelectedCrypt(details);
  };

  const handleSelectClient = (details: CryptResponse) => () => {
    setOpenAddCryptSlotSheet(true);
    setSelectedCrypt(details);
  };

  const closeSelectClientSheet = () => {
    setOpenAddCryptSlotSheet(false);
    setTimeout(() => setSelectedCrypt(null), 300);
  };

  const closeViewClientSheet = () => {
    setOpenViewClientSheet(false);
    setTimeout(() => setSelectedCrypt(null), 300);
  };

  const closeAddSheet = () => setOpenAddSheet(false);

  const closeUpdateSheet = () => {
    setOpenUpdateSheet(false);
    setUpdateDetails(null);
  };

  const closeDeleteModal = () => setOpenDeleteModal(false);

  usePrivateHeader({
    title: 'Mausoleum List',
    showBack: true,
    extra: (
      <div className="flex justify-center gap-2">
        <Button size="sm" variant="outline" onClick={() => navigate(paths.authenticated.MAUSOLEUM_MAP)}>
          Open Map
        </Button>
        <Button size="sm" onClick={handleOpenAddSheet}>
          Add Mausoleum
        </Button>
      </div>
    ),
  });

  return (
    <Fragment>
      <AddCryptFormSheet crypt_type={CryptType.MAUSOLEUM} open={openAddSheet} closeSheet={closeAddSheet} />
      {updateDetails && (
        <UpdateCryptFormSheet details={updateDetails} open={openUpdateSheet} closeSheet={closeUpdateSheet} />
      )}
      {selectedCrypt && (
        <ViewCryptInfoSheet
          header={selectedCrypt.name}
          info={cryptSlots?.find((slot) => slot.crypt_id === selectedCrypt.id) ?? null}
          open={openViewClientSheet}
          closeSheet={closeViewClientSheet}
        />
      )}
      {selectedCrypt && (
        <SelectCryptSlotFormSheet
          header={selectedCrypt.name}
          invalidateQueries={['getCryptSlotByType', selectedCrypt.crypt_type] as unknown as Array<QueryKey>}
          slotDetails={{
            crypt_id: selectedCrypt.id,
            occupied_by: null,
            crypt_type: CryptType.MAUSOLEUM,
            row: null,
            column: null,
            lon: null,
            lat: null,
            status: CryptSlotStatus.OCCUPIED,
            angle: null,
            length: null,
            face: null,
            slot: null,
            width: null,
          }}
          open={openAddCryptSlotSheet}
          closeSheet={closeSelectClientSheet}
        />
      )}
      <DeleteCryptAlert
        id={deleteDetails?.id ?? ''}
        cryptType={deleteDetails?.crypt_type}
        title={deleteDetails?.name ?? ''}
        open={openDeleteModal}
        closeModal={closeDeleteModal}
      />
      {!cryptList || cryptList.length === 0 ? (
        <div className="mt-20 text-center">No data found</div>
      ) : (
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {cryptList?.map((item, index) => {
            const isOccupied = cryptSlots?.map((slot) => slot.crypt_id)?.includes(item?.id ?? '');
            return (
              <CryptCard
                key={index}
                bgColor="bg-meta-3"
                title={item.name}
                desc="Mausoleum"
                handleNavigate={isOccupied ? handleViewClient(item) : undefined}
                handleSelectClient={isOccupied ? undefined : handleSelectClient(item)}
                handleRemove={handleRemove(item)}
                handleEdit={handleEdit(item)}
              />
            );
          })}
        </div>
      )}
    </Fragment>
  );
}
