// import { SUBSCRIPTION_URL } from "@/constants/constants";
// import { apiSlice } from "@/services/apiSlice";

// export const subscriptionApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     createSubscription: builder.mutation({
//       query: (body) => ({
//         url: `${SUBSCRIPTION_URL}/checkout-session`,
//         method: "POST",
//         body,
//       }),
//     }),
//     getMySubscription: builder.query({
//       query: () =>`${SUBSCRIPTION_URL}/me`,
//     }),
//   }),
// });

// export const {
//   useCreateSubscriptionMutation,
//   useGetMySubscriptionQuery,
// } = subscriptionApiSlice;


import { SUBSCRIPTION_URL } from "@/constants/constants";
import { apiSlice } from "@/services/apiSlice";

// Define the body type for clarity
interface CreateSubscriptionRequest {
  planId: string; // Stripe price ID
}

// Optional: Define the response type
interface CreateSubscriptionResponse {
  data: {
    url: string;
  };
  message: string;
  success: boolean;
}
interface Subscription {
  id: string;
  planId: string;
  userId: string;
  status: string;
  startDate: string;
  endDate?: string;
  currentPeriodStart?: number;
  currentPeriodEnd?: number;
  [key: string]: any;
}

export const subscriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSubscription: builder.mutation<CreateSubscriptionResponse, CreateSubscriptionRequest>({
      query: (body) => ({
        url: `${SUBSCRIPTION_URL}/checkout-session`,
        method: "POST",
        body,
      }),
    }),

    getMySubscription: builder.query<Subscription | null, void>({
      query: () => `${SUBSCRIPTION_URL}/me`,
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useGetMySubscriptionQuery,
} = subscriptionApiSlice;
