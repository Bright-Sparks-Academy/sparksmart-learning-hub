import React from 'react';
import styled from 'styled-components';

const LightBulbWrapper = styled.div`
  width: 100px;
  height: 100px;
  background: url('../assets/lightbulb.png') no-repeat center center;
  background-size: contain;
`;

const LightBulbAnimation = () => {
  return <LightBulbWrapper />;
};

export default LightBulbAnimation;