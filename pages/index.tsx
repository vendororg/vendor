import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Account from "../components/Account";
import Navigation from '../components/Navigation';
import React from 'react';
import { AuthSession } from "@supabase/supabase-js";

export default function Home() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [repos, setRepos] = useState(null)
  const [currency, setCurrency] = useState(null);

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
        <section className="container max-w-6xl mx-auto flex flex-col md:flex-row">
          <section className="masthead pt-6 border-r border-gray-400 px-6 text-vanilla-300 flex-none w-full md:max-w-md">
            <div className="border border-gray-400 rounded p-5">
              {!session ? (
                <Auth />
              ) : (
                <Account key={session.user.id} session={session}>
                  <div className="flex flex-col">
                    <select
                      className="border border-zinc-800 bg-zinc-700 rounded-md p-2 mt-1"
                      value={currency}
                      onChange={(e) =>
                        setCurrency(e.target.value)
                      }
                    >
                      <option value="">EMPTY</option>
                      <option value="USD">$</option>
                      <option value="EUR">€</option>
                      <option value="GBP">£</option>
                    </select>
                  </div>
                </Account>
              )}
            </div>
          </section>
          <div className="p-4 w-full">
            {repos?.map((repo) => (
              <div className="border border-gray-400 rounded p-5 mb-4">
                <h1 className="text-2xl font-bold">{repo.name}</h1>
                <p className="text-gray-400">{repo.description}</p>
                <div className="flex-1 flex justify-end sm:mx-auto sm:flex sm:items-center sm:justify-between mt-3">
                  <a href={repo.link}>
                    <div className="rounded-full bg-neutral-400">
                      <svg
                        className="w-11 h-11 mt-1"
                        fill="#d9d1c4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                  </a>
                  <div className="rounded-full ring-2 dark:ring-gray-500 px-3 py-2">
                    {/* check currency from database and check floating point */}
                    <p className="text-gray-400">
                      {repo.price.toFixed(2)} {repo.currency}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
