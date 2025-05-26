import { baseApi } from "../../baseApi/baseApi";

const dealApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDeals: builder.query({
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
          url: `/deals`,
          method: "GET",
          params: params.toString(),
        };
      },
      providesTags: ["Deals"],
    }),
    getSingleDeal: builder.query({
      query: (id) => ({
        url: `/deals/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Deals", id }],
    }),
    addDeal: builder.mutation({
      query: (data) => ({
        url: "/deals",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Deals"],
    }),
    updateDeal: builder.mutation({
      query: ({ id, data }) => ({
        url: `/deals/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Deals"],
    }),
    deleteDeal: builder.mutation({
      query: (id) => ({
        url: `/deals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Deals"],
    }),
  }),
});

export const {
  useGetDealsQuery,
  useGetSingleDealQuery,
  useAddDealMutation,
  useUpdateDealMutation,
  useDeleteDealMutation,
} = dealApi;
