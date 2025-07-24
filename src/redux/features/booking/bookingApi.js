import { baseApi } from "../../baseApi/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => ({
        url: "/booking/all",
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    addManualBooking: builder.mutation({
      query: (data) => ({
        url: "/booking/manual",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ManualBookings"],
    }),
    getManualBookings: builder.query({
      query: () => ({
        url: "/booking/manual",
        method: "GET",
      }),
      providesTags: ["ManualBookings"],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useAddManualBookingMutation,
  useGetManualBookingsQuery,
} = bookingApi;
