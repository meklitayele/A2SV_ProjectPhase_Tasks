"use client";

import React, { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from "@/app/services/apiServices";

type Props = {
  eventId: string;
  initialBookmarked: boolean;
};

const BookmarkButton = ({ eventId, initialBookmarked }: Props) => {
  const { data: session, status } = useSession();
  const accessToken = session?.user?.data?.accessToken;
  const isLoggedIn = status === "authenticated" && !!accessToken;

  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isLoggedIn) {
      alert("You must be logged in to bookmark");
      return;
    }

    try {
      if (isBookmarked) {
        await removeBookmark(eventId).unwrap();
        setIsBookmarked(false);
      } else {
        await addBookmark(eventId).unwrap();
        setIsBookmarked(true);
      }
    } catch (err) {
      alert("Failed to update bookmark. Please try again.");
      console.error("Bookmark error:", err);
    }
  };

  return (
    <button
      onClick={handleBookmarkClick}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      className={`absolute top-4 right-4 transition z-10 p-1 ${
        isBookmarked
          ? "text-yellow-400 border-blue-900 bg-yellow-100"
          : "text-gray-800 border-blue-900 hover:text-blue-600 hover:border-blue-600 bg-white"
      }`}
      data-testid="bookmark-button"
    >
      {isBookmarked ? <BookmarkCheck size={22} /> : <Bookmark size={22} />}
    </button>
  );
};

export default BookmarkButton;
