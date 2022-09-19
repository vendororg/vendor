import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Link from "next/link";

export default function List({ session, children }) {
    const [repos, setRepos] = useState(null);

    const config = useMemo(() => {
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
            <div className="mx-auto max-w-7xl m-10 bg-zinc-900 rounded-md p-7">
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
                                className={`${index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-800"
                                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-zinc-700 cursor-pointer`}
                            >
                                
                                <Link href={`/r/${repo.name}`}>
                                    <dt className="text-sm font-medium text-gray-200">
                                        {repo.name}
                                    </dt>
                                </Link>
                                <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
                                    {repo.private ? ( "private" ) : ( "public" ) }
                                </dd>
                                
                        </div>
                    ))}
                </div>
            </div>
            {children}
        </div>
    );
}