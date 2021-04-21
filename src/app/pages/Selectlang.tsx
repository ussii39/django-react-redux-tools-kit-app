import React, { FC } from "react";
import { Link } from "react-router-dom";
import "../css/selectLang.css";
import Header from "../Organisms/Header";
const Selectlang: FC = () => {
  return (
    <>
      <Header></Header>
      <div className="container">
        <div className="title">タイトル</div>
        <div className="select-menu-container">
          <div className="select-menu">
            <Link to="/AnswerQuestion">問題を解く</Link>
          </div>
          <div className="select-menu">
            <Link to="/Mypage">マイページ</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Selectlang;
