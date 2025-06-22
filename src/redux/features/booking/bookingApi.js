import { baseApi } from "../../baseApi/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => ({
        url: "/booking/all",
        method: "GET",
      }),
    }),
    addManualBooking: builder.mutation({
      query: (data) => ({
        url: "/booking/manual",
        method: "POST",
        body: data,
      }),
    }),
    getManualBookings: builder.query({
      query: () => ({
        url: "/booking/manual",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useAddManualBookingMutation,
  useGetManualBookingsQuery,
} = bookingApi;
