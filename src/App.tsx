import React, { useState } from "react";
import "./App.css";

import { fetchQuizQuestions, DifficultyType, QuestionState } from "./API";

// components
import QuestionCard from "./components/QuestionCard";

const TOTAL_QUESTIONS = 10;

interface AnswerObject {
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
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent) => {};
  const nextQuestion = () => {
    setNumber(number + 1);
  };
  return (
    <div className="App">
      <h1>Quiz</h1>
      <button
        className="app__startQuiz"
        onClick={startTrivia}
        disabled={loading}
      >
        Start
      </button>
      {loading && <p>Loading question...</p>}
      <p className="app__score">Score:</p>
      {questions.length > 0 && (
        <QuestionCard
          questionNo={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers}
          callback={"a"}
        />
      )}
      <button
        className="app__nextQuestion"
        onClick={nextQuestion}
        disabled={number + 1 >= TOTAL_QUESTIONS}
      >
        Next Question
      </button>
    </div>
  );
}

export default App;
