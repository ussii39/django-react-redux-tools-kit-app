import { FC, useEffect, useState } from "react";
import moment from "moment";
import "./Loading.css";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { fetchAsyncGetMyProf } from "../auth/authSlice";
import axios from "axios";
import { useHistory } from "react-router";
import { LOGIN_USER } from "../types";
import Error from "../Modal/Error";
import { LinearProgress } from "@material-ui/core";
import JudgeRouter from "../../app/Router/JudgeRouter";

const Loading: FC = () => {
  const [error, Seterror] = useState("");
  const [progress, setProgress] = useState(0);
  const [press, setpress] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { getUser } = JudgeRouter();
  const history = useHistory();

  useEffect((): void => {
    getUser();
    const data = localStorage.getItem("token");
    dispatch(fetchAsyncGetMyProf(data));
    if (press === true) {
      getuserupdated_at();
    }
  }, [press]);
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
        const userloginDate = eceptJsonFormat.filter(
          (today: string, index: number) => {
            return today.indexOf(todayDate) == -1;
          }
        );
        const totalUserLoginDate = [...userloginDate, todayDate];
        const sendData = {
          token: localStorage.getItem("token"),
          LoginDate: totalUserLoginDate,
        };
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/loginStatus`, sendData)
          .then((res) => {
            setProgress(Math.min(progress + 100, 100));
            if (eceptJsonFormat.includes(todayDate)) {
              history.push("/selectLang");
            } else {
              history.push("/login");
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
    <div onClick={() => setpress(true)}>
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
        {progress > 20 && progress < 70 ? (
          <div>ユーザーのデータを取得しています</div>
        ) : (
          <div></div>
        )}
        {progress == 100 ? <div>画面遷移します</div> : <div></div>}
        <div className="App">
          <div className="App-header">
            <div className="App-logo">press to start</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
