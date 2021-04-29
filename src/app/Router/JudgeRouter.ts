import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { fetchAsyncGetMyProf } from "../../features/auth/authSlice";
import { useHistory } from "react-router";
import { selectLoginUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

const JudgeRouter = () => {
  const history = useHistory();

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (token === null) {
      history.push("/");
    }
  };
  return { getUser };
};
export default JudgeRouter;
