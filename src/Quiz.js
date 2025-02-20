import React, { useState, useEffect } from "react";
import { useQuiz } from "./QuizProvider";
import { useNavigate } from "react-router-dom";

const quizData = [
  { question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], answer: "Mercury", type: "multiple-choice" },
  { question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue", type: "multiple-choice" },
  { question: "Which of the following is primarily used for structuring web pages?", options: ["Python", "Java", "HTML", "C++"], answer: "HTML", type: "multiple-choice" },
  { question: "Which chemical symbol stands for Gold?", options: ["Au", "Gd", "Ag", "Pt"], answer: "Au", type: "multiple-choice" },
  { question: "Which of these processes is not typically involved in refining petroleum?", options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"], answer: "Filtration", type: "multiple-choice" },
  { question: "What is the value of 12 + 28?", answer: "40", type: "input" },
  { question: "How many states are there in the United States?", answer: "50", type: "input" },
  { question: "In which year was the Declaration of Independence signed?", answer: "1776", type: "input" },
  { question: "What is the value of pi rounded to the nearest integer?", answer: "3", type: "input" },
  { question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?", answer: "120", type: "input" }
];

const Quiz = () => {
  const { userAnswers, setUserAnswers, setQuizCompleted, setScore } = useQuiz();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, [currentQuestion]);

  const handleSubmit = () => {
    if (userAnswers[currentQuestion] === quizData[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(30);
    } else {
      setQuizCompleted(true);
      navigate("/answers");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">{quizData[currentQuestion].question}</h2>
        {quizData[currentQuestion].type === "multiple-choice" ? (
          quizData[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`block w-full px-4 py-2 rounded-md mb-2 transition-all duration-300 ${
    userAnswers[currentQuestion] === option ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-300'
  }`}
              onClick={() => setUserAnswers({ ...userAnswers, [currentQuestion]: option })}
            >
              {option}
            </button>
          ))
        ) : (
          <input
            type="text"
            className="border p-2 w-full rounded-md"
            value={userAnswers[currentQuestion] || ""}
            onChange={(e) => setUserAnswers({ ...userAnswers, [currentQuestion]: e.target.value })}
            placeholder="Enter your answer"
          />
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4 transition-all duration-300 hover:bg-blue-700"
        >
          Submit
        </button>
        <p className="mt-2 text-center text-gray-600">Time Left: <span className="font-bold text-red-500">{timer}s</span></p>
      </div>
    </div>
  );
};

export default Quiz;
