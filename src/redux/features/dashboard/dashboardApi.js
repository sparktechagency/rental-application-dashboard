import { baseApi } from "../../baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: "/admin/get-dashboard-data",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getIncomeRatio: builder.query({
      query: (year) => ({
        url: `/admin/getIncomeRatio?year=${year}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getEarningGraphCharts: builder.query({
    query: ({ period, year, month }) => ({
        url: "/admin/earning-graph-chart",
        params: { period, year, month },
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
  useGetEarningGraphChartsQuery,
  useGetUserActivityQuery,
} = dashboardApi;
