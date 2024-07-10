import React, { useState } from 'react';
import Questionnaire from './Questionnaire.js';
import LearningPlan from './LearningPlan.js';
import { PageContainer, Header, ContentWrapper } from './styles.js';

/**
 * Main page component for AI-powered learning plans.
 * Handles the state of the learning plan and renders either the questionnaire
 * or the generated learning plan based on user interaction.
 */
const AiLearningPlansPage = () => {
  const [learningPlan, setLearningPlan] = useState(null);

  const handlePlanGeneration = (plan) => {
    setLearningPlan(plan);
  };

  return (
    <PageContainer>
      <Header>AI Powered Learning Plans</Header>
      <ContentWrapper>
        {learningPlan ? (
          <LearningPlan plan={learningPlan} />
        ) : (
          <Questionnaire onComplete={handlePlanGeneration} />
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default AiLearningPlansPage;