import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
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
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
    },
     setUserIdOnly: (state, action: PayloadAction<string>) => {
      if (!state.userInfo) {
        state.userInfo = {
          id: action.payload,
          firstName: "",
          lastName: "",
          email: "",
          role: "USER",
          passportNumber: "",
          provider: "manual",
          token: "",
        };
      } else {
        state.userInfo.id = action.payload;
      }
    },
  },
});

export const { setCredentials, logout, setUserIdOnly } = authSlice.actions;
export default authSlice.reducer;
