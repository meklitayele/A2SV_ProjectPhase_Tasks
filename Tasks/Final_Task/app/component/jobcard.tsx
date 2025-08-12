"use client";

import React from "react";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
const colorClasses = [
  "border-orange-300 text-orange-300",
  "border-indigo-800 text-indigo-800",
  "border-emerald-500 text-teal-500",
  "border-blue-500 text-blue-500",
  "border-pink-500 text-pink-500",
  "border-purple-500 text-purple-500",
  "border-red-500 text-red-500",
];

type SafeJobType = {
  id: string;
  title?: string;
  orgName?: string;
  description?: string;
  logoUrl?: string;
  location?: string | string[];
  categories?: string[];
  opType?: string;
  isBookmarked?: boolean;
};

const JobCard = ({
  id,
  title = "Untitled Job",
  orgName = "Unknown Org",
  description = "No description provided.",
  logoUrl,
  location = "Unknown",
  categories = [],
  opType = "N/A",
  isBookmarked: isBookmarkedProp = false,
}: SafeJobType) => {
  return (
    <div
      className="relative border-1 border-gray-200 rounded-2xl p-7 hover:shadow-lg transition"
      data-testid="job-card"
    >
      {/* Bookmark button */}
      <BookmarkButton eventId={id} initialBookmarked={isBookmarkedProp} />

      {/* Job content wrapped in link */}
      <Link href={`/job/${id}`} className="block">
        <div className="flex justify-between">
          {/* Logo */}
          <div className="mr-5">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${orgName} logo`}
                className="w-16 h-16 object-contain"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded">
                <span className="text-gray-400 text-sm">No Logo</span>
              </div>
            )}
          </div>

          {/* Text info */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-gray-400 pt-2">
              {orgName} .{" "}
              {Array.isArray(location) ? location.join(", ") : location}
            </p>
            <p className="mt-2 text-gray-700 text-sm line-clamp-3">
              {description}
            </p>

            {/* Tags */}
            <ul className="flex gap-2 mt-5 flex-wrap">
              <li className="bg-emerald-50 text-teal-500 rounded-2xl px-2 py-1 text-sm">
                {opType}
              </li>
              <li className="border-l-1 border-l-gray-400 mr-2"></li>
              {(categories || []).map((category, index) => (
                <li
                  key={index}
                  className={`px-2 py-1 text-sm border rounded-2xl min-w-[4rem] text-center ${
                    colorClasses[index % colorClasses.length]
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default JobCard;
