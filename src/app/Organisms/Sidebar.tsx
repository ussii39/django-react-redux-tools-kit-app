import { Link } from "react-router-dom";
import "../css/Sidebar.css";
import { useSelector } from "react-redux";
import { selectLoginUser } from "../../features/auth/authSlice";

const Sidebar = (props: any) => {
  const loginuser = useSelector(selectLoginUser);
  const { onClick, status } = props;
  return (
    <div onClick={() => onClick(!status)}>
      {loginuser.map((login, index) => (
        <div key={index}>
          {login.token == "" ? (
            <div className="list">
              <div className="list-inner"></div>
              <div className="list-inner"></div>
              <div className="list-inner"></div>
              <div className="list-inner"></div>
            </div>
          ) : (
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
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
