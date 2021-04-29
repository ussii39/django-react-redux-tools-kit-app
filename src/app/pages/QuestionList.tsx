import React, { FC, useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";

const QuestionList: FC<any> = React.memo((props: any) => {
  const {
    question,
    subjects,
    level,
    postAnswer,
    id,
    index,
    CorrectAnswer,
    CorrectId,
    showmessage,
  } = props;

  const [InputOneAnswer, SetInputOneAnswers] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetInputOneAnswers(e.target.value);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div key={index}>
        <div className="question-text">{question}</div>
        {showmessage === true ? (
          CorrectId == id ? (
            <div>正しい答えは{CorrectAnswer}です</div>
          ) : (
            <div></div>
          )
        ) : (
          <div></div>
        )}

        {subjects === "javascript" ? (
          <div className="javascript">{subjects}</div>
        ) : (
          <div></div>
        )}
        {subjects === "python" ? (
          <div className="python">{subjects}</div>
        ) : (
          <div></div>
        )}
        {subjects === "typescript" ? (
          <div className="typescript">{subjects}</div>
        ) : (
          <div></div>
        )}
        <div className="level">{level}</div>
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
          onClick={() => postAnswer(id, subjects, InputOneAnswer, showmessage)}
        >
          答えを送信
        </Button>
      </div>
    </>
  );
});

export default QuestionList;
