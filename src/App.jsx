import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Header from '../components/Header.jsx';
import Question from '../components/Question.jsx';
import Results from '../components/Results.jsx';
import { UserProvider } from '../components/UserContext.jsx';
import UserForm from '../components/UserForm.jsx';
import './App.css';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);
  const location = useLocation();
  const [selectedElement, setSelectedElement] = useState("");

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleUserFormSubmit(name) {
    setUserName(name);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(answer => {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  }

  const questions = [
    { question: "What's your favorite color?", options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"] },
    { question: "What's your favorite hobby?", options: ["Reading 📚", "Swimming 🏊", "Gardening 🌱", "Skydiving 🪂"] },
    { question: "What's your favorite season?", options: ["Summer ☀️", "Winter ❄️", "Spring 🌸", "Autumn 🍂"] },
    { question: "Pick an animal.", options: ["Horse 🐎", "Lion 🦁", "Elephant 🐘", "Panther 🐆"] },
    { question: "Pick a bird.", options: ["Phoenix 🔥", "Swan 🦢", "Owl 🦉", "Eagle 🦅"] },
    { question: "What's your favorite genre?", options: ["Action 🎬", "Mystery 🕵️", "Adventure 🌍", "Fantasy 🏰"] },
  ];

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    "Reading 📚": "Earth",
    "Swimming 🏊": "Water",
    "Gardening 🌱": "Earth",
    "Skydiving 🪂": "Air",
    "Summer ☀️": "Fire",
    "Winter ❄️": "Water",
    "Spring 🌸": "Earth",
    "Autumn 🍂": "Air",
    "Lion 🦁": "Fire",
    "Dolphin 🐬": "Water",
    "Elephant 🐘": "Earth",
    "Eagle 🦅": "Air",
    "Phoenix 🔥": "Fire",
    "Swan 🦢": "Water",
    "Owl 🦉": "Earth",
    "Falcon 🦅": "Air",
    "Action 🎬": "Fire",
    "Mystery 🕵️": "Water",
    "Adventure 🌍": "Earth",
    "Fantasy 🏰": "Air",
  };

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air"
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setElement("");
      setArtwork(null);
      setUserName("");
    } else if (currentQuestionIndex === questions.length) {
      const determinedElement = determineElement(answers);
      setSelectedElement(determinedElement);
      setElement(determinedElement);
      fetchArtwork(keywords[determinedElement]);
    }
  }, [location.pathname, currentQuestionIndex]);

  async function fetchArtwork(requestString) {
    try {
      const search = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${requestString}&isOnView=true`);
      const data1 = await search.json();
      
      if (data1.objectIDs && data1.objectIDs.length > 0) {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${data1.objectIDs[0]}`);
        const data = await response.json();
        setArtwork(data);
      } else {
        setArtwork(null);
      }
    } catch (error) {
      console.error("Error fetching artwork:", error);
      setArtwork(null);
    }
  }

  return (
    <div className='App'>
      <UserProvider value={{ name: userName, setName: setUserName }}>
        <Header />
        <Routes>
          <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
              ) : (
                <Results element={keywords[selectedElement]} artwork={artwork} />
              )
            }
          />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
