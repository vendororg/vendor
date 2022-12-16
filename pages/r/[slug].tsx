import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Navigation from "../../components/Navigation";
import { useRouter } from "next/router";
import React from "react";

interface Item {
  name: string;
  description: string;
  link: string;
  price: string;
}

export default function Repos() {
  const router = useRouter();
  const slug = router.query.slug;

  const [session, setSession] = useState(null);
  const [item, setItem] = useState<Item>({
    name: "",
    description: "",
    link: "",
    price: "",
  });

  useEffect(() => {
    setSession(supabase.auth.session());
    

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
    });
    
    
  }, []);

  const putRepo = async () => {
    let { data, error } = await supabase
      .from("repos")
      .upsert([item], { returning: "minimal" });
    if (error) console.log("error", error);
    else console.log("data", data);
  };

  const handleSubmit = (e) => {
    setItem({
      ...item,
      link: `https://www.github.com/${session?.user.user_metadata.user_name}/${slug}`,
      name: `${session?.user.user_metadata.user_name}/${slug}`,
    });
    e.preventDefault();
    if (item.name && item.description && item.link && item.price) {
      putRepo();
      router.push("/");
    }
  };

  return (
    <div>
      <Navigation />
      <div className="mx-auto max-w-4xl m-10 bg-zinc-900 rounded-md p-7">
        <h1 className="text-3xl font-bold text-white mb-3">
          {session?.user.user_metadata.user_name}/{slug}
        </h1>
        <form>
          <div className="flex flex-col mb-3">
            <label className="text-white">Description</label>
            <textarea
              className="border border-zinc-800 bg-zinc-700 rounded-md p-2"
              value={item.description}
              onChange={(e) =>
                setItem({ ...item, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mb-3">
            <label className="text-white">Price</label>
            <div className="flex w-0 flex-1 items-center">
              <input
                className="border border-zinc-800 bg-zinc-700 rounded-md p-2"
                type="number"
                value={item.price}
                onChange={(e) => setItem(
                  { ...item, price: e.target.value })
                }
              />
            </div>
          </div>
          {/* submit */}
          <div className="flex flex-col mb-3">
            <button
              className="bg-zinc-700 rounded-md p-2 hover:bg-slate-500"
              type="submit"
              onClick={handleSubmit}
            >
              Sell
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}