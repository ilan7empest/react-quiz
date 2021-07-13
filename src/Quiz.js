import React, { useEffect, useState, useCallback } from 'react';

import { useGlobalContext } from './context';

const Quiz = () => {
  const { questions, correct, index, checkAnswer, nextQuestion, highlight } =
    useGlobalContext();
  const { question, correct_answer, incorrect_answers } = questions[index];

  const [answers, setAnswers] = useState([]);

  const createAnswers = useCallback(() => {
    let answers = [...incorrect_answers];
    const tempIndex = Math.floor(Math.random() * 4);
    if (tempIndex === 3) {
      answers.push(correct_answer);
    } else {
      answers.push(answers[tempIndex]);
      answers[tempIndex] = correct_answer;
    }
    setAnswers(answers);
  }, [incorrect_answers, correct_answer]);

  useEffect(() => {
    createAnswers();
  }, [index, createAnswers]);

  return (
    <section className='quiz'>
      <p className='correct-answers'>
        correct answers : {correct}/{questions.length}
      </p>
      <article className='container'>
        <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
        <div className='btn-container'>
          {answers.map((answer, i) => {
            if (!answer) return null;
            return (
              <button
                key={i}
                className={`answer-btn ${
                  highlight && answer === correct_answer ? 'highlight' : ''
                }`}
                onClick={() => checkAnswer(answer === correct_answer)}
                dangerouslySetInnerHTML={{ __html: answer }}></button>
            );
          })}
        </div>
      </article>
      <button className='next-question' onClick={nextQuestion}>
        next question
      </button>
    </section>
  );
};

export default Quiz;
