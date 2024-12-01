import { queryClientGetData } from '@/utils/query-client';
import getCryptListByTypeQuery from '@/queries/getCryptListByTypeQuery';
import { CryptType } from '@/types/crypt-types';

const pageLoader = async () => await queryClientGetData(getCryptListByTypeQuery(CryptType.COFFIN));

export default pageLoader;
