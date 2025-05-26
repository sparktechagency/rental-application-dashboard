import { baseApi } from "../../baseApi/baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReports: builder.query({
      query: ({ page,
        limit}) => ({
        url: `/report`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Reports"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    getSingleReport: builder.query({
      query: (id) => ({
        url: `/report/${id}`,
      }),
      providesTags: ["Reports"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    updateReport: builder.mutation({
      query: ({ id, data }) => ({
        url: `/report/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),
    warningMessage: builder.mutation({
      query: (data) => ({
        url: `/report/send-waring-message`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),
    bannedUser: builder.mutation({
      query: (data) => ({
        url: `/report/banned-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),
    unbannedUser: builder.mutation({
      query: (data) => ({
        url: `/report/unbanned-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),
  }),
});

export const {
  useGetAllReportsQuery,
  useGetSingleReportQuery,
  useBannedUserMutation,
  useWarningMessageMutation,
  useUnbannedUserMutation,
  useUpdateReportMutation,
} = reportApi;
