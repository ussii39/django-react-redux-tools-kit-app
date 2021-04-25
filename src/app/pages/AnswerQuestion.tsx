import React, {
  FC,
  useEffect,
  useState,
  useCallback,
  useMemo,
  createRef,
} from "react";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoginUser,
  fetchAsyncGetMyProf,
} from "../../features/auth/authSlice";
import { useHistory } from "react-router";
import { LOGIN_USER } from "../../features/types";
import Circle from "react-circle";
import "../css/AnswerQuestion.css";
import Header from "../Organisms/Header";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { fetchasyncPostAnswer } from "../../features/Answer/AnswerSlice";
import {
  fetchasyncPostpercent,
  fetchasyncPostpoint,
} from "../../features/Percent/percentSlice";

const AnswerQuestion: FC = () => {
  const loginuser = useSelector(selectLoginUser);
  const [LoginUser, SetLoginUser]: any[] = useState([]);
  const [Question, SetQuestion]: any[] = useState([]);
  const [InputOneAnswer, SetInputOneAnswers] = useState("");
  const [AnsweredId, SetAnsweredId] = useState([]);
  const [ResAnsweredId, SetResAnsweredId]: any = useState("");
  const [UserPercents, SetUserPercents] = useState(0);
  const [takePercent, SettakePercent] = useState(0);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    getQuestions();
    getQuestion();
    getUserInfomation();
    // getUserAnsweredId();
    curculateUserpercent();
  }, []);
  useEffect(() => {
    postAnswerIdtoSlice();
  }, [ResAnsweredId]);

  const getUserinfo = () => {
    const data = localStorage.getItem("token");
    const result = dispatch(fetchAsyncGetMyProf(data));
    return result;
  };

  const postAnswerIdtoSlice = async () => {
    const result: any = await getUserinfo();
    const resultPayload: LOGIN_USER[] = result.payload;
    const userId = resultPayload.map((user: any) => user.id).join("");
    const prevIds: any = resultPayload
      .map((result) => {
        return result.AnsweredIds;
      })
      .join();
    const prevId: any = JSON.parse(prevIds).flat();
    const resultid: any = prevId.filter((prev: any) => prev !== null);
    if (ResAnsweredId.length > 0) {
      const obj = { userid: userId, id: ResAnsweredId, resultid };
      const postresult = dispatch(fetchasyncPostAnswer(obj));
      if (fetchasyncPostAnswer.fulfilled.match(await postresult)) {
        postUserPercenttoSlice();
      }
    }
  };

  const postUserPercenttoSlice = async () => {
    const userpercent: any = await getUserinfo();
    const userpayload: LOGIN_USER[] = userpercent.payload;
    const getUserId: string = userpayload
      .map((user: any) => {
        return user.id;
      })
      .join();
    if (ResAnsweredId.length > 0) {
      const latestuserpercen = await curculateUserpercent();
      const percentobj = { id: getUserId, percent: latestuserpercen };
      const postresult = dispatch(fetchasyncPostpercent(percentobj));
      if (fetchasyncPostpercent.fulfilled.match(await postresult)) {
      }
    }
  };

  const getQuestions = async () => {
    const questionsLength = await fetch(
      `${process.env.REACT_APP_API_URL}/api/questions`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res;
      });
    return questionsLength;
  };

  const getUserAnsweredId = async () => {
    const user: any = await getUserinfo();
    const userpayload: any = user.payload;
    const useransweredId = userpayload.map((u: any) => u.AnsweredIds);
    const answeredids = JSON.parse(useransweredId).flat();
    SetAnsweredId(answeredids.length);
    const exceptNulls = answeredids.filter((u: any) => u !== null).length;
    return exceptNulls;
  };

  const curculateUserpercent = async () => {
    const catchansweredIds = await getUserAnsweredId();
    const getquestionlenght = await getQuestions();
    const result01 = catchansweredIds / getquestionlenght.length;
    let n = 2;
    let result02 =
      (Math.floor(result01 * Math.pow(10, n)) / Math.pow(10, n)) * 100;
    let result03 = Math.trunc(result02);
    SetUserPercents(result03);
    return result03;
  };

  const getUserInfomation = async () => {
    const a: any = await getUserinfo();
    const array: LOGIN_USER[] = a.payload;
    const token = array
      .map((pay: LOGIN_USER) => {
        return pay.token;
      })
      .join();
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const send = { token: token };
    const response: any = await fetch(
      `${process.env.REACT_APP_API_URL}/api/users`,
      {
        method: "POST",
        body: JSON.stringify(send),
        headers: headers,
      }
    ).then((res) => {
      return res.json();
    });
    SetLoginUser(response);
  };

  const getQuestion = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/random/question`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        SetQuestion(res);
      });
  };

  const postUserPoint = async () => {
    const getuserinfo: any = await getUserinfo();
    const userpoint: string = getuserinfo.payload
      .map((user: any) => user.point)
      .join();
    const userid: string = getuserinfo.payload
      .map((user: any) => user.id)
      .join();
    const pointvalue = parseInt(userpoint, 10);
    const sendpoint: number = pointvalue + 1 * 30;
    SettakePercent(sendpoint - pointvalue);
    const userpointobj = { id: userid, point: sendpoint };
    const responseuserpercent = dispatch(fetchasyncPostpoint(userpointobj));
    if (fetchasyncPostpoint.fulfilled.match(await responseuserpercent)) {
      getUserInfomation();
      SettakePercent(0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetInputOneAnswers(e.target.value);
  };

  const postAnswer = async (id: number, subjects: string) => {
    scrollToBottomOfList();
    const postData = { answer: InputOneAnswer };
    const resdata = await axios
      .post<any>(`${process.env.REACT_APP_API_URL}/api/answer`, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const ResponseData = res.data;
        const ResIds = ResponseData.map((a: any) => a.id);
        if (ResIds == id) {
          ResIds.forEach((re: any) => {
            SetResAnsweredId((prev: any[]) =>
              [re, ...prev].filter((y) => y !== "")
            );
          });
        }
        return { ResponseData, ResIds };
      });
    const { ResponseData, ResIds } = resdata;
    if (ResIds == id && subjects === "javascript") {
      postAnswerIdtoSlice();
      postUserPoint();
    } else if (ResIds == id && subjects === "python") {
      postAnswerIdtoSlice();
      postUserPoint();
    } else if (ResIds == id && subjects === "typescript") {
      postAnswerIdtoSlice();
      postUserPoint();
    } else {
      console.log("不正解です");
    }
  };

  // ref を作成しスクロールさせたい場所にある Element にセット
  const ref = React.createRef<HTMLDivElement>();
  // このコールバックを呼び出して ref.current.scrollIntoView() を呼び出してスクロール
  const scrollToBottomOfList = () => {
    ref!.current!.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  return (
    <>
      <Header></Header>
      <div className="answer-question-container">
        <div id="bottom-of-list" ref={ref} />
        {LoginUser.map((login: LOGIN_USER, index: number) => (
          <div key={index}>
            <div className="circle-area">
              <Circle
                animate={true} // アニメーションをつけるかどうか
                size={"200"}
                lineWidth={"14"}
                progress={UserPercents}
                progressColor="cornflowerblue" //進捗部分の色
                bgColor="whitesmoke" //円の進捗部分以外の色
                textColor="hotpink" //テキスト部分の色
                textStyle={{
                  font: "bold 5rem Helvetica, Arial, sans-serif", // テキスト部分のスタイル
                }}
                roundedStroke={true} // 円の進捗部分に丸みをもたせるかどうか
                showPercentage={true} // 進捗数値部分を表示させるかどうか
                showPercentageSymbol={true} // 進捗の%部分を表示させるかどうか
              />
            </div>
            <div className="user-score">{login.point}</div>

            {takePercent == 0 ? (
              <div></div>
            ) : (
              <div className="take-user-score">+{takePercent}</div>
            )}
            <div className="question-area">
              {Question.map((question: any, index: number) => (
                <div key={index}>
                  <div className="question-text">{question.question}</div>
                  {question.subjects === "javascript" ? (
                    <div className="javascript">{question.subjects}</div>
                  ) : (
                    <div></div>
                  )}
                  {question.subjects === "python" ? (
                    <div className="python">{question.subjects}</div>
                  ) : (
                    <div></div>
                  )}
                  {question.subjects === "typescript" ? (
                    <div className="typescript">{question.subjects}</div>
                  ) : (
                    <div></div>
                  )}
                  <div className="level">{question.level}</div>
                  <TextField
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="解答欄"
                    type="text"
                    name="name"
                  />
                  <div className="space"></div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => postAnswer(question.id, question.subjects)}
                  >
                    答えを送信
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AnswerQuestion;
