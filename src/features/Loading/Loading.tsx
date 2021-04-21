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
import Error from "../Modal/Error";
import { LinearProgress, Button } from "@material-ui/core";

const Loading: FC = () => {
  const [error, Seterror] = useState("");
  const [progress, setProgress] = useState(0);
  const loginuser = useSelector(selectLoginUser);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  useEffect((): void => {
    const data = localStorage.getItem("token");
    dispatch(fetchAsyncGetMyProf(data));
    getuserupdated_at();
  }, []);
  const getuserupdated_at = () => {
    setProgress(Math.min(progress + 20, 100));
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/users`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setProgress(Math.min(progress + 40, 100));
        const getUserUpdated = res.data;
        const u = [...getUserUpdated];
        const UserLoginState = u.map((LU: LOGIN_USER) => LU.LoginDate).join();
        const eceptJsonFormat = JSON.parse(UserLoginState).filter(
          (json: string) => json !== null
        );
        setProgress(Math.min(progress + 60, 100));
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
            setProgress(Math.min(progress + 100, 100));
            if (eceptJsonFormat.includes(todayDate)) {
              console.log("ログイン報酬ページに遷移しません");
              history.push("/selectLang");
            } else {
              history.push("/login");
              console.log("ログイン報酬ページに遷移します");
            }
          });
      })
      .catch((error) => {
        if (error) {
          Seterror(error);
        }
      });
  };
  return (
    <div>
      <div>
        {error ? (
          <div>
            <Error></Error>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="Progress-bar">
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={progress}
        />
        {progress}%
        {progress < 70 ? (
          <div>ユーザーのデータを取得しています</div>
        ) : (
          <div></div>
        )}
        {progress == 100 ? <div>ページに遷移します</div> : <div></div>}
      </div>
    </div>
  );
};

export default Loading;
