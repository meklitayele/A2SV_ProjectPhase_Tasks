"use client";

import React from "react";
import { useGetBookmarksQuery } from "@/app/services/apiServices";
import JobCard from "../component/jobcard";
import { JobType } from "../joblist";
import { BookmarkMinus } from "lucide-react";

const BookmarkedJobs = () => {
  const { data: bookmarksData, error, isLoading } = useGetBookmarksQuery();

  // Use real job data with eventID renamed to id to fit JobCard prop type
  const jobs: JobType[] = (bookmarksData?.data || []).map((job: any) => ({
    ...job,
    id: job.eventID, // map eventID to id
    description: job.description || "", // add fallback for required fields if missing
    categories: job.categories || [],
    location: job.location ? [job.location] : [],
    isBookmarked: true,
    opType: job.opType || "",
    orgName: job.orgName || "",
    logoUrl: job.logoUrl || "",
    title: job.title || "",
  }));

  if (isLoading)
    return (
      <p className="text-3xl font-semibold text-gray-600 animate-pulse mt-20 text-center">
        Loading bookmarked jobs...
      </p>
    );
  if (error) {
    const errorMessage =
      "data" in error && typeof error.data === "string"
        ? error.data
        : "status" in error
        ? `Request failed with status ${error.status}`
        : "Something went wrong. Please try again.";

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <p className="text-4xl font-bold text-red-600 mb-4">
          Oops! Something went wrong.
        </p>
        <p className="text-lg text-red-500 max-w-lg text-center">
          {errorMessage}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }
  if (jobs.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-32 text-gray-600">
        <BookmarkMinus className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No Bookmarked Jobs</h2>
        <p className="text-center max-w-md text-base">
          You haven't bookmarked any jobs yet. Browse job listings and click the
          bookmark icon to save ones you're interested in!
        </p>
      </div>
    );

  return (
    <>
      <h1 className="Maintext text-center mt-10 ">Saved jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} isBookmarked={true} />
        ))}
      </div>
    </>
  );
};

export default BookmarkedJobs;
