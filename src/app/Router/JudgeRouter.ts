import { useHistory } from "react-router";

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
