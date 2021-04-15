import React, { FC, useEffect } from "react";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoginUser,
  selectIsLoginView,
  fetchAsyncGetMyProf,
  fetchAsynclogout,
} from "../auth/authSlice";

import { useHistory } from "react-router";
import { LOGIN_USER } from "../types";

export const Task: FC = (): any => {
  const history = useHistory();
  const loginuser = useSelector(selectLoginUser);
  const dispatch: AppDispatch = useDispatch();

  useEffect((): void => {
    const data = localStorage.getItem("token");
    dispatch(fetchAsyncGetMyProf(data));
    console.log(loginuser);
  }, []);
  const logout = (): void => {
    history.push("/");
  };

  return (
    <div>
      <button onClick={() => dispatch(fetchAsynclogout(loginuser))}>
        ログアウト
      </button>
    </div>
  );
};
