import React from 'react';
import styled from 'styled-components';
import LightBulbAnimation from '../components/LightBulbAnimation';

const PageContainer = styled.div`
  margin-top: 80px;
  padding: 2rem;
  font-family: 'Gotham', 'Quicksand', sans-serif;
  background-color: #FFFFFF;
  color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100vh;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #000000;
  position: absolute;
  top: 20%;
`;

const Subheading = styled.p`
  font-size: 1.5rem;
  color: #FFD900;
  position: absolute;
  top: 30%;
`;

const Home = () => (
  <PageContainer>
    <Heading>Welcome to Bright Sparks Academy</Heading>
    <Subheading>thy journey</Subheading>
    <LightBulbAnimation />
  </PageContainer>
);

export default Home;
