import React from "react";
// import { getAllBooks, getAllQuotes } from "../../supabase/client";
import supabaseServer from "../../supabase/server";
import { Feed } from "./shared/Feed";
import { HomeHeader } from "./shared/HomeHeader";

export default async function HomeFeed() {
  const supabase = supabaseServer();
  const { data: quotes, quotesError } = await supabase
    .from("all_quotes")
    .select("id, quote, likes, shares, all_books(title)");
  const { data: books, booksError } = await supabase
    .from("all_books")
    .select("id, title");

  return (
    <section aria-label="All quotes">
      <HomeHeader books={books} />
      {/* @ts-expect-error Server Component */}
      <Feed quotes={quotes} />
    </section>
  );
}
