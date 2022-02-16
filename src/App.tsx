import React, { useState } from "react";
import "./App.css";

import { fetchQuizQuestions, DifficultyType, QuestionState } from "./API";

// components
import QuestionCard from "./components/QuestionCard";

const TOTAL_QUESTIONS = 10;

export interface AnswerObject {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const startTrivia = async () => {
    setLoading(true);

    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      DifficultyType.Easy
    );
    setNumber(0);
    setScore(0);
    setQuestions(newQuestions);
    setUserAnswers([]);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    let answer = e.currentTarget.value;
    // check answer against correct answer
    const correct =
      questions[number].correct_answer ===
      questions[number].answers[parseInt(answer)];
    // add score if answer is correct
    if (correct) setScore((prev) => prev + 1);
    if (number === TOTAL_QUESTIONS - 1) {
      setGameOver(true);
    }
    // save answer in the array for user answers
    const answerObject = {
      question: questions[number].question,
      answer: questions[number].answers[parseInt(answer)],
      correct,
      correctAnswer: questions[number].correct_answer,
    };
    setUserAnswers((prev) => [...prev, answerObject]);
  };
  const nextQuestion = () => {
    let nextQues = number + 1;
    if (nextQues === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQues);
    }
  };
  return (
    <div className="App">
      <div className="quiz">
        {gameOver || number === TOTAL_QUESTIONS ? (
          <>
            <div className="quiz__heading">LetsQuiz</div>
            <button className="btn" onClick={startTrivia} disabled={loading}>
              Start
            </button>
          </>
        ) : null}
        {loading && <p>Loading question...</p>}
        {number + 1 === TOTAL_QUESTIONS && gameOver && (
          <p className="quiz__score">Your Score: {score}</p>
        )}
        {questions.length > 0 && !gameOver && (
          <QuestionCard
            questionNo={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers[number]}
            callback={checkAnswer}
          />
        )}
        {userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button
            className="btn btn--next"
            onClick={nextQuestion}
            disabled={number + 1 >= TOTAL_QUESTIONS}
          >
            Next Question
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default App;
