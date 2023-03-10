"use client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { createNewQuote, supabase } from "../../../supabase/client";
import { AllBooks } from "../../../supabase/types";

interface QuoteFormProps {
  books: AllBooks[];
  setOpen: (open: boolean) => void;
}

export default function QuoteForm({ books, setOpen }: QuoteFormProps) {
  const [text, setText] = useState("");
  const [bookId, setBookId] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) setUser(session.user);
    };

    getUser();
  }, []);

  const handleQuote = useCallback(async () => {
    if (text && bookId && user) {
      await createNewQuote({ quote: text, bookId, userId: user.id });

      setOpen(false);
    }
  }, [setOpen, user, text, bookId]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleQuote();
      }}
      className="flex flex-col gap-6 text-md"
    >
      <label className="flex flex-col font-light text-white">
        Quote
        <textarea
          required
          className="mt-2 rounded-md border border-slate-700 bg-slate-800 px-4 py-2 shadow-sm"
          name="text"
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <label className="flex flex-col font-light text-white">
        From Book
        <select
          required
          defaultValue="-1"
          className="mt-2 rounded-md border border-slate-700 bg-slate-800 px-4 py-2 shadow-sm"
          onChange={(e) => setBookId(e.target.value)}
        >
          <option disabled value="-1">
            Select Book
          </option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
      </label>
      <input
        className="button-primary flex max-w-min cursor-pointer items-center justify-center gap-2 self-end justify-self-end rounded-full border border-slate-800 px-6 py-2 text-md text-white"
        type="submit"
        value="Publish"
      />
    </form>
  );
}
