import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QuizProvider } from "./QuizProvider";
import Quiz from "./Quiz";
import AnswerPage from "./answer";

const App = () => {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/answers" element={<AnswerPage />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
};

export default App;
