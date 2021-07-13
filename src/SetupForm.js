import React from 'react';
import { useGlobalContext, table } from './context';

const SetupForm = () => {
  const { handleChange, handleSubmit, amount, category, difficulty, type } =
    useGlobalContext();

  function createCategories() {
    const keys = Object.keys(table);
    return keys.map((key) => {
      return (
        <option key={key} value={key}>
          {key}
        </option>
      );
    });
  }
  createCategories();

  return (
    <main>
      <section className='quiz quiz-small'>
        <form className='setup-form' onSubmit={handleSubmit}>
          <h2>Quiz Setup</h2>
          <div className='form-control'>
            <label htmlFor='amount'>number of questions</label>
            <input
              type='number'
              name='amount'
              id='amount'
              className='form-input'
              min='1'
              max='50'
              value={amount}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='category'>category</label>
            <select
              name='category'
              id='category'
              className='form-input'
              value={category}
              onChange={handleChange}>
              {createCategories()}
            </select>
          </div>
          <div className='form-control'>
            <label htmlFor='difficulty'>select difficulty</label>
            <select
              name='difficulty'
              id='difficulty'
              className='form-input'
              value={difficulty}
              onChange={handleChange}>
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
          </div>
          <div className='form-control'>
            <label htmlFor='difficulty'>select type</label>
            <select
              name='type'
              id='type'
              className='form-input'
              value={type}
              onChange={handleChange}>
              <option value='multiple'>Multiple Choice</option>
              <option value='boolean'>True / False</option>
            </select>
          </div>
          <button type='submit' className='submit-btn'>
            start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
