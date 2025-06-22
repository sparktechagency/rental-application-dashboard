import { baseApi } from "../../baseApi/baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEarnings: builder.query({
      query: () => ({
        url: "/payment/history",
        method: "GET",
      })
    }),
  }),
});

export const { useGetAllEarningsQuery } = earningApi;
