import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Navigation from "../../components/Navigation";
import { useRouter } from "next/router";

export default function Repos() {
    const router = useRouter();
    const slug = router.query.slug;


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
              />
            </div>
            <div className="flex flex-col mb-3">
              <label className="text-white">Category</label>
              <input
                className="border border-zinc-800 bg-zinc-700 rounded-md p-2"
                type="text"
              />
            </div>
            <div className="flex flex-col mb-3">
              <label className="text-white">Type</label>
              <input
                className="border border-zinc-800 bg-zinc-700 rounded-md p-2"
                type="text"
              />
            </div>
            <div className="flex flex-col mb-3">
              <label className="text-white">Price</label>
              {/* currency you want to sell it for. */}
              <input
                className="border  border-zinc-800 bg-zinc-700 rounded-md p-2"
                type="text"
              />
            </div>
            {/* submit */}
            <div className="flex flex-col mb-3">
              <button className="bg-zinc-700 rounded-md p-2 hover:bg-slate-500" type="submit">
                Sell
              </button>
            </div>
          </form>
          <div></div>
        </div>
      </div>
    );
}