import { getAllBooks, getAllQuotes } from "../supabase/client";
import { AllBooks, AllQuotes } from "../supabase/types";
import Feed from "./components/Feed";

export default async function Page() {
  const quotes = await getAllQuotes();
  const books = await getAllBooks();

  if (!quotes) return <></>;

  return <Feed quotes={quotes as AllQuotes[]} books={books as AllBooks[]} />;
}
