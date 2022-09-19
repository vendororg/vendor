import Head from 'next/head'
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Account from "../components/Account";
import Navigation from '../components/Navigation';

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <Navigation />
      <section className="masthead pt-6 border-r border-gray-400 px-6 text-vanilla-300 flex-none w-full md:max-w-md">
        <div className="border border-gray-400 rounded p-5">
          {!session ? (
            <Auth />
          ) : (
            <Account key={session.user.id} session={session} />
          )}
        </div>
      </section>
    </div>
  );
}
