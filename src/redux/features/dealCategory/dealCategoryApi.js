import { baseApi } from "../../baseApi/baseApi";

const dealCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDealCategories: builder.query({
      query: ({ page = 1, limit = 10, filters = [] }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (filters.length > 0) {
          filters.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/deals-category`,
          method: "GET",
          params: params.toString(),
        };
      },
      providesTags: ["DealCategory"],
    }),
    addDealCategory: builder.mutation({
      query: (data) => ({
        url: "/deals-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DealCategory"],
    }),
    updateDealCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/deals-category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["DealCategory"],
    }),
    deleteDealCategory: builder.mutation({
      query: (id) => ({
        url: `/deals-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DealCategory"],
    }),
  }),
});

export const {
  useGetDealCategoriesQuery,
  useAddDealCategoryMutation,
  useUpdateDealCategoryMutation,
  useDeleteDealCategoryMutation,
} = dealCategoryApi;
