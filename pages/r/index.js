import { useState, useEffect, useMemo } from "react";
import { supabase } from "../../utils/supabaseClient";
import Navigation from "../../components/Navigation";
import axios from "axios";

export default function repos() {
    const [session, setSession] = useState(null);
    const [repos, setRepos] = useState(null);

    useEffect(() => {
        setSession(supabase.auth.session());

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    const config = useMemo( () => {
        return {
            headers: {
                Authorization: `Bearer ${session?.provider_token}`,
                Accept: "application/vnd.github.v3+json",
            },
        }
    });

    useEffect(() => {
        axios
            .get(`https://api.github.com/user/repos`, config)
            .then((response) => {
                setRepos(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [config]);

    return (
      <div>
        <Navigation />
        <div className="mx-auto max-w-7xl m-10 bg-zinc-900 p-7"> 
          <div className="py-5 sm:px-6 flex-1 flex sm:mx-auto sm:flex sm:items-center">
            <img
              src={session?.user.user_metadata.avatar_url}
              alt="Github Avatar"
              className="h-16 p-1 mr-6 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            />
            <h3 className="text-lg font-medium leading-6 text-ink-300">
              {session?.user.user_metadata.user_name}
            </h3>
            
          </div>
          <div className="border-t border-gray-200">
            {repos?.map((repo, index) => (
              <div
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-800"
                } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
              >
                <dt className="text-sm font-medium text-gray-200">
                  {repo.name}
                </dt>
                {repo.private ? (
                  <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
                    Private
                  </dd>
                ) : (
                  <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
                    Public
                  </dd>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}


{/* <p>
  Choose the repository you want to link to your site on Netlify. When you push
  to Git, then place your price of choice on our servers and see the result on
  te dashboard.
</p>; */}