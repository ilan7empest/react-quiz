import React from 'react';
import { useGlobalContext } from './context';

import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';
import Quiz from './Quiz';
function App() {
  const { waiting, loading } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <main>
      <Modal />
      <Quiz />
    </main>
  );
}

export default App;
