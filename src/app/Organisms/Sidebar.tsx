import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Sidebar.css";

const Sidebar = (props: any) => {
  const { onClick, status } = props;
  return (
    <div onClick={() => onClick(!status)}>
      <div className="list">
        <div className="list-inner">
          <Link to="/about">アバウトへ</Link>
        </div>
        <div className="list-inner">
          <Link to="/selectLang">言語選択画面に行く</Link>
        </div>
        <div className="list-inner">
          <Link to="/AnswerQuestion">問題を解く</Link>
        </div>
        <div className="list-inner">
          <Link to="/Mypage">マイページ</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
