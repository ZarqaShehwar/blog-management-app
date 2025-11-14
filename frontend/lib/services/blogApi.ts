import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',

  }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/api/v1/blogs",
      providesTags: ["Blog"],
    }),
    getBlogById: builder.query({
      query: (id) => `/api/v1/blogs/${id}`,
      providesTags: ["Blog"],
    }),

      getBlogByUser: builder.query({
      query: () => `/api/v1/blogs/user-blogs`,
      providesTags: ["Blog"],
    }),

    addBlog: builder.mutation({
      query: (newBlog) => ({
        url: "/api/v1/blogs",
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ["Blog"],
    }),

 deleteBlogs: builder.mutation({
  query: (ids: string[]) => ({
    url: `/api/v1/blogs/delete-multiple`, // a new backend route
    method: "DELETE",
    body: { ids },
  }),
  invalidatesTags: ["Blog"],
}),

    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/blogs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blog"], 
    }),

  }),
})

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useAddBlogMutation,
  useDeleteBlogsMutation,
  useUpdateBlogMutation,
  useGetBlogByUserQuery
} = blogApi
