import { baseApi } from "../../baseApi/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page = 1, limit = 10, filters }) => {
        const params = new URLSearchParams();
        // Add page and limit to params
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        // Add any filters like name and email
        if (filters) {
          filters.forEach((item) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/user/admin-get-users",
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response?.data,
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["User"],
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response?.data,
      invalidatesTags: ["User"],
    }),
    getUserAnalytics: builder.query({
      query: ({ period, year, month }) => ({
        url: "/user/get-user-analytics",
        method: "GET",
        params: { period, year, month },
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    premiumUser: builder.mutation({
      query: (id) => ({
        url: `/user//premium-user/${id}`,
        method: "PATCH",
      }),
      transformResponse: (response) => response?.data,
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  usePremiumUserMutation,
  useUpdateUserStatusMutation,
  useGetUserAnalyticsQuery,
} = userApi;
