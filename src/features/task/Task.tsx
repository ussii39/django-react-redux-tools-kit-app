import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginUser, fetchAsyncGetMyProf } from "../auth/authSlice";
import { useHistory } from "react-router";
import { LOGIN_USER } from "../types";
import axios from "axios";
import "./task.css";
import Header from "../../app/Organisms/Header";

export const Task: FC = (): any => {
  const [sample, Setsample] = useState([""]);
  const [Status, SetStatus] = useState(false);

  const history = useHistory();
  const loginuser = useSelector(selectLoginUser);
  const [LoginUser, SetLoginUser]: any[] = useState([]);
  const dispatch: AppDispatch = useDispatch();

  useEffect((): void => {
    // test5();
    ggg();
  }, []);
  useEffect((): void => {
    rr();
  }, [loginuser]);

  const rr = useCallback(() => {
    const loginU = loginuser.flat();
    SetLoginUser(loginU);
  }, [loginuser]);

  const anothertest = () => {
    console.log(loginuser, "loginuser");
    const data = localStorage.getItem("token");
    const result = dispatch(fetchAsyncGetMyProf(data));
    console.log("A");
    return result;
  };
  const ggg = async () => {
    const a = await anothertest();
    const array: any = a.payload;
    const token = array
      .map((pay: LOGIN_USER) => {
        return pay.token;
      })
      .join();
    Setsample(token);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const send = { token: token };
    const response: any = await fetch(
      `${process.env.REACT_APP_API_URL}/api/users`,
      {
        method: "POST",
        body: JSON.stringify(send),
        headers: headers,
      }
    ).then((res) => {
      return res.json();
    });

    console.log(response, "response");
  };

  const logout = (): void => {
    history.push("/");
  };

  const toggleMenu = () => {
    SetStatus(!Status);
  };

  return (
    <div>
      <Header></Header>
      <div>
        {LoginUser.map((login: any) => (
          <div key={login.id}>
            <div>{login.name}</div>
          </div>
        ))}
        <div className="text">aaa</div>
      </div>
    </div>
  );
};
