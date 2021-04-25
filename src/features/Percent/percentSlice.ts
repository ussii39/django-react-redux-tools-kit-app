import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { AUTH_STATE, Answer } from "../types";

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

export const fetchasyncPostpercent = createAsyncThunk(
  "post/percent",
  async (Userpercent: { id: string; percent: number }) => {
    const SendUserData = {
      percent: Userpercent.percent,
      id: Userpercent.id,
    };
    const res = await axios.post<any>(
      `${process.env.REACT_APP_API_URL}/api/userpercent`,
      SendUserData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data, "値が帰ってきました");
    return res.data;
  }
);

export const fetchasyncPostpoint = createAsyncThunk(
  "post/point",
  async (Userpoint: { id: string; point: number }) => {
    console.log(Userpoint, "point");
    const SendUserPoint = {
      point: Userpoint.point,
      id: Userpoint.id,
    };
    const res = await axios.post<any>(
      `${process.env.REACT_APP_API_URL}/api/userpoint`,
      SendUserPoint,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data, "%が帰ってきました");
    return res.data;
  }
);

export const PercentSlice = createSlice({
  name: "percent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchasyncPostpercent.fulfilled,
      (state, action: PayloadAction<any>) => {
        return {
          ...state,
          loginUser: action.payload,
        };
      }
    );
    builder.addCase(
      fetchasyncPostpoint.fulfilled,
      (state, action: PayloadAction<any>) => {
        return {
          ...state,
          loginUser: action.payload,
        };
      }
    );
  },
});

// export const postPercent = (state: RootState) => state.auth.loginUser;

export default PercentSlice.reducer;
