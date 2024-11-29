import { queryClientGetData } from '@/utils/query-client';
import { LoaderFunctionArgs } from 'react-router-dom';
import getCryptQuery from '@/queries/getCryptQuery';
import getCryptSlotQuery from '@/queries/getCryptSlotQuery';

const slotsLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params as { id: string };
  return {
    initialCrypt: await queryClientGetData(getCryptQuery(id)),
    initialCryptSlot: await queryClientGetData(getCryptSlotQuery(id)),
  };
};

export default slotsLoader;
