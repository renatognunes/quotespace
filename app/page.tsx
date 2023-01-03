import { getAllBooks, getAllQuotes } from "../supabase/client";
import { AllBooks, AllQuotes } from "../supabase/types";
import HomeFeed from "./components/HomeFeed";

export default async function Page() {
  const quotes = await getAllQuotes();
  const books = await getAllBooks();

  if (!quotes) return <></>;

  return (
    <HomeFeed
      quotesServer={quotes as AllQuotes[]}
      books={books as AllBooks[]}
    />
  );
}
