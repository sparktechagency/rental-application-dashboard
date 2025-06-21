import { baseApi } from "../../baseApi/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => ({
        url: "/car",
      }),
      providesTags: ["Car"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    addCar: builder.mutation({
      query: (data) => ({
        url: "/car",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Car"],
      transformResponse: (response) => response.data,
    }),
    getSingleCar: builder.query({
      query: (id) => ({
        url: `/car/${id}`,
        method: "GET",
      }),
      providesTags: ["Car"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    updateCar: builder.mutation({
      query: ({ id, data }) => ({
        url: `/car/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Car"],
      transformResponse: (response) => response.data,
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/car/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Car"],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useAddCarMutation,
  useGetSingleCarQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carApi;
