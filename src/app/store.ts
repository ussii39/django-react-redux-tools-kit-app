import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import answerReducer from "../features/Answer/AnswerSlice";

// import taskReducer from "../features/task/taskSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    answer: answerReducer,
    // percent:percentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;
