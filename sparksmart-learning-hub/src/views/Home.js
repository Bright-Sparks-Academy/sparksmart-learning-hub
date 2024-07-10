import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import LightBulbAnimation from '../components/LightBulbAnimation.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

const PageContainer = styled.div`
  font-family: 'Gotham', 'Quicksand', sans-serif;
  background-color: #FFFFFF;
  color: #000000;
  height: 200vh; /* For parallax effect */
  overflow-x: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100vh;
  justify-content: center;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #000000;
  text-align: center;
  margin-bottom: 1rem;
`;

const Subheading = styled.p`
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

const Home = () => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);

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
        <Subheading ref={subheadingRef}>Available in August</Subheading>
        <ParallaxSection className="light-bulb">
          <LightBulbAnimation />
        </ParallaxSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default Home;
