"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AllBooks, AllQuotes } from "../../supabase/types";
import {
  ArrowUpTrayIcon,
  HeartIcon,
  XMarkIcon,
  PencilSquareIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import QuoteForm from "./forms/QuoteForm";
import { supabase } from "../../supabase/client";
import { REALTIME_LISTEN_TYPES } from "@supabase/supabase-js";
import { Feed } from "./shared/Feed";

interface FeedProps {
  quotesServer: AllQuotes[];
  books: AllBooks[];
}

export default function HomeFeed({ quotesServer, books }: FeedProps) {
  const [open, setOpen] = useState(false);
  const [quotes, setQuotes] = useState<AllQuotes[]>([]);

  useEffect(() => {
    setQuotes(quotesServer);
  }, [quotesServer]);

  useEffect(() => {
    const channel = supabase
      .channel("public:all_quotes")
      .on(
        REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
        { event: "INSERT", schema: "public", table: "all_quotes" },
        (payload) =>
          setQuotes((quotes) => [
            { ...payload.new, all_books: { title: "demo" } } as AllQuotes,
            ...quotes,
          ])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [quotesServer]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [open]);

  return (
    <section aria-label="All quotes">
      <div className="flex flex-row content-center justify-between">
        <h1 className="text-lg font-bold text-slate-700">Top Quotes</h1>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center gap-4 rounded-md border bg-lime-600 px-4 py-2 text-md font-semibold text-white"
        >
          Quote
          <PencilSquareIcon className="h-6 w-6 text-white" />
        </button>
      </div>
      {open && (
        <div className="before:fixed before:right-0 before:top-0 before:h-screen before:w-screen before:bg-black before:opacity-50 before:content-['']">
          <article className="fixed right-0 left-0 m-auto max-w-[60rem] rounded-md border bg-zinc-50 p-6 shadow-md">
            <header
              aria-label="New Quote Popup"
              className="mb-6 flex flex-row justify-between"
            >
              <h2 className="text-lg font-semibold text-slate-700">
                New Quote
              </h2>
              <button onClick={() => setOpen(false)}>
                <XMarkIcon className="mr-2 inline h-6 w-6 text-slate-700" />
              </button>
            </header>

            <div className="">
              <QuoteForm setOpen={setOpen} books={books} />
            </div>
          </article>
        </div>
      )}
      <Feed quotes={quotes} />
    </section>
  );
}
