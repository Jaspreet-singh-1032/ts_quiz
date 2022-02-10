import React from "react";
import { AnswerObject } from "../App";
import "./QuestionCard.css";
interface Props {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject;
  questionNo: number;
  totalQuestions: number;
}
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNo,
  totalQuestions,
}) => {
  return (
    <div className="questionCard">
      <p className="questionCard__number">
        Question: {questionNo} / {totalQuestions}
      </p>
      <p
        className="questionCard__question"
        dangerouslySetInnerHTML={{ __html: question }}
      ></p>
      <div className="questionCard__options">
        {answers.map((item, index) => {
          return (
            <div key={index}>
              <button
                className="btn"
                disabled={userAnswer ? true : false}
                onClick={callback}
                value={index}
              >
                <span dangerouslySetInnerHTML={{ __html: item }}></span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
