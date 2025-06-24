import { baseApi } from "../../baseApi/baseApi";

const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addEmployee: builder.mutation({
      query: (data) => ({
        url: "/employee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
    getAllEmployees: builder.query({
      query: ({ page, limit }) => ({
        url: "/employee",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Employee"],
    }),
    editEmployee: builder.mutation({
      query: ({ id, data }) => ({
        url: `/employee/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
    getEmployee: builder.query({
      query: (id) => ({
        url: `/employee/${id}`,
      }),
      providesTags: ["Employee"],
      transformResponse: (response) => response?.data,
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useAddEmployeeMutation,
  useGetAllEmployeesQuery,
  useEditEmployeeMutation,
  useGetEmployeeQuery,
  useDeleteEmployeeMutation,
} = employeeApi;
