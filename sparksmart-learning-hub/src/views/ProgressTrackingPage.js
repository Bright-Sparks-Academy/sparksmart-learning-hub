// ProgressTrackingPage.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Import chart components

const GlobalStyle = styled.createGlobalStyle`
  html {
    color: #222;
    font-size: 1.5em;
    line-height: 1.4;
  }

  ::-moz-selection {
    background: #b3d4fc;
    text-shadow: none;
  }

  ::selection {
    background: #b3d4fc;
    text-shadow: none;
  }

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1em 0;
    padding: 0;
  }

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }

  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
  }

  textarea {
    resize: vertical;
  }

  @media only screen and (min-width: 35em) {
  }

  @media print,
  (-webkit-min-device-pixel-ratio: 1.25),
  (min-resolution: 1.25dppx),
  (min-resolution: 120dpi) {
  }

  @media print {
    *,
    *::before,
    *::after {
      background: #fff !important;
      color: #000 !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    a,
    a:visited {
      text-decoration: underline;
    }

    a[href]::after {
      content: " (" attr(href) ")";
    }

    abbr[title]::after {
      content: " (" attr(title) ")";
    }

    a[href^="#"]::after,
    a[href^="javascript:"]::after {
      content: "";
    }

    pre {
      white-space: pre-wrap !important;
    }

    pre,
    blockquote {
      border: 1px solid #999;
      page-break-inside: avoid;
    }

    tr,
    img {
      page-break-inside: avoid;
    }

    p,
    h2,
    h3 {
      orphans: 3;
      widows: 3;
    }

    h2,
    h3 {
      page-break-after: avoid;
    }
  }
`;

const FlexContainer = styled.div`
  display: flex;
`;

const UpperPart = styled(FlexContainer)`
  margin: 10px;
`;

const LowerPart = styled(FlexContainer)`
  margin: 10px;
`;

const ReportCard = styled.div`
  background-color: #ececec;
  border-radius: 30px;
  padding: 15px;
  width: 36em;
  text-align: justify;
  margin: 10px;
  font-family: 'Quicksand', sans-serif;
`;

const Grade = styled.div`
  text-align: center;
  background-color: #ececec;
  border-radius: 30px;
  padding: 15px;
  line-height: 16px;
  height: 120px;
  width: 120px;
  margin: 10px;
  font-family: 'Quicksand', sans-serif;
`;

const Selector = styled.select`
  height: 50px;
  width: 390px;
  padding-left: 15px;
  text-align: left;
  font-size: 1.2em;
  border-radius: 10px;
  border: solid gray;
  color: gray;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
  background: url('/sparksmart-learning-hub/sparksmart-learning-hub/src/assets/dropdown_arrow.png') 100% / 15% no-repeat;
  font-family: 'Quicksand', sans-serif;
`;

const Statistics = styled.div`
  text-align: center;
  background-color: #ececec;
  border-radius: 30px;
  padding: 0 30px;
  line-height: 16px;
  height: 10em;
  width: auto;
  font-family: 'Quicksand', sans-serif;
  font-size: 1.1em;
`;

const Stat = styled.div`
  float: left;
  width: 180px;
  line-height: 1;
`;

const Info = styled.h2`
  font-size: 1.3em;
`;

const Comment = styled.div`
  background-color: #ffd900;
  border-radius: 30px;
  padding: 15px;
  font-family: 'Quicksand', sans-serif;
  width: 36em;
  text-align: justify;
`;

const TeacherH = styled.h2`
  text-align: center;
`;

// Main component for the progress tracking page
const ProgressTrackingPage = () => {
  return (
      <GlobalStyle>
        <UpperPart>
          <ReportCard>
            <h2>[Student Name]'s Report Card</h2>
            <p>
              This is [Student Name]'s report card which gives you an
              overview of their learning. The report card shows how
              [Student First Name] has done over the last few classes
              and areas for growth and improvement.
            </p>
          </ReportCard>
          <FlexContainer id="right">
            <Grade>
              <h2>A</h2>
              <h2>95.65</h2>
            </Grade>
            <div>
              <Selector>
                <option>Select Instructor</option>
              </Selector>
              <Selector>
                <option>Current Report</option>
              </Selector>
            </div>
          </FlexContainer>
          <h2>Student ID: Bright_Sparks_001</h2>
        </UpperPart>
        <LowerPart>
          <Statistics>
            <Stat>
              <h2>17</h2>
              <Info>Classes Done</Info>
            </Stat>
            <Stat>
              <h2>15</h2>
              <Info>Homework Completed</Info>
            </Stat>
            <Stat>
              <h2>12</h2>
              <Info>Quizzes Taken</Info>
            </Stat>
          </Statistics>
          <Comment>
            <TeacherH>Teacher Overall Comment</TeacherH>
            <p>
              [Student Name]'s patient approach to
              learning is highly commendable. He carefully grasps concepts.
              There is room for further growth in actively incorporating
              it into his learning process.
            </p>
          </Comment>
        </LowerPart>
      </GlobalStyle>
  );
};

export default ProgressTrackingPage;
