import { CALENDAR_URL } from "@/constants/constants";
import { apiSlice } from "@/services/apiSlice";

export const calendarApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get all events for a specific user
    getEvents: builder.query({
      query: (id: string) => ({
        url: `${CALENDAR_URL}/${id}`,
        method: "GET",
      }),
      // providesTags: (result, error, userId) => [
      //   { type: 'Event', id: 'LIST' },
      //   { type: 'Event', id: userId },
      // ],
    }),

    // ✅ Create a new event
    createEvent: builder.mutation({
      query: (newEvent: {
        title: string;
        startDate: number;
        endDate: number;
        startTime: string;
        endTime: string;
        userId: string;   // must be included!
      }) => ({
        url: `${CALENDAR_URL}`,
        method: "POST",
        body: newEvent,
      }),
      // invalidatesTags: (result, error, { userId }) => [
      //   { type: 'Event', id: 'LIST' },
      //   { type: 'Event', id: userId },
      // ],
    }),

    // ✅ Update event
    updateEvent: builder.mutation({
      query: ({
        id,
        userId,
        ...data
      }: {
        id: string;
        userId?: string;
        title?: string;
        startDate?: number;
        endDate?: number;
        startTime?: string;
        endTime?: string;
      }) => ({
        url: `${CALENDAR_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      // invalidatesTags: (result, error, { userId }) => [
      //   { type: 'Event', id: 'LIST' },
      //   ...(userId ? [{ type: 'Event' as const, id: userId }] : []),
      // ],
    }),

    // ✅ Delete event
    deleteEvent: builder.mutation({
      query: (id: string) => ({
        url: `${CALENDAR_URL}/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: [
      //   { type: 'Event', id: 'LIST' },
      // ],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = calendarApiSlice;