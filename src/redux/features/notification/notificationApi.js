import { baseApi } from "../../baseApi/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminNotification: build.query({
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
          url: `/notification`,
          method: "GET",
          params: params.toString(),
        };
      },
      transformResponse: (response) => response?.data,
      providesTags: ["Notification"],
    })
  }),
});

export const {
  useGetAdminNotificationQuery
} = notificationApi;
