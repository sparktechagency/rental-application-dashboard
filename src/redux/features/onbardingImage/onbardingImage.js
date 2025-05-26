import { baseApi } from "../../baseApi/baseApi";

const onbardingImageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOnbardingImage: builder.mutation({
      query: (data) => ({
        url: "/onboarding-image",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OnbardingImage"],
    }),
    getOnbardingImage: builder.query({
      query: () => "/onboarding-image",
      providesTags: ["OnbardingImage"],
    }),
    deleteOnbardingImage: builder.mutation({
      query: (id) => ({
        url: `/onboarding-image/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OnbardingImage"],
    }),
  }),
});

export const {
  useAddOnbardingImageMutation,
  useGetOnbardingImageQuery,
  useDeleteOnbardingImageMutation,
} = onbardingImageApi;
