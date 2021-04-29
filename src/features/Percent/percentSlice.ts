import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
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
    return res.data;
  }
);

export const fetchasyncPostpoint = createAsyncThunk(
  "post/point",
  async (Userpoint: {
    id: string;
    point: number;
    today: string;
    LoginDate: any;
  }) => {
    const u = Userpoint.LoginDate;
    const o = u.flat();
    const indexes = o.map((_: never, index: number) => index);
    const LastestDayIndex = Math.max(...indexes); //今日の日付
    let points: any = localStorage.getItem("point");
    if (Userpoint.today !== o[LastestDayIndex]) {
      localStorage.removeItem("point");
      points = 0;
      console.log("日付が変わりました");
    }
    const obj: any = {};
    const key: any = o[LastestDayIndex];
    obj[key] = Userpoint.point;

    const obj7: any = {};
    const key7: any = o[LastestDayIndex - 1];
    obj7[key7] = Userpoint.point - points < 0 ? 0 : Userpoint.point - points;

    const obj6: any = {};
    const key6: any = o[LastestDayIndex - 2];
    obj6[key6] = obj7[key7] - points < 0 ? 0 : obj7[key7] - points;

    const obj5: any = {};
    const key5: any = o[LastestDayIndex - 3];
    obj5[key5] = obj6[key6] - points < 0 ? 0 : obj6[key6] - points;

    const obj4: any = {};
    const key4: any = o[LastestDayIndex - 4];
    obj4[key4] = obj5[key5] - points < 0 ? 0 : obj5[key5] - points;

    const obj3: any = {};
    const key3: any = o[LastestDayIndex - 5];
    obj3[key3] = obj4[key4] - points < 0 ? 0 : obj4[key4] - points;

    const obj2: any = {};
    const key2: any = o[LastestDayIndex - 6];
    obj2[key2] = obj3[key3] - points < 0 ? 0 : obj3[key3] - points;

    const m = [obj2, obj3, obj4, obj5, obj6, obj7, { ...obj }];
    const tests = "undefined";
    const y = [...m.values()].filter((x) => x[tests] === undefined);

    const SendUserPoint = {
      point: Userpoint.point,
      id: Userpoint.id,
      WeekPoint: y,
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

export default PercentSlice.reducer;
