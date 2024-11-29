import { queryClientGetData } from '@/utils/query-client';
import getCryptListQuery from '@/queries/getCryptListQuery';
import { CryptType } from '@/types/crypt-types';

const pageLoader = async () => await queryClientGetData(getCryptListQuery(CryptType.BONE));

export default pageLoader;
