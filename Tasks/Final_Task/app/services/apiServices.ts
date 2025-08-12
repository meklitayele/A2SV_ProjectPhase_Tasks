// services/apiServices.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const jobsApi = createApi({
  reducerPath: "jobs",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://akil-backend.onrender.com/",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.user?.data?.accessToken) {
        headers.set(
          "Authorization",
          `Bearer ${session?.user?.data?.accessToken}`
        );
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Jobs
    getAllJobs: builder.query<any, void>({
      query: () => "/opportunities/search",
    }),
    getJobsById: builder.query<any, string>({
      query: (id: string) => `/opportunities/${id}`,
    }),

    // Bookmarks
    getBookmarks: builder.query<any, void>({
      query: () => "/bookmarks",
    }),
    addBookmark: builder.mutation<any, string>({
      query: (eventID) => ({
        url: `/bookmarks/${eventID}`,
        method: "POST",
      }),
    }),
    removeBookmark: builder.mutation<any, string>({
      query: (eventID) => ({
        url: `/bookmarks/${eventID}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetJobsByIdQuery,
  useGetBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} = jobsApi;
