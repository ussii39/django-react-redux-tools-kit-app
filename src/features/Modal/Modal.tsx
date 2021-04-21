import React, { FC, useEffect, useState } from "react";
import "./Modal.css";

const Modal: FC = () => {
  const [IsOpen, setIsOpen] = useState(false);
  return (
    <div>
      {
        <div id="overlay" onClick={() => setIsOpen(!IsOpen)}>
          <div id="content">
            <div className="modal-warning">
              ※モーダルを閉じるとメインページ遷移します
            </div>
            <div className="modal-item">ポイントを獲得しました!</div>
            <div className="modal-button" onClick={() => setIsOpen(!IsOpen)}>
              閉じる
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Modal;
