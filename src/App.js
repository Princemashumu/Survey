import React, { useState } from 'react';
import Header from './components/Header';
import SurveyForm from './components/SurveyForm';
import SurveyResults from './components/SurveyResults';

function App() {
  const [view, setView] = useState('form'); // 'form' or 'results'
  const [responses, setResponses] = useState([]);

  const handleAddSurvey = (data) => {
    setResponses(prev => [...prev, data]);
    setView('results');
  };

  return (
    <>
      <Header setView={setView} currentView={view} />
      {view === 'form' ? (
        <SurveyForm onSubmit={handleAddSurvey} />
      ) : (
        <SurveyResults responses={responses} />
      )}
    </>
  );
}

export default App;
