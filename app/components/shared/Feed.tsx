import { getLikedQuotesIds } from "../../../supabase/server";
import { AllQuotes } from "../../../supabase/types";
import { Card } from "./Card";

export const Feed = async ({ quotes }: { quotes: AllQuotes[] }) => {
  const likedQuotesIds = await getLikedQuotesIds();

  return (
    <div className="mt-4 flex flex-col gap-6">
      {quotes.map((quote) => (
        <Card
          key={quote.id}
          quote={quote}
          isLiked={!!likedQuotesIds?.includes(quote.id)}
        />
      ))}
    </div>
  );
};
