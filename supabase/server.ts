import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./types";

const supabaseServer = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

export const getLikedQuotesIds = async () => {
  const { data: quotesIds, error: likesError } = await supabaseServer()
    .from("likes")
    .select("quote_id");

  return (
    quotesIds
      ?.map((quote) => quote.quote_id)
      .filter((id): id is number => !Number.isNaN(id)) || []
  );
};

export default supabaseServer;
