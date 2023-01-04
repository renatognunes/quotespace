import { getUserLikedQuotes } from "../../supabase/client";
import supabaseServer from "../../supabase/server";
import { AllQuotes } from "../../supabase/types";
import { Feed } from "../components/shared/Feed";

export default async function Page() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: quotes, error } = await supabase
    .from("likes")
    .select("all_quotes(id, quote, likes, shares, all_books(title))");

  if (!quotes) return <></>;

  return (
    <section aria-label="All quotes">
      <h1 className="text-lg font-bold text-slate-700">My quotes</h1>
      <Feed
        quotes={quotes.map((quote) => ({ ...quote.all_quotes })) as AllQuotes[]}
      />
    </section>
  );
}
