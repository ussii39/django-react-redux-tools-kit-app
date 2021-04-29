import { useState } from "react";

const useGetCorrectAnswer = () => {
  const [CorrectAnswer, SetCorrectAnswer]: any = useState([]);
  const [CorrectId, SetCorrectId] = useState([]);

  const getCorrectAnswer = async (id: number) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/answer/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const correct = response.answer;
        const correctId = response.id;
        SetCorrectId(correctId);
        SetCorrectAnswer(correct);
        return response;
      });
  };
  return { getCorrectAnswer, CorrectAnswer, CorrectId };
};

export default useGetCorrectAnswer;
