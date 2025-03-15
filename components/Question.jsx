import React from "react";

export default function Question({ question, options, onAnswer }) {
  return (
    <div className="container">
      <h2 id="head3">{question}</h2>
      {options.map(function (option) {
        return (
          <button className="btn"
            key={option}
            onClick={function () {
              onAnswer(option);
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}