import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Login.css";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoginUser,
  selectIsLoginView,
  fetchAsyncGetMyProf,
  fetchAsynclogout,
} from "../auth/authSlice";
import axios from "axios";
import img from "../../app/img/taihen.png";
import { useHistory } from "react-router";
import { LOGIN_USER } from "../types";
import Modal from "../Modal/Modal";

const Login: FC = () => {
  const [count, setCount] = useState(0);
  const [UserLoginStatus, SetUserLoginStatus] = useState([""]);
  const [IsOpen, setIsOpen] = useState(false);
  const loginuser: any = useSelector(selectLoginUser);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  useEffect((): void => {
    const data = localStorage.getItem("token");
    dispatch(fetchAsyncGetMyProf(data));
    getuserupdated_at();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (count > 6) {
      setIsOpen(true);
    }
  });

  const getuserupdated_at = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/users`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        const getUserUpdated = res.data;
        const u = [...getUserUpdated];
        const login = u.map((LU: any) => LU.updated_at).join("");
        const UserLoginState = u.map((LU: any) => LU.LoginDate).join();
        const eceptJsonFormat = JSON.parse(UserLoginState).filter(
          (json: any) => json !== null
        );
        SetUserLoginStatus(eceptJsonFormat);
        const loginUserupdatetime = login.slice(5, 10).replace("-", "/");
        const todayDate = moment().format("YYYY/MM/DD HH:mm:ss").slice(5, 10);
        console.log(todayDate);
        const userloginDate = eceptJsonFormat.filter(
          (today: any, index: number) => {
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
            console.log(res.data);
          });
      });
  };
  const leave = () => {
    if (count > 6) {
      history.push("/selectlang");
    }
  };

  return (
    <div onClick={leave}>
      {IsOpen ? <Modal></Modal> : <div></div>}
      <div className="login-text">ログインボーナス</div>
      <div className="container">
        <div className="semi-container">
          <div className="date-area">
            {UserLoginStatus.length > 0 ? (
              UserLoginStatus.length > 1 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 1 ? (
              UserLoginStatus.length > 2 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 2 ? (
              UserLoginStatus.length > 3 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 3 ? (
              UserLoginStatus.length > 4 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 4 ? (
              UserLoginStatus.length > 5 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 5 ? (
              UserLoginStatus.length > 6 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 6 ? (
              UserLoginStatus.length > 7 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 7 ? (
              UserLoginStatus.length > 8 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 8 ? (
              UserLoginStatus.length > 9 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 9 ? (
              UserLoginStatus.length > 10 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 10 ? (
              UserLoginStatus.length > 11 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 11 ? (
              UserLoginStatus.length > 12 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 12 ? (
              UserLoginStatus.length > 13 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 13 ? (
              UserLoginStatus.length > 14 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 14 ? (
              UserLoginStatus.length > 15 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 15 ? (
              UserLoginStatus.length > 16 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 16 ? (
              UserLoginStatus.length > 17 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 17 ? (
              UserLoginStatus.length > 18 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 18 ? (
              UserLoginStatus.length > 19 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
            {UserLoginStatus.length > 19 ? (
              UserLoginStatus.length > 20 ? (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img
                    className="taihenStampcompleted"
                    src={img}
                    alt="taihen"
                  />
                </div>
              ) : (
                <div className="stampe-area">
                  <div className="point">50P</div>
                  <img className="taihenStamp" src={img} alt="taihen" />
                </div>
              )
            ) : (
              <div className="date1">50P</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
