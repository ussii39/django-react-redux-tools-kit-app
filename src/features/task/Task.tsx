import React, { FC, useEffect } from "react";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginUser, selectIsLoginView } from "../auth/authSlice";

import { useHistory } from "react-router";

export const Task: FC = (): any => {
  const history = useHistory();
  const loginuser = useSelector(selectLoginUser);
  const dispatch: AppDispatch = useDispatch();

  useEffect((): void => {
    if (test === null) {
      history.push("/");
    }
  }, []);
  const logout = (): void => {
    history.push("/");
  };

  return (
    <div>
      <button onClick={() => logout()}>ログアウト</button>
    </div>
  );
};
