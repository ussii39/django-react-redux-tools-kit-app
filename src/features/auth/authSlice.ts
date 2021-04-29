import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { AUTH_STATE, CRED, LOGIN_USER } from "../types";

const initialState: AUTH_STATE = {
  isLoginView: true,
  loginUser: [
    {
      id: 0,
      name: "",
      token: "",
      percent: 0,
      AnsweredIds: "[[null]]",
      point: "0",
      LoginDate: "[null]",
      WeekPoint: [],
    },
  ],
  postanswers: [
    {
      id: 0,
      answer: "",
    },
  ],
  message: "",
};

export const fetchAsyncLogin = createAsyncThunk(
  "auth/login",
  //action名
  async (auth: CRED) => {
    const res = await axios.post<LOGIN_USER>(
      `${process.env.REACT_APP_API_URL}/api/login`,
      auth,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data; //extra reducersの payloadに渡される
  }
);

export const fetchAsyncRegister = createAsyncThunk(
  "auth/register",
  async (auth: CRED) => {
    const res = await axios.post<LOGIN_USER>(
      `${process.env.REACT_APP_API_URL}/api/register`,
      auth,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncGetMyProf = createAsyncThunk(
  "auth/loginuser",
  async (token: unknown) => {
    const loginusertoken = { token: token };
    const res = await axios.post<LOGIN_USER>(
      `${process.env.REACT_APP_API_URL}/api/users`,
      loginusertoken,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const fetchAsynclogout = createAsyncThunk(
  "auth/logout",
  async (loginuser: any) => {
    const logoutuser = loginuser.flat();
    const logoutData = logoutuser
      .map((login: LOGIN_USER) => login.token)
      .join("");
    const logoutUsertoken = { token: logoutData };
    const res = await axios.post<LOGIN_USER>(
      `${process.env.REACT_APP_API_URL}/api/logout`,
      logoutUsertoken,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
          action.payload.token && (window.location.href = "/loading");
          return {
            ...state,
            loginUser: action.payload,
          };
        } else if (!action.payload.token) {
          return {
            ...state,
            message: action.payload,
          };
        }
      }
    );

    builder.addCase(
      fetchAsyncRegister.fulfilled,
      (state, action: PayloadAction<LOGIN_USER>) => {
        localStorage.setItem("token", action.payload.token);
        action.payload.token && (window.location.href = "/loading");
        return {
          ...state,
          loginUser: [action.payload],
        };
      }
    );
    builder.addCase(
      fetchAsyncGetMyProf.fulfilled,
      //pending
      //rejected
      (state, action: PayloadAction<LOGIN_USER>) => {
        return {
          ...state,
          loginUser: [action.payload],
        };
      }
    );
    builder.addCase(
      fetchAsynclogout.fulfilled,
      (state, action: PayloadAction<LOGIN_USER>) => {
        window.location.href = "/";
        localStorage.removeItem("token");
        return {
          ...state,
          loginUser: [action.payload],
        };
      }
    );
  },
});
export const { toggleMode } = authSlice.actions; //通常のreducerだけ

export const selectIsLoginView = (state: RootState) => state.auth.isLoginView;
export const selectLoginUser = (state: RootState) => state.auth.loginUser;
export const selectResponseErorrMessage = (state: RootState) =>
  state.auth.message;

//store.tsを参照している

export default authSlice.reducer;
