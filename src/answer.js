import React from "react";
import { useQuiz } from "./QuizProvider";
import { useNavigate } from "react-router-dom";

const AnswerPage = () => {
  const { userAnswers, setUserAnswers, setQuizCompleted, setScore } = useQuiz();
  const navigate = useNavigate();
  
  const quizData = [
    { question: "Which planet is closest to the Sun?", answer: "Mercury", type: "multiple-choice" },
    { question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?", answer: "Queue", type: "multiple-choice" },
    { question: "Which of the following is primarily used for structuring web pages?", answer: "HTML", type: "multiple-choice" },
    { question: "Which chemical symbol stands for Gold?", answer: "Au", type: "multiple-choice" },
    { question: "Which of these processes is not typically involved in refining petroleum?", answer: "Filtration", type: "multiple-choice" },
    { question: "What is the value of 12 + 28?", answer: "40", type: "input" },
    { question: "How many states are there in the United States?", answer: "50", type: "input" },
    { question: "In which year was the Declaration of Independence signed?", answer: "1776", type: "input" },
    { question: "What is the value of pi rounded to the nearest integer?", answer: "3", type: "input" },
    { question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?", answer: "120", type: "input" }
  ];

  const handleRetry = () => {
    setUserAnswers({});
    setScore(0);
    setQuizCompleted(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-600">Quiz Summary</h2>
        {quizData.map((item, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
            <p className="font-semibold text-lg">{index + 1}. {item.question}</p>
            <p className="text-blue-600">Correct Answer: <span className="font-bold">{item.answer}</span></p>
            <p className={`text-${userAnswers[index] === item.answer ? 'green' : 'red'}-500`}>
              Your Answer: <span className="font-bold">{userAnswers[index] || "No answer"}</span>
            </p>
          </div>
        ))}
        <button
          onClick={handleRetry}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4 transition-all duration-300 hover:bg-blue-700"
        >
          Retry Exam
        </button>
      </div>
    </div>
  );
};

export default AnswerPage;
