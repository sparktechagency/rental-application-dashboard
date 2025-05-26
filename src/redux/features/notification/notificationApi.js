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
          url: `/notification/admin-notifications`,
          method: "GET",
          params: params.toString(),
        };
      },
      transformResponse: (response) => response?.data?.attributes,
      providesTags: ["Notification"],
    }),
    getSingleNotification: build.query({
      query: (id) => ({
        url: `/notification/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
      providesTags: ["Notification"],
    }),
    getUnviewNotifications: build.query({
      query: () => ({
        url: `/notification/unview-notification-count`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
      providesTags: ["Notification"],
    }),
    viewAllNotification: build.mutation({
      query: () => ({
        url: `/notification/view-all-notifications`,
        method: "POST",
      }),
      transformResponse: (response) => response?.data?.attributes,
      invalidatesTags: ["Notification"],
    }),
    clearAllNotification: build.mutation({
      query: () => ({
        url: `/notification/clear-all-notifications`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetAdminNotificationQuery,
  useGetSingleNotificationQuery,
  useGetUnviewNotificationsQuery,
  useViewAllNotificationMutation,
  useClearAllNotificationMutation,
} = notificationApi;
