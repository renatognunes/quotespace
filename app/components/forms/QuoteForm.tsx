"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { AllBooks } from "../../../supabase/types";

interface QuoteFormProps {
  books: AllBooks[];
}

export default function QuoteForm({ books }: QuoteFormProps) {
  const [text, setText] = useState("");
  const [bookId, setBookId] = useState("");
  const router = useRouter();

  const handleQuote = useCallback(async () => {
    if (text && bookId) {
      console.log(text, bookId);
      //   await signIn({ email: username, password: password });

      // router.push("/");
    }
  }, [text, bookId, router]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleQuote();
      }}
      className="flex flex-col gap-10"
    >
      <label className="flex flex-col">
        Quote
        <textarea
          required
          className="rounded-md border px-4 py-2"
          name="text"
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <label className="flex flex-col">
        From Book
        <select
          required
          defaultValue="-1"
          className="rounded-md border px-4 py-2"
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
        className="mt-12 max-w-min cursor-pointer self-end rounded-lg border bg-lime-600 px-6 py-2 text-white"
        type="submit"
        value="Publish"
      />
    </form>
  );
}
