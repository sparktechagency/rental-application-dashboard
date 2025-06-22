import { baseApi } from "../../baseApi/baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEarnings: builder.query({
      query: () => ({
        url: "/payment/history",
        method: "GET",
      }),
    }),
    getEarningGraphCharts: builder.query({
      query: ({ period, year, month }) => ({
        url: "/dashboard/earningChart",
        method: "GET",
        params: { period, year, month },
      }),
    }),
  }),
});

export const { useGetAllEarningsQuery, useGetEarningGraphChartsQuery } =
  earningApi;
