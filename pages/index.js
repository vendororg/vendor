import Head from 'next/head'
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Account from "../components/Account";
import Navigation from '../components/Navigation';

export default function Home() {
  const [session, setSession] = useState(null);
  const [repos, setRepos] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    getRepos();
  }, []);

  const getRepos = async () => {
    let { data: repos, error } = await supabase
      .from("repos")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.log("error", error);
    else setRepos(repos);
  };


  return (
    <div>
      <Navigation />
      <main className="flex flex-1">
        <section className='container max-w-6xl mx-auto flex flex-col md:flex-row'>
          <section className="masthead pt-6 border-r border-gray-400 px-6 text-vanilla-300 flex-none w-full md:max-w-md">
            <div className="border border-gray-400 rounded p-5">
              {!session ? (
                <Auth />
              ) : (
                <Account key={session.user.id} session={session} />
              )}
            </div>
          </section>
          <div className="p-4 w-full">
            {repos?.map((repo) => (
              <div className="border border-gray-400 rounded p-5 mb-4">
                <h1 className="text-2xl font-bold">{repo.name}</h1>
                <p className="text-gray-400">{repo.description}</p>
                <p className="text-gray-400">{repo.category}</p>
                <p className="text-gray-400">{repo.language}</p>
                <p className="text-gray-400">{repo.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
