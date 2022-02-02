import React from "react";

interface Props {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
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
              <button onClick={callback}>
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
