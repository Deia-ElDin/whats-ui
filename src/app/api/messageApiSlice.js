import { apiSlice } from './apislice';

const MESSAGE_URL = 'api/v1/message';

const messageApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    // getCurrentRoomMessages: builder.query({
    //   query: (roomId) => `${MESSAGE_URL}/all/${roomId}`,
    //   providesTags: ['Messages'],
    // }),

    getPrevMessages: builder.query({
      query: (queryURL) => `${MESSAGE_URL}/prev?${queryURL}`,
      providesTags: ['Messages'],
    }),

    getLastMessage: builder.query({
      query: (roomId) => `${MESSAGE_URL}/last/${roomId}`,
    }),

    createMessage: builder.mutation({
      query: (message) => ({
        url: `${MESSAGE_URL}`,
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const {
  // useGetCurrentRoomMessagesQuery,
  useGetPrevMessagesQuery,
  useGetLastMessageQuery,
  useCreateMessageMutation,
} = messageApiSlice;
