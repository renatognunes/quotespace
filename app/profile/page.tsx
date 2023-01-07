import { getAllQuotes, getUserQuotes } from "../../supabase/client";
import supabaseServer from "../../supabase/server";
import { AllQuotes } from "../../supabase/types";
import { Feed } from "../components/shared/Feed";

export default async function Page() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const quotes = await getUserQuotes(user?.id);

  if (!quotes) return <></>;

  return (
    <section aria-label="All quotes">
      <h1 className="text-lg font-bold text-slate-700">My quotes</h1>
      {/* @ts-expect-error Server Component */}
      <Feed quotes={quotes as AllQuotes[]} />
    </section>
  );
}
