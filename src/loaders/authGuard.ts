import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import supabase from '@/supabase-client';
import { paths } from '@/navigation/Routes';

export async function authGuard({ request }: LoaderFunctionArgs) {
  const { data, error } = await supabase.auth.getSession();
  const pathname = new URL(request.url).pathname;

  if (error || !data.session) {
    if (Object.values(paths.public).includes(pathname)) return null;
    return redirect(paths.public.LOGIN);
  }

  if (Object.values(paths.authenticated).includes(pathname)) return null;
  return redirect(paths.authenticated.DASHBOARD);
}

export default authGuard;
