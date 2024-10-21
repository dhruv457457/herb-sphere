import React, { useState } from 'react';

const QuizPopup = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const questions = [
    {
      question: 'Which plant is known as Holy Basil?',
      options: ['Tulsi', 'Neem', 'Aloe Vera', 'Lavender'],
      answer: 'Tulsi',
    },
    {
      question: 'Which plant is used for its antibacterial properties?',
      options: ['Neem', 'Cactus', 'Hibiscus', 'Rosemary'],
      answer: 'Neem',
    },
    // ... other questions
  ];

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestion === questions.length - 1) {
      setIsQuizComplete(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsQuizComplete(false);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white rounded-lg p-8 w-11/12 md:w-1/2 shadow-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-red-600 transition">
          &times;
        </button>

        {!isQuizComplete ? (
          <>
            <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
            <div className="mb-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="block w-full text-left p-2 border border-gray-300 rounded mb-2 hover:bg-gray-100 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Quiz Complete!</h2>
            <button onClick={handleRestartQuiz} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPopup;
