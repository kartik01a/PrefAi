import { SUBSCRIPTION_URL } from "@/constants/constants";
import { apiSlice } from "@/services/apiSlice";
interface CreateSubscriptionRequest {
  planId: string; // Stripe price ID
}
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
