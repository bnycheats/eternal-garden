import { queryClientGetData } from '@/utils/query-client';
import getCryptListQuery from '@/queries/getCryptListQuery';

const pageLoader = async () => await queryClientGetData(getCryptListQuery());

export default pageLoader;
