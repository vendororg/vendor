import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Navigation from "../../components/Navigation";
import { useRouter } from "next/router";

export default function Repos() {
    const router = useRouter();
    const slug = router.query.slug;

    const [item, setItem] = useState({
      name: slug,
      description: "",
      category: "",
      language: "",
      price: 0,
    });

    const putRepo = async () => {
      let { data, error } = await supabase
        .from("repos")
        .upsert([item], { returning: "minimal" });
      if (error) console.log("error", error);
      else console.log("data", data);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      putRepo();
      router.push("/"); 
    };

    return (
      <div>
        <Navigation />
        <div className="mx-auto max-w-4xl m-10 bg-zinc-900 rounded-md p-7">
          <h1 className="text-3xl font-bold text-white mb-3">{slug}</h1>
          <form>
            <div className="flex flex-col mb-3">
              <label className="text-white">Description</label>
              <textarea
                className="border border-zinc-800 bg-zinc-700 rounded-md p-2"
                type="text"
                value={item.description}
                onChange={(e) =>
                  setItem({ ...item, description: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col mb-3">
              <label className="text-white">Category</label>
              <input
                className="border border-zinc-800 bg-zinc-700 rounded-md p-2"
                type="text"
                value={item.category}
                onChange={(e) => setItem({ ...item, category: e.target.value })}
              />
            </div>
            <div className="flex flex-col mb-3">
              <label className="text-white">Language</label>
              <input
                className="border border-zinc-800 bg-zinc-700 rounded-md p-2"
                type="text"
                value={item.language}
                onChange={(e) => setItem({ ...item, language: e.target.value })}
              />
            </div>
            <div className="flex flex-col mb-3">
              <label className="text-white">Price</label>
              {/* currency you want to sell it for. */}
              <div className="flex w-0 flex-1 items-center">
                <p className="font-medium text-amber-500 hover:text-slate-500 mr-4">
                  £
                </p>
                <input
                  className="border  border-zinc-800 bg-zinc-700 rounded-md p-2"
                  type="integer"
                  value={item.price}
                  onChange={(e) => setItem({ ...item, price: e.target.value })}
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
          <div></div>
        </div>
      </div>
    );
}