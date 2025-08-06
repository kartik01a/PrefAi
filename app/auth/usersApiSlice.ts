import { USERS_URL } from "../../constants/constants";
import { apiSlice } from "../../services/apiSlice";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  passportNumber: string;
  role: "USER";
  provider: "manual";
}

export interface AuthResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "USER" | "ADMIN";
  passportNumber: string;
  provider: "manual" | "facebook" | "google" | "linkedin" | "apple";
  token: string;

  // Optional fields
  name?: string;
  refreshToken?: string;
  active?: boolean;
  blocked?: boolean;
  blockReason?: string;
  facebookId?: string;
  linkedinId?: string;
  image?: string;
  userName?: string;
  securityNumber?: string;
  title?: string;
  country?: string;
  maritalStatus?: string;
  dob?: string;
  arrivalDate?: string;
  language?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface updateRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  refreshToken?: string;
  active?: boolean;
  blocked?: boolean;
  blockReason?: string;
  facebookId?: string;
  linkedinId?: string;
  image?: string;
  userName?: string;
  securityNumber?: string;
  title?: string;
  country?: string;
  maritalStatus?: string;
  dob?: string;
  arrivalDate?: string;
  language?: string;
}

export interface ApiResponse<AuthResponse> {
  success: boolean;
  data: AuthResponse;
}

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation<any, RegisterRequest>({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserLanguage: builder.mutation<void,{ id: string; language: string }>({
      query: ({ id, language }) => ({
        url: `${USERS_URL}/language/${id}`,
        method: "PATCH",
        body: { language },
      }),
    }),
    getUserById: builder.query<ApiResponse<AuthResponse>, string>({
    query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
     }),
    }),
    updateUser: builder.mutation<void, { id: string; data: updateRequest }>({
    query: ({ id, data }) => ({
      method: "PUT",
      url: `${USERS_URL}/${id}`,
      body: data,
    }),
   }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserLanguageMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = usersApiSlice;
