import { queryClientGetData } from '@/utils/query-client';
import getCryptListQuery from '@/queries/getCryptListQuery';
import getCryptSlotByTypeQuery from '@/queries/getCryptSlotByTypeQuery';
import { CryptType } from '@/types/crypt-types';

const pageLoader = async () => {
  return {
    initialCryptList: await queryClientGetData(getCryptListQuery()),
    initialLawnSlot: await queryClientGetData(getCryptSlotByTypeQuery(CryptType.LAWN)),
  };
};

export default pageLoader;
