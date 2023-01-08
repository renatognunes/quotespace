"use client";

import { ArrowUpTrayIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AllQuotes } from "../../../supabase/types";
import { supabase } from "../../../supabase/client";

export const Card = ({
  quote,
  isLiked,
}: {
  isLiked: boolean;
  quote: AllQuotes;
}) => {
  const [like, setLike] = useState(!!isLiked);
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
      if (like) {
        await supabase.from("likes").delete().eq("quote_id", quote.id);
        await supabase
          .from("all_quotes")
          .update({
            likes: nOfLikes - 1,
          })
          .eq("id", quote.id);

        setLike(false);
        setNOfLikes((n) => --n);
      } else {
        await supabase
          .from("likes")
          .insert({ quote_id: quote.id, user_id: userId });
        await supabase
          .from("all_quotes")
          .update({
            likes: nOfLikes + 1,
          })
          .eq("id", quote.id);

        setLike(true);
        setNOfLikes((n) => ++n);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userId, like, quote, nOfLikes]);

  return (
    <article
      className="flex w-full content-center gap-8 rounded-md border p-6"
      key={quote.id}
    >
      <Image
        className="shadow-md"
        width="100"
        height="100"
        src={`/images/${quote.all_books.cover_image}-cover.jpeg`}
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
            {like ? (
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
          </button>
        </div>
      </div>
    </article>
  );
};
