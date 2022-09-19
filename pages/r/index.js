import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Navigation from "../../components/Navigation";
import List from "../../components/List";

export default function repos() {
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
        <List key={session?.user.id}  session={session} />
      </div>
    );
}


{/* <p>
  Choose the repository you want to link to your site on Netlify. When you push
  to Git, then place your price of choice on our servers and see the result on
  te dashboard.
</p>; */}