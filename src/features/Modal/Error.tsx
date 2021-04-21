import React, { useState } from "react";
import "./Error.css";
import { useHistory } from "react-router";

const Error = () => {
  const [IsOpen, setIsOpen] = useState(true);
  const history = useHistory();
  const CloseModal = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
  return (
    <div className="error-modal-container" onClick={CloseModal}>
      <div className="error-modal">
        <div className="modal-area">
          エラーが発生しました。ログインからやり直してください
        </div>
        <div className="close-text">閉じる</div>
      </div>
    </div>
  );
};

export default Error;
