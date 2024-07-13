// LearningPlanPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const LearningPlanContainer = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 2rem auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const PlanContent = styled.div`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  white-space: pre-wrap;
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  max-height: 400px;
  overflow-y: auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #444;
  margin: 1rem 0;
`;

const ResourceLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LearningPlanPage = () => {
  const location = useLocation();
  const { learningPlan } = location.state || { learningPlan: '' };

  const parsedPlan = typeof learningPlan === 'string' ? JSON.parse(learningPlan) : learningPlan;

  return (
    <LearningPlanContainer>
      <Title>Personalized Learning Plan</Title>
      <PlanContent>
        {parsedPlan.sections && parsedPlan.sections.map((section, index) => (
          <div key={index}>
            <SectionTitle>{section.title}</SectionTitle>
            <p>{section.description}</p>
            {section.resources && section.resources.map((resource, resIndex) => (
              <p key={resIndex}>
                <ResourceLink href={resource.link} target="_blank" rel="noopener noreferrer">
                  {resource.name}
                </ResourceLink>
              </p>
            ))}
          </div>
        ))}
      </PlanContent>
    </LearningPlanContainer>
  );
};

export default LearningPlanPage;