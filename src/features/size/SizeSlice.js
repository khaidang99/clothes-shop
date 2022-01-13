import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookie from 'js-cookie';

const sizeApi = createApi({
  reducerPath: "sizeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      headers.set('Accept', 'application/json')
      const token = Cookie.get('token')

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
  
      return headers
    },
  }),
  tagTypes: ["Size"],
  endpoints: (build) => ({
    size: build.query({
      query: () => ({
        url: '/size',
      }),
      providesTags: ['Size']
    }),
    addSize: build.mutation({
      query: (size) => ({
        url: '/size',
        method: 'POST',
        body: size
      }),
      invalidatesTags: ['Size']
    }),
    updateSize: build.mutation({
      query: ({_id, ...rest}) => ({
        url: `/size/${_id}`,
        method: 'PUT',
        body: rest
      }),
      invalidatesTags: ['Size']
    }),
    deleteSize: build.mutation({
      query: (id) => ({
        url: `/size/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Size']
    }),
  }),
});

export const {
  useSizeQuery,
  useAddSizeMutation,
  useUpdateSizeMutation,
  useDeleteSizeMutation
} = sizeApi;

export default sizeApi;
