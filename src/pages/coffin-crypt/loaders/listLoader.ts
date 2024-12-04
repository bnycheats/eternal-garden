import { queryClientGetData } from '@/utils/query-client';
import getCryptListByTypeQuery from '@/queries/getCryptListByTypeQuery';
import { CryptType } from '@/types/crypt-types';

const listLoader = async () => await queryClientGetData(getCryptListByTypeQuery(CryptType.COFFIN));

export default listLoader;
