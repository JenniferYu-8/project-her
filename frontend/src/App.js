// App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import Books from "./components/Books";
import MyBook from "./components/MyBook";
import "./App.css";

function Questionnaire() {
  const questions = [
    { id: 1, question: "My name is...", type: "name", placeholder: "First name" },
    { id: 2, question: "I identify as...", type: "gender", placeholder: "e.g. woman, non-binary, trans" },
    { id: 3, question: "I am currently...", type: "position", placeholder: "e.g. high school student, employee" },
    { id: 4, question: "I am interested in...", type: "interest", placeholder: "e.g. software engineering, aviation" },
    { id: 5, question: "I want to be...", type: "future", placeholder: "e.g. web developer, pilot" },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  let updatedAnswers;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentQuestion = questions[currentQuestionIndex];
    updatedAnswers = {
      ...answers,
      [currentQuestion.type]: input,
    };

    console.log(input);
    console.log(updatedAnswers);

    setInput("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswers(updatedAnswers);
    } else {
      console.log(updatedAnswers);
      await submitAnswers(updatedAnswers);
      navigate("/books", { state: { answers: updatedAnswers } });
    }
  };

  const submitAnswers = async (updatedAnswers) => {
    try {
      console.log(updatedAnswers);
      const response = await axios.post(
        "http://127.0.0.1:5000/api/save-answers",
        updatedAnswers
      );
      console.log("Response from server:", response.data);
      setCurrentQuestionIndex(0);
      setAnswers({});
    } catch (error) {
      console.error("Error saving answers:", error);
    }
  };

  return (
    <div className="App">
      <h1>{questions[currentQuestionIndex].question}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={questions[currentQuestionIndex].placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
        </button>
      </form>
    </div>
  );
}


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Questionnaire />} />
          <Route path="/books" element={<MyBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;