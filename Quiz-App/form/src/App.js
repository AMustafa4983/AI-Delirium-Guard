// src/App.js
import React, { useState, useRef, useEffect } from 'react';
import Phase from './components/Phase';
import Results from './components/Results';

const phases = [
  { title: 'Patient Infographic', questions: ['Name', 'Age', 'Gender', 'Height', 'Weight'], options: {} },
  {
    title: 'Patient Details',
    questions: ['Diabetes', 'Smoker', 'Dyspnea', 'Disseminated Cancer', 'Open Wound', 'Immunosuppressive Therapy', 'Sepsis', 'Emergency Case'],
    options: {
      Diabetes: ['Yes', 'No'],
      Smoker: ['Yes', 'No'],
      Dyspnea: ['Yes', 'No'],
      'Disseminated Cancer': ['Yes', 'No'],
      'Open Wound': ['Yes', 'No'],
      'Immunosuppressive Therapy': ['Yes', 'No'],
      Sepsis: ['Yes', 'No'],
      'Emergency Case': ['Yes', 'No'],
    },
  },
  {
    title: 'Surgery Details',
    questions: ['Inpatient/Outpatient', 'Transfer Status', 'Discharge Destination', 'Anesthesia Technique', 'Surgical Specialty', 'Wound Classification'],
    options: {
      'Inpatient/Outpatient': ['Inpatient', 'Outpatient'],
      'Transfer Status': ['From acute care hospital inpatient', 'Not transferred (admitted from home)', 'Nursing home - Chronic care - Intermediate care', 'Outside emergency department', 'Transfer from other', 'Unknown'],
      'Discharge Destination': ['Home', 'Other', 'Rehab', 'Skilled Care', 'Not Home', 'Unknown'],
      'Anesthesia Technique': ['General', 'MAC/IV Sedation', 'Spinal', 'Other'],
      'Surgical Specialty': ['Urology', 'Orthopedics', 'General Surgery', 'Neurosurgery', 'Thoracic', 'Otolaryngology (ENT)', 'Vascular', 'Plastics', 'Cardiac Surgery', 'Gynecology'],
      'Wound Classification': ['Clean/Contaminated', 'Clean', 'Dirty/Infected', 'Contaminated'],
    },
  },
];

const App = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [collectedData, setCollectedData] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [deliriumResult, setDeliriumResult] = useState(null);
  const formRef = useRef(null); // Create a ref for the form


  const handleNext = (data) => {
    setCollectedData({ ...collectedData, ...data });

    const currentPhaseQuestions = phases[currentPhase].questions;
    const missingQuestions = currentPhaseQuestions.filter((question) => !data[question]);

    if (missingQuestions.length === 0) {
      // If no missing questions, scroll to the top
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If missing questions, scroll to the first missing question
      const firstMissingQuestion = missingQuestions[0];
      const missingQuestionRef = document.getElementById(`question-${firstMissingQuestion}`);
      missingQuestionRef.scrollIntoView({ behavior: 'smooth' });
    }

    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
    } else {
      // Finish button logic - Send data to API for delirium prediction
      fetch('http://localhost:5000/check-delirium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientData: { ...collectedData } }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          setDeliriumResult(result.result);
          setShowResults(true);
          // Clear the collected data after finishing
          setCollectedData({});
        })
        .catch((error) => {
          console.error('Error checking delirium:', error);
        });
    }
  };

  // Scroll to the top when the currentPhase changes
  useEffect(() => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [currentPhase]);

  const handleBack = () => {
    if (currentPhase > 0) {
      setCurrentPhase(currentPhase - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentPhase(0);
    setCollectedData({});
    setShowResults(false);
    setDeliriumResult(null);
  };

  return (
    <div>
      <div className="text-center p-4 bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Delirium Risk Assessment</h1>
      </div>
      <div ref={formRef} className="mx-auto max-w-xl p-4">
        {!showResults ? (
          <Phase
            title={phases[currentPhase].title}
            questions={phases[currentPhase].questions}
            options={phases[currentPhase].options}
            onNext={handleNext}
            onBack={handleBack}
          />
        ) : (
          <Results deliriumResult={deliriumResult} restartQuiz={restartQuiz} />
        )}
      </div>
    </div>
  );
};

export default App;

