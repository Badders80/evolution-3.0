'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import type { SupabaseClient, Session } from '@supabase/supabase-js';
import type { Database } from '@/lib/database.types';

type SupabaseContext = {
  supabase: ReturnType<typeof createClientComponentClient<Database>>;
  session: Session | null;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    // Get the initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      router.refresh();
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase, session }}>
      {children}
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }
  return context;
};

export const useSession = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSession must be used inside SupabaseProvider');
  }
  return context.session;
};
