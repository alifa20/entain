import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "@/types/races";
import { setLastChecked } from "../store/metadataSlice";
import { getSampleRacesData } from "@/__fixtures__/sample-races";

const API_BASE_URL = "https://api.neds.com.au/rest/v1";
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Races"],
  endpoints: (builder) => ({
    getNextRaces: builder.query<
      ApiResponse,
      { count: number; categoryId?: string | null }
    >({
      ...(USE_MOCK_DATA
        ? {
            queryFn: async () => {
              await new Promise((resolve) => setTimeout(resolve, 300));
              return { data: getSampleRacesData() };
            },
          }
        : {
            query: ({ count, categoryId }) => {
              const params = new URLSearchParams({
                method: "nextraces",
                count: String(count),
              });

              if (categoryId) {
                params.append("id", categoryId);
              }

              return `/racing/?${params.toString()}`;
            },
          }),
      providesTags: ["Races"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (!!data) {
            dispatch(setLastChecked(Date.now()));
          }
        } catch (error) {
          console.error("Failed to fetch next races:", error);
        }
      },
    }),
  }),
});

export const { useGetNextRacesQuery } = api;
