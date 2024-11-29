import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export async function queryClientGetData<T, R>(queryObject: QueryObject<T, R>): Promise<R> {
  return queryClient.getQueryData(queryObject.queryKey) ?? (await queryClient.fetchQuery(queryObject));
}

type QueryKey<T> = (string | number | T | undefined)[];

interface QueryObject<T, R> {
  queryKey: QueryKey<T>;
  queryFn: () => Promise<R>;
}

export default queryClient;
