import { ArrowUpTrayIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import { AllQuotes } from "../../../supabase/types";

export const Feed = ({ quotes }: { quotes: AllQuotes[] }) => {
  return (
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
  );
};
