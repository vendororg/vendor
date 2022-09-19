import { supabase } from '../utils/supabaseClient'
import Link from 'next/link';

export default function Account({ session, children }) {
    return (
        <div>
            {console.log(session)}
            <div className="flex-1 flex justify-end sm:mx-auto sm:flex sm:items-center sm:justify-between">
                <img
                    src={session.user.user_metadata.avatar_url}
                    alt="Github Avatar"
                    className="h-16 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                /> 
                <button className="bg-sky-500 hover:bg-gray-100 text-ink-500 font-semibold hover:text-gray-700 py-2 px-4 rounded" onClick={() => supabase.auth.signOut()}>
                    Sign Out
                </button>
            </div>     
            <div className="mt-6 block bg-amber-500 hover:bg-gray-100 text-ink-400 uppercase rounded-md font-bold hover:text-gray-700 text-center px-1 py-3">
                <Link  href="/r">
                    Sell Your Project
                </Link>
            </div>
            {children}
        </div>
    )
}

