import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Navigation from "../../components/Navigation";
import List from "../../components/List";
import React from "react";

type Props = {
  session: any;
};

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
        <List key={session?.user.id} session={session} children />
      </div>
    );
}