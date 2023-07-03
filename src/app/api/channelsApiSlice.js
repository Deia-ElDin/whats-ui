import { apiSlice } from './apislice';

// getChannelList, createChannelList, updateChannel, deleteChannel

const CHANNELS_URL = '/api/v1/channels';

const channelsApiSlice = apiSlice.injectEndpoints({
  tagType: ['Channels'],
  endpoints: (builder) => ({
    getChannelList: builder.query({
      query: (userId) => `${CHANNELS_URL}/${userId}`,
      providesTags: ['Channels'],
    }),

    createChannelList: builder.mutation({
      query: (message) => ({
        url: CHANNELS_URL,
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Channels'],
    }),

    updateChannel: builder.mutation({
      query: message,
    }),
  }),
});
