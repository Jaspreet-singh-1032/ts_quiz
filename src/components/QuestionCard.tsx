import React from "react";
import { AnswerObject } from "../App";
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
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <div>
        {answers.map((item, index) => {
          return (
            <div key={index}>
              <button
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
