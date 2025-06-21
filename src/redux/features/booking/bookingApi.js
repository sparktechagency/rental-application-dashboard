import { baseApi } from "../../baseApi/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => ({
        url: "/booking/all",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBookingsQuery } = bookingApi;