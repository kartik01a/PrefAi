// app/features/chat/chatApiSlice.ts
import { CHAT_URL } from "@/constants/constants";
import { apiSlice } from "../../services/apiSlice";

export interface ChatRequest {
  message: string;
  context?: { role: "system" | "user" | "assistant"; content: string }[];
}

export interface ChatResponse {
  success: boolean;
  reply: string;
}

export interface TranslateRequest{
  text: string;
  from: string;
  to: string;
}

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ChatResponse, ChatRequest>({
      query: (data) => ({
        url: `${CHAT_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    sentMessageToTranslate: builder.mutation<any, TranslateRequest>({
      query: (data) => ({
        url: `${CHAT_URL}/translate`,
        method: "POST",
        body: data,
      }),
    }),

    // For uploading file/image to backend
    uploadFile: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `${CHAT_URL}/upload`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useSendMessageMutation, useUploadFileMutation, useSentMessageToTranslateMutation } = chatApiSlice;
