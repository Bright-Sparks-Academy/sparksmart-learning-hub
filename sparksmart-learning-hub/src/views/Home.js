import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import LightBulbAnimation from '../components/LightBulbAnimation.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const PageContainer = styled.div`
  font-family: 'Quicksand', sans-serif;
  background-color: #ffd900;
  color: #000000;
  height: 200vh; /* For parallax effect */
  overflow-x: hidden;
`;

const ContentContainer = styled.div`
  font-family: 'Quicksand', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100vh;
  justify-content: center;
`;

const Heading = styled.h1`
  font-family: 'Quicksand', sans-serif;
  font-size: 3rem;
  font-weight: bold;
  color: #000000;
  text-align: center;
  margin-bottom: 1rem;
`;

const Subheading = styled.p`
  font-family: 'Quicksand', sans-serif;
  font-size: 1.5rem;
  color: black;
  text-align: center;
  margin-bottom: 3rem;
`;

const ParallaxSection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CenterTextButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 50px; /* Adjust the gap as needed */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const LeftCenterTextButton = styled.button`
  color: black;
  background-color: #f5f5dc;
  border: none;
  border-radius: 10px;
  padding: 11px 21px;
  font-size: 1rem;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  font-weight: 400;
  width: 150px; /* Set a consistent width for buttons */
  gap: 1rem;
  
  &:hover, &:focus {
    transform: scale(1.02); /* Expand the button slightly on hover */
    font-weight: 600;
  }
`;

const RightCenterTextButton = styled.button`
  color: black;
  background-color: #f5f5dc;
  border: none;
  border-radius: 10px;
  padding: 11px 21px;
  font-size: 1rem;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  font-weight: 400;
  width: 150px; /* Set a consistent width for buttons */
  gap: 1rem;
  
  &:hover, &:focus {
    transform: scale(1.02); /* Expand the button slightly on hover */
    font-weight: 600;
  }
`;

const Home = () => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate('/student-login');
  }

  const handleTeacherLogin = () => {
    navigate('/teacher-login');
  }

  const handleAdminLogin = () => {
    navigate('/admin-login');
  }

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    gsap.fromTo(
      subheadingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5 }
    );

    gsap.fromTo(
      '.light-bulb',
      { y: '20%' },
      {
        y: '-20%',
        scrollTrigger: {
          trigger: '.light-bulb',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <PageContainer>
      <ContentContainer>
        <Heading ref={headingRef}>Welcome to SparkSmart Learning Hub</Heading>
        <Subheading ref={subheadingRef}>Choose an option below</Subheading>
        {/* <ParallaxSection className="light-bulb">
          <LightBulbAnimation />
        </ParallaxSection> */}
        <CenterTextButtonDiv>
          <LeftCenterTextButton onClick={handleStudentLogin}>Student</LeftCenterTextButton>
          <RightCenterTextButton onClick={handleTeacherLogin}>Teacher</RightCenterTextButton>
        </CenterTextButtonDiv>
      </ContentContainer>
    </PageContainer>
  );
};

export default Home;
