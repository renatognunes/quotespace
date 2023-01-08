"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AllBooks } from "../../../supabase/types";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import QuoteForm from "./../forms/QuoteForm";
import { supabase } from "../../../supabase/client";
// import { supabase } from "../../../supabase/client";
// import { REALTIME_LISTEN_TYPES } from "@supabase/supabase-js";
// import { Feed } from "./../shared/Feed";

export const HomeHeader = ({ books }: { books: AllBooks[] }) => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
      }
    };
    getUserId();
  }, []);
  // const [quotes, setQuotes] = useState<AllQuotes[]>([]);

  // useEffect(() => {
  //   setQuotes(quotesServer);
  // }, [quotesServer]);

  // useEffect(() => {
  //   const channel = supabase
  // 	.channel("public:all_quotes")
  // 	.on(
  // 	  REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
  // 	  { event: "INSERT", schema: "public", table: "all_quotes" },
  // 	  (payload) =>
  // 		setQuotes((quotes) => [
  // 		  { ...payload.new, all_books: { title: "demo" } } as AllQuotes,
  // 		  ...quotes,
  // 		])
  // 	)
  // 	.subscribe();

  //   return () => {
  // 	supabase.removeChannel(channel);
  //   };
  // }, [quotesServer]);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) html.classList.toggle("overflow-hidden", open);
  }, [open]);

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-bold text-white">Top Quotes</h1>
        {userId && (
          <button
            onClick={() => setOpen(!open)}
            className="button-primary flex items-center justify-center gap-2 rounded-full border border-slate-800 px-6 py-2 text-md text-white"
          >
            Quote
            <PencilSquareIcon className="h-5 w-5 text-white" />
          </button>
        )}
      </div>
      {open && (
        <div className="before:fixed before:right-0 before:top-0 before:h-screen before:w-screen before:bg-black before:opacity-60 before:content-['']">
          <article className="fixed right-0 left-0 top-16 m-auto max-w-[60rem] rounded-2xl border border-slate-800 bg-black py-10 px-14 shadow-inner shadow-slate-800">
            <header
              aria-label="New Quote Popup"
              className="mb-6 flex flex-row justify-between text-white"
            >
              <h2 className="text-lg font-semibold">New Quote</h2>
              <button onClick={() => setOpen(false)}>
                <XMarkIcon className="mr-2 inline h-5 w-5" />
              </button>
            </header>
            <QuoteForm setOpen={setOpen} books={books} />
          </article>
        </div>
      )}
    </div>
  );
};
