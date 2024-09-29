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
    { id: 1, question: "What is your name?", type: "name" },
    { id: 2, question: "What is your gender?", type: "gender" },
    { id: 3, question: "What is your interest?", type: "interest" },
    // Add more questions as needed
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  let updatedAnswers

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the current question
    const currentQuestion = questions[currentQuestionIndex];

    // Update answers state with the current input
    updatedAnswers = {
      ...answers,
      [currentQuestion.type]: input, // Add the current input
    };

    console.log(input);
    console.log(updatedAnswers); // Log the updated answers

    // Clear input for next question
    setInput("");

    // Move to the next question or submit the answers if it's the last question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Update the state to reflect all collected answers
      setAnswers(updatedAnswers);
    } else {
      console.log(updatedAnswers);

      // All questions answered, submit answers to the backend
      await submitAnswers({
      ...answers,
      [currentQuestion.type]: input, // Add the current input
    }); // Pass the updated answers to submit
      // Now navigate to Books after submitting answers
      navigate("/books", { state: { answers: updatedAnswers } }); // Pass the collected answers
    }
  };

  const submitAnswers = async () => {
    try {
      console.log(updatedAnswers);
      const response = await axios.post(
        "http://127.0.0.1:5000/api/save-answers",
        updatedAnswers
      );
      console.log("Response from server:", response.data);
      // Optionally reset state after submission
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
          placeholder="Your answer"
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