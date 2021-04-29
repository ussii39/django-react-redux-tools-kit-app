import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { AUTH_STATE } from "../types";

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

export const fetchasyncPostAnswer = createAsyncThunk(
  "post/answer",
  async (postanswers: { id: number; userid: any; resultid: any }) => {
    const sendId = postanswers.userid;
    const AnsweredId = postanswers.id;
    const u = [AnsweredId];
    const i = [...u].flat();
    const prevId = postanswers.resultid;
    const nextId = [...prevId, ...i];
    const lastResult = nextId
      .filter((next: any, index: number, self: any) => {
        return self.indexOf(next) === index;
      })
      .filter((last: any, index: number, self: any) => {
        return last !== "";
      });

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/setAnswerId/${sendId}`, {
        AnsweredIds: [lastResult],
      })
      .then((res) => {
        return res.data;
      });
  }
);

export const AnswerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchasyncPostAnswer.pending,
      (state, action: PayloadAction<any>) => {
        return {
          ...state,
          loginUser: action.payload,
        };
      }
    );
    builder.addCase(
      fetchasyncPostAnswer.fulfilled,
      (state, action: PayloadAction<any>) => {
        return {
          ...state,
          loginUser: action.payload,
        };
      }
    );
  },
});

export const postAnswer = (state: RootState) => state.answer.postanswers;
export const PendingMessage = (state: RootState) => state.answer.message;

export default AnswerSlice.reducer;
