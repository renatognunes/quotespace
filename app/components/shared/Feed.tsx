import { ArrowUpTrayIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import { AllQuotes } from "../../../supabase/types";
import { Card } from "./Card";

export const Feed = ({
  quotes,
  liked,
}: {
  quotes: AllQuotes[];
  liked?: boolean;
}) => {
  return (
    <div className="m-auto mt-4 flex flex-col gap-6">
      {quotes.map((quote) => (
        <Card key={quote.id} quote={quote} liked={liked} />
      ))}
    </div>
  );
};
