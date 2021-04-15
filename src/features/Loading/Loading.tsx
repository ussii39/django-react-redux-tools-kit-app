import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Loading.css";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginUser, fetchAsyncGetMyProf } from "../auth/authSlice";
import axios from "axios";
import { useHistory } from "react-router";
import { LOGIN_USER } from "../types";

const Loading: FC = () => {
  const loginuser: LOGIN_USER = useSelector(selectLoginUser);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  function sampleResolve(value: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(value);
      }, 2000);
    });
  }

  async function sample() {
    const result: any = await sampleResolve(loginuser);
    return result;
  }

  sample().then((result) => {
    console.log(result); // => 15
  });

  useEffect((): void => {
    const data = localStorage.getItem("token");
    dispatch(fetchAsyncGetMyProf(data));
    getuserupdated_at();
  }, []);
  const getuserupdated_at = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/users`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        const getUserUpdated = res.data;
        const u = [...getUserUpdated];
        const UserLoginState = u.map((LU: LOGIN_USER) => LU.LoginDate).join();
        const eceptJsonFormat = JSON.parse(UserLoginState).filter(
          (json: string) => json !== null
        );
        const todayDate = moment().format("YYYY/MM/DD HH:mm:ss").slice(5, 10);
        console.log(todayDate);
        const userloginDate = eceptJsonFormat.filter(
          (today: string, index: number) => {
            return today.indexOf(todayDate) == -1;
          }
        );
        console.log(eceptJsonFormat, "userloginDate");
        const totalUserLoginDate = [...userloginDate, todayDate];
        const sendData = {
          token: localStorage.getItem("token"),
          LoginDate: totalUserLoginDate,
        };
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/loginStatus`, sendData)
          .then((res) => {
            console.log(res.data);
            // if (eceptJsonFormat.includes(todayDate)) {
            //   console.log("ログイン報酬ページに遷移しません");
            //   history.push("/tasks");
            // } else {
            //   history.push("/login");
            //   console.log("ログイン報酬ページに遷移します");
            // }
          });
      });
  };
  return <div>loading...</div>;
};

export default Loading;
