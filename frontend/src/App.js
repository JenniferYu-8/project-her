import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const questions = [
    { id: 1, question: "What is your name?", type: "name" },
    { id: 2, question: "What is your gender?", type: "gender" },
    { id: 3, question: "What is your interest?", type: "interest" },
    // Add more questions as needed
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update answers state with the current input
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion.type]: input,
    }));

    // Clear input for next question
    setInput("");

    // Move to the next question or submit the answers if it's the last question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered, submit answers to the backend
      await submitAnswers();
    }
  };

  const submitAnswers = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/save-answers', answers);
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

export default App;
