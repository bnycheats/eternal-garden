import { queryClientGetData } from '@/utils/query-client';
import getCryptListByTypeQuery from '@/queries/getCryptListByTypeQuery';
import { CryptType } from '@/types/crypt-types';
import getCryptSlotByTypeQuery from '@/queries/getCryptSlotByTypeQuery';

const listLoader = async () => {
  return {
    initialCrypt: await queryClientGetData(getCryptListByTypeQuery(CryptType.MAUSOLEUM)),
    initialCryptSlot: await queryClientGetData(getCryptSlotByTypeQuery(CryptType.MAUSOLEUM)),
  };
};

export default listLoader;
