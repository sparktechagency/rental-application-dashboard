import { baseApi } from "../../baseApi/baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/privacy",
        method: "GET",
      }),
      providesTags: ["Settings"],
      transformResponse: (response) => response?.data[0],
    }),
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "/terms",
        method: "GET",
      }),
      providesTags: ["Settings"],
      transformResponse: (response) => response?.data[0],
    }),
    addPrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/privacy/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),
    addTermsAndConditions: builder.mutation({
      query: (data) => ({
        url: "/terms/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  useAddPrivacyPolicyMutation,
  useGetTermsAndConditionsQuery,
  useAddTermsAndConditionsMutation,
  useGetAboutUsQuery,
  useAddAboutUsMutation,
  useGetAdditionalChargeQuery,
  useAddAdditionalChargeMutation,
} = settingsApi;
