import { CALENDAR_URL } from "@/constants/constants";
import { apiSlice } from "@/services/apiSlice";

export const calendarApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get all events for a specific user
    getEvents: builder.query({
      query: (userId: string) => ({
        url: `${CALENDAR_URL}/user/${userId}`,
        method: "GET",
      }),
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
    }),

    // ✅ Update event
    updateEvent: builder.mutation({
      query: ({
        id,
        ...data
      }: {
        id: string;
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
    }),

    // ✅ Delete event
    deleteEvent: builder.mutation({
      query: (id: string) => ({
        url: `${CALENDAR_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = calendarApiSlice;
