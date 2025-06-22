import { baseApi } from "../../baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: "/dashboard/overview",
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
    }),
    getIncomeRatio: builder.query({
      query: (year) => ({
        url: `/admin/getIncomeRatio?year=${year}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getUserActivity: builder.query({
      query: (period) => ({
        url: `/admin/users-activity?period=${period}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetIncomeRatioQuery,
  useGetUserActivityQuery,
} = dashboardApi;
