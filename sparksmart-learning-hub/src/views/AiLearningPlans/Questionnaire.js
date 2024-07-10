import React, { useState } from 'react';
import { fetchLearningPlan } from '../api/aiService'; // Assume an API service to interact with AI backend

/**
 * Component for asking the user questions to generate a personalized learning plan.
 * Handles the state of the user's answers and interacts with the AI service to fetch the learning plan.
 */
const Questionnaire = ({ onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const plan = await fetchLearningPlan(answers);
    onComplete(plan);
  };

  return (
    <div>
      <h2>Answer a few questions to personalize your learning plan</h2>
      <div>
        <label>What are your learning goals?</label>
        <input type="text" onChange={(e) => handleChange('goals', e.target.value)} />
      </div>
      <div>
        <label>Preferred learning style?</label>
        <input type="text" onChange={(e) => handleChange('style', e.target.value)} />
      </div>
      {/* Add more questions as needed */}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Generating Plan...' : 'Generate Learning Plan'}
      </button>
    </div>
  );
};

export default Questionnaire;
