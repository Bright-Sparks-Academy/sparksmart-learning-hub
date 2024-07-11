// src/views/LearningPlanPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

// Author: Tom Wang 
// Display the personalized learning plan

const LearningPlanPage = () => {
  const location = useLocation();
  const { learningPlan } = location.state || { learningPlan: '' };

  return (
    <div>
      <h1>Personalized Learning Plan</h1>
      <div>
        <pre>{learningPlan}</pre>
      </div>
    </div>
  );
};

export default LearningPlanPage;
