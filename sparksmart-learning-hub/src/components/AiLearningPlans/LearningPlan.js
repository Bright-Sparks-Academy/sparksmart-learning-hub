import React from 'react';

/**
 * Component for displaying the generated learning plan.
 * Receives the learning plan as a prop and renders its content.
 */
const LearningPlan = ({ plan }) => {
  return (
    <div>
      <h2>Your Personalized Learning Plan</h2>
      {/* Render the learning plan content */}
      <pre>{JSON.stringify(plan, null, 2)}</pre>
    </div>
  );
};

export default LearningPlan;
