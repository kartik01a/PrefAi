import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: "USER" | "ADMIN";
  passportNumber?: string;
  provider: "manual" | "facebook" | "google" | "linkedin" | "apple";
  token?: string;
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
}

export interface AuthResponsePayload {
  data: {
    accessToken: string;
    refreshToken: string;
    userInfo: UserInfo;
  };
  success: boolean;
}

interface AuthState {
  userInfo: UserInfo | null;
}

const initialState: AuthState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponsePayload>) => {
      const { accessToken, refreshToken, userInfo } = action.payload.data;
      state.userInfo = {
        ...userInfo,
        token: accessToken,
        refreshToken,
      };
    },

    logout: (state) => {
      state.userInfo = null;
    },

    setUserIdOnly: (state, action: PayloadAction<string>) => {
      if (!state.userInfo) {
        state.userInfo = {
          _id: action.payload,
          email: "",
          role: "USER",
          provider: "manual",
        };
      } else {
        state.userInfo._id = action.payload;
      }
    },
  },
});

export const { setCredentials, logout, setUserIdOnly } = authSlice.actions;
export default authSlice.reducer;
