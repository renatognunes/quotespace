"use client";

import { ArrowUpTrayIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AllQuotes } from "../../../supabase/types";
import { supabase } from "../../../supabase/client";

export const Card = ({
  quote,
  liked,
}: {
  liked?: boolean;
  quote: AllQuotes;
}) => {
  const [isLiked, setIsLiked] = useState(!!liked);
  const [nOfLikes, setNOfLikes] = useState(quote.likes || 0);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
      }
    };
    getUserId();
  }, []);

  const handleLike = useCallback(async () => {
    try {
      if (isLiked) {
        await supabase.from("likes").delete().eq("quote_id", quote.id);
        await supabase
          .from("all_quotes")
          .update({ likes: (quote.likes || 0) + 1 });

        setIsLiked(false);
      } else {
        await supabase
          .from("likes")
          .insert({ quote_id: quote.id, user_id: userId });
        await supabase.from("all_quotes").update({
          likes: quote?.likes !== null && quote.likes > 0 ? quote.likes - 1 : 0,
        });

        setIsLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userId, isLiked, quote]);

  return (
    <article
      className="flex w-full content-center gap-8 rounded-md border p-6"
      key={quote.id}
    >
      <Image
        className="shadow-md"
        width="100"
        height="100"
        src={"/images/alchemist-cover.jpeg"}
        alt="Cover Naval Book"
      />
      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-1 flex-col justify-center">
          <q className="text-lg font-semibold text-slate-700">{quote.quote}</q>
          <p className="text-md text-slate-500">- {quote.all_books.title}</p>
        </div>
        <div className="flex gap-10 self-end">
          <button
            className="flex content-center text-lg text-slate-700"
            aria-label="Like quote"
            onClick={handleLike}
          >
            {isLiked ? (
              <HeartIconSolid className=" mr-2 inline h-6 w-6" color="red" />
            ) : (
              <HeartIcon className="mr-2 inline h-6 w-6" />
            )}
            <span>{nOfLikes}</span>
          </button>
          <button
            className="flex content-center text-lg text-slate-700"
            aria-label="Share quote"
          >
            <ArrowUpTrayIcon className="mr-2 inline h-6 w-6" />
            <span>{quote.shares}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
