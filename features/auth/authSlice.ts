import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: "USER" | "ADMIN";
  passportNumber?: string;
  provider: "manual" | "facebook" | "google" | "linkedin" | "apple";
  token: string;
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

interface AuthResponsePayload {
  data: {
    accessToken: string;
    refreshToken: string;
    userInfo: {
      _id: string;
      email: string;
      role: "USER" | "ADMIN";
      provider: string;
      active?: boolean;
      [key: string]: any;
    };
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
        id: userInfo._id,
        email: userInfo.email,
        role: userInfo.role,
        provider: userInfo.provider as UserInfo["provider"],
        token: accessToken,
        refreshToken,
        active: userInfo.active ?? true,
        // Include other optional fields from userInfo
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        passportNumber: userInfo.passportNumber,
        facebookId: userInfo.facebookId,
        linkedinId: userInfo.linkedinId,
        image: userInfo.image,
        userName: userInfo.userName,
        securityNumber: userInfo.securityNumber,
        title: userInfo.title,
        country: userInfo.country,
        maritalStatus: userInfo.maritalStatus,
        dob: userInfo.dob,
        arrivalDate: userInfo.arrivalDate,
      };
    },

    logout: (state) => {
      state.userInfo = null;
    },

    setUserIdOnly: (state, action: PayloadAction<string>) => {
      if (!state.userInfo) {
        state.userInfo = {
          id: action.payload,
          email: "",
          role: "USER",
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
