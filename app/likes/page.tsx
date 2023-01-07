import supabaseServer, { getLikedQuotesIds } from "../../supabase/server";
import { AllQuotes } from "../../supabase/types";
import { Feed } from "../components/shared/Feed";

export default async function Page() {
  const supabase = supabaseServer();

  const likedQuotesIds = await getLikedQuotesIds();

  const { data: quotes, error: quotesError } = await supabase
    .from("all_quotes")
    .select("id, quote, likes, shares, all_books(title)")
    .in("id", likedQuotesIds);

  if (!true) return <></>;

  return (
    <section aria-label="All quotes">
      <h1 className="text-lg font-bold text-slate-700">Liked quotes</h1>
      {/* @ts-expect-error Server Component */}
      <Feed quotes={quotes as AllQuotes[]} />
    </section>
  );
}
