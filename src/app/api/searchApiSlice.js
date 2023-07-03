import { apiSlice } from './apislice';

const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findUserInDB: builder.query({
      query: (search) => `api/v1/search?search=${search}`,
    }),
  }),
});

export const { useFindUserInDBQuery } = searchApiSlice;
