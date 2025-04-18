import supabaseClient from '@/supabase-client';
import { Session } from '@supabase/supabase-js';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<AuthContextValue>({
  session: null,
});

export function AuthProvider(props: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabaseClient.auth.getSession().then((response) => {
      setSession(response.data.session);
    });

    const { data } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ session }}>{props.children}</AuthContext.Provider>;
}

export type AuthContextValue = {
  session: Session | null;
};
