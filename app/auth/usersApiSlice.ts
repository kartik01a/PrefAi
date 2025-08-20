import { UserInfo } from "@/features/auth/authSlice";
import { DOCUMENTS_URL, USERS_URL } from "../../constants/constants";
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
  googleId?: string;
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

export interface AuthResponsePayload {
  token: string;
  refreshToken: string;
  _id: string;
  email: string;
  role: "USER" | "ADMIN";
  provider: "manual" | "facebook" | "google" | "linkedin" | "apple";
  active: boolean;
  firstName: string | undefined;
  lastName: string | undefined;
  passportNumber: string | undefined;
  facebookId: string | undefined;
  googleId: string | undefined;
  linkedinId: string | undefined;
  image: string | undefined;
  userName: string | undefined;
  securityNumber: string | undefined;
  title: string | undefined;
  country: string | undefined;
  maritalStatus: string | undefined;
  dob: string | undefined;
  arrivalDate: string | undefined;
  data: {
    accessToken: string;
    refreshToken: string;
    userInfo: UserInfo;
  };
  success: boolean;
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
  googleId?: string;
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

export interface IDocument {
  _id?: string;
  userId: string;
  uri: string;
  name: string;
  size: number;
  type: string;
  folderId: string;
}
export interface IFolder {
  folderName: string;
  fileCount: string;
  _id: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponsePayload, LoginRequest>({
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
    updateUser: builder.mutation<UserInfo, { id: string; data: updateRequest }>({
      query: ({ id, data }) => ({
        method: "PUT",
        url: `${USERS_URL}/${id}`,
        body: data,
      }),
    }),
    getDocuments: builder.query<ApiResponse<IDocument[]>, string>({
      query: (id) => ({
        url: `${DOCUMENTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Document"],
    }),
    createDocument: builder.mutation<void, IDocument>({
      query: (data) => ({
        method: "POST",
        url: `${DOCUMENTS_URL}`,
        body: data,
      }),
      invalidatesTags: ["Document", "Folder"],
    }),
    getFolders: builder.query<ApiResponse<IFolder[]>, string>({
      query: (id) => ({
        url: `${DOCUMENTS_URL}/folder/${id}`,
        method: "GET",
      }),
      providesTags: ["Folder"],
    }),
    createFolder: builder.mutation<void,{ folderName: string; userId: string }>({
      query: (data) => ({
        method: "POST",
        url: `${DOCUMENTS_URL}/folder`,
        body: data,
      }),
      invalidatesTags: ["Folder"],
    }),
    socialLoginGoogle: builder.mutation<AuthResponsePayload, { idToken: string }>({
  query: ({ idToken }) => ({
    url: `${USERS_URL}/social/google`,
    method: "POST",
    body: { idToken },
  }),
}),
socialLoginFacebook: builder.mutation<AuthResponsePayload, { accessToken: string }>({
  query: ({ accessToken }) => ({
    url: `${USERS_URL}/social/facebook`,
    method: "POST",
    body: { accessToken },
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
  useGetDocumentsQuery,
  useGetFoldersQuery,
  useCreateDocumentMutation,
  useCreateFolderMutation,
  useSocialLoginFacebookMutation,
  useSocialLoginGoogleMutation
} = usersApiSlice;
