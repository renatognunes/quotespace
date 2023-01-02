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

interface FeedProps {
  quotesServer: AllQuotes[];
  books: AllBooks[];
}

export default function Feed({ quotesServer, books }: FeedProps) {
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
      <div className="m-auto mt-4 flex flex-col gap-6">
        {quotes.map((quote, idx) => (
          <article
            className="flex w-full content-center gap-8 rounded-md border p-6"
            key={quote.id}
          >
            <Image
              className="shadow-md"
              width="100"
              height="100"
              src={
                idx === 3
                  ? "/images/alchemist-cover.jpeg"
                  : "/images/naval-cover.jpeg"
              }
              alt="Cover Naval Book"
            />
            <div className="flex w-full flex-col justify-between">
              <div className="flex flex-1 flex-col justify-center">
                <q className="text-lg font-semibold text-slate-700">
                  {quote.quote}
                </q>
                <p className="text-md text-slate-500">
                  - {quote.all_books.title}
                </p>
              </div>
              <div className="flex gap-10 self-end">
                <button
                  className="flex content-center text-lg text-slate-700"
                  aria-label="Like quote"
                >
                  <HeartIcon className="mr-2 inline h-6 w-6" />
                  <span>{quote.likes}</span>
                </button>
                <button
                  className="flex content-center text-lg text-slate-700"
                  aria-label="Share quote"
                >
                  <ArrowUpTrayIcon className="mr-2 inline h-6 w-6" />
                  <span>{quote.shares}</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
