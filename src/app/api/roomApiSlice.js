import { apiSlice } from './apislice';

const ROOM_URL = 'api/v1/room';

const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: (userId) => `${ROOM_URL}/rooms/${userId}`,
    }),

    getRoom: builder.query({
      query: (roomId) => `${ROOM_URL}/${roomId}`,
    }),

    createRoom: builder.mutation({
      query: (accessedBy) => ({
        url: ROOM_URL,
        method: 'POST',
        body: accessedBy,
      }),
    }),

    updateRoom: builder.mutation({
      query: ({ roomId, accessdBy }) => ({
        url: `${ROOM_URL}/${roomId}`,
        method: 'PATCH',
        body: accessdBy,
      }),
    }),

    // updateRoom: builder.mutation({
    //   query: (roomId) => `${ROOM_URL}/${roomId}`,
    //   invalidatesTags: ['Room'],
    // }),

    deleteRoom: builder.mutation({
      query: (params) => ({
        url: `${ROOM_URL}/${params}`,
        method: 'DELETE',
      }),
    }),

    deleteChat: builder.mutation({
      query: (roomId) => ({
        url: `${ROOM_URL}/delete/${roomId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useGetRoomQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useDeleteChatMutation,
} = roomApiSlice;
