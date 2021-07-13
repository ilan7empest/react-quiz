import axios from 'axios';
import React, { useState, useContext } from 'react';

export const table = {
  films: 11,
  music: 12,
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'films',
    difficulty: 'easy',
    type: 'multiple',
  });
  const [isModalopen, setIsModalOpen] = useState(false);
  const [timer, setTimer] = useState(null);
  const [highlight, setHightlight] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    setWaiting(false);
    try {
      const { data } = await axios(
        API_ENDPOINT +
          `amount=${quiz.amount}&category=${table[quiz.category]}&difficulty=${
            quiz.difficulty
          }&type=${quiz.type}`
      );

      if (!data) throw Error('No Results');
      if (data.results.length > 0) {
        setQuestions(data.results);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setWaiting(true);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  const nextQuestion = () => {
    setHightlight(true);
    if (timer) clearTimeout(timer);

    setTimer(
      setTimeout(() => {
        setHightlight(false);
        setIndex((oldIndex) => {
          const newIndex = oldIndex + 1;
          if (newIndex > questions.length - 1) {
            openModal();
            return 0;
          }
          return newIndex;
        });
      }, 500)
    );
  };

  const checkAnswer = (correct) => {
    if (correct) {
      setCorrect((oldVal) => oldVal + 1);
    }
    nextQuestion();
  };

  const handleChange = (e) => {
    setQuiz({
      ...quiz,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchQuestions();
  };

  return (
    <AppContext.Provider
      value={{
        handleChange,
        handleSubmit,
        checkAnswer,
        nextQuestion,
        closeModal,
        waiting,
        loading,
        questions,
        index,
        correct,
        isModalopen,
        highlight,
        ...quiz,
      }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
