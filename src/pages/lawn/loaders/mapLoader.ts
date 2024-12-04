import { queryClientGetData } from '@/utils/query-client';
import { CryptType } from '@/types/crypt-types';
import getCryptSlotByTypeQuery from '@/queries/getCryptSlotByTypeQuery';

const mapLoader = async () => await queryClientGetData(getCryptSlotByTypeQuery(CryptType.LAWN));

export default mapLoader;
