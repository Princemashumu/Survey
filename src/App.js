// App.js
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import SurveyForm from './components/SurveyForm';
import SurveyResults from './components/SurveyResults';
import { db } from './firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

function App() {
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'results'
  const [responses, setResponses] = useState([]);

  const surveysCollection = useMemo(() => collection(db, 'surveys'), []);

  const handleAddSurvey = async (data) => {
    try {
      await addDoc(surveysCollection, data);
      fetchResponses(); // Refresh list
      setActiveTab('results');
    } catch (err) {
      console.error("Error adding survey:", err);
    }
  };

  const fetchResponses = useCallback(async () => {
    try {
      const snapshot = await getDocs(surveysCollection);
      const list = snapshot.docs.map(doc => doc.data());
      setResponses(list);
    } catch (err) {
      console.error("Error fetching surveys:", err);
    }
  }, [surveysCollection]);

  useEffect(() => {
    fetchResponses();
  }, [fetchResponses]);

  return (
    <>
      <Header currentView={activeTab} setView={setActiveTab} />
      {activeTab === 'form' ? (
        <SurveyForm onSubmit={handleAddSurvey} />
      ) : (
        <SurveyResults responses={responses} />
      )}
    </>
  );
}

export default App;
