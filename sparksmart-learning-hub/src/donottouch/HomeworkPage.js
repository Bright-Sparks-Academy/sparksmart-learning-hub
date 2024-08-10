import React, { useState } from 'react';
import styled from 'styled-components';
import Todolist from '../views/Todolist.js';
import axios from 'axios';

// Author: John Nguyen 
// Design the Homework page

// Make a position of HomeworkPageContainer
const HomeworkPageContainer = styled.div`
  position: relative;
`;

// Move the location of the container to the right way
const AbsoluteContainer = styled.div`
  position: absolute;
  width: 1385px;
  height: 681px;
  top: 154px;
  left: 20px;
`;

// Build the scroll container to scroll the task
const ScrollContainer = styled.div`
  overflow-y: scroll; /* Equivalent to overscroll-auto */
  top: 20px;
  position: absolute;
  width: 1320px;
  height: 186px;
`;

// Build yellow background to container
const YellowBackground = styled.div`
  position: absolute;
  width: 1385px;
  height: 505px;
  border-radius: 0.5rem;
  top: 11rem;
  left: 0;
  background-color: #FFD900;
`;

// Build white background to container
const WhiteBackground = styled.div`
  position: absolute;
  width: 1365px;
  height: 470px;
  top: 195px;
  border-radius: 1rem;
  left: 10px;
  background-color: white;
`;

// Build TaskHeader container
const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  position: absolute;
  width: 1250px;
  height: 46px;
  top: 125px;
  left: 30px;
  border-radius: 1.25rem;
  background-color: #d9d9d9;
`;

// Build TaskHeader text
const TaskHeaderItem = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  width: 100px; /* Adjust width as needed */
`;

// Build TaskHeader button to fit the task header container
const TaskButton = styled.button`
  background-color: black;
  color: #f7f03e;
  padding: 0.5rem 2.5rem;
  border-radius: 0.5rem;
  margin-left: 1rem;
  cursor: pointer;
`;

// Build HeadTitle style of the Text Homework
const HeaderTitle = styled.div`
  position: absolute;
  width: 463px;
  top: 200px;
  left: 595px;
  font-weight: bold;
  font-size: 2.5rem;
  color: black;
  letter-spacing: 0.15rem;
`;

// Build WelcomeBanner to the Text welcome firstname
const WelcomeBanner = styled.div`
  position: absolute;
  width: 362px;
  height: 63px;
  top: 250px;
  left: 20px;
  border-radius: 0.5rem;
  background-color: #FFD900;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: black;
`;

// Build another task container
const TaskLabels = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 1250px;
  height: 40px;
  top: 62px;
  left: 30px;
  background-color: #d9d9d9;
  border-radius: 1.25rem;
  padding: 0.5rem;
`;

// Build the label style to fit the container
const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || '48px'};
  height: 27px;
  background-color: black;
  border-radius: 1.25rem;
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
  margin-top: 10px;
  left: 20px;
  position: relative;
`;

// New components for the question-answer feature
const QuestionContainer = styled.div`
  margin: 2rem;
`;

const QuestionText = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const AnswerInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const FeedbackText = styled.div`
  font-size: 1.2rem;
  color: ${(props) => (props.correct ? 'green' : 'red')};
  margin-top: 1rem;
`;

const HintText = styled.div`
  font-size: 1rem;
  color: blue;
  margin-top: 1rem;
`;

// New components for the teacher role
const TeacherContainer = styled.div`
  margin: 2rem;
`;

const TeacherInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const TeacherButton = styled.button`
  background-color: green;
  color: white;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-left: 1rem;
`;

const HomeworkPage = ({ role }) => {
  // State to store the current question, user's answer, feedback, and hints
  const [question, setQuestion] = useState('What is 2 + 2?');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [hints, setHints] = useState([]);
  const [teacherQuestion, setTeacherQuestion] = useState(question);

  // Function to check the answer and get feedback from the backend
  const checkAnswer = async () => {
    try {
      const response = await axios.post('http://localhost:5000/check-answer', {
        question,
        answer: userAnswer,
      });
      setFeedback(response.data.feedback);
      setHints(response.data.hints);
    } catch (error) {
      console.error('Error checking answer:', error);
    }
  };

  // Function for teacher to set a new question
  const updateQuestion = () => {
    setQuestion(teacherQuestion);
  };

  return (
    <HomeworkPageContainer>
      <AbsoluteContainer>
        <YellowBackground />
        <WhiteBackground>
          <ScrollContainer>
            <TaskHeader>
              <TaskHeaderItem style={{ width: '200px', justifyContent: 'center' }}>Decimal Practices #1</TaskHeaderItem>
              <TaskHeaderItem>06/23</TaskHeaderItem>
              <TaskHeaderItem>100</TaskHeaderItem>
              <div className="flex items-center">
                <TaskButton>View</TaskButton>
                <TaskButton>Submit</TaskButton>
              </div>
            </TaskHeader>

            <TaskLabels>
              <TaskHeaderItem style={{ width: '200px', justifyContent: 'center' }}>Decimal Practices #1</TaskHeaderItem>
              <TaskHeaderItem>06/23</TaskHeaderItem>
              <TaskHeaderItem>100</TaskHeaderItem>
              <div className="flex items-center">
                <TaskButton>View</TaskButton>
                <TaskButton>Submit</TaskButton>
              </div>
            </TaskLabels>

            <Label style={{ top: '15px', left: '50px', width: '135px' }}>
              Assignment
            </Label>
            <Label style={{ top: '-22px', left: '420px', width: '135px' }}>
              Due Date
            </Label>
            <Label style={{ top: '-60px', left: '705px', width: '164px' }}>
              Points
            </Label>
            <Label style={{ top: '-99px', left: '1040px', width: '220px' }}>
              Submission
            </Label>

            {/* New Question Container */}
            <QuestionContainer>
              <QuestionText>{question}</QuestionText>
              <AnswerInput
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              <TaskButton onClick={checkAnswer}>Submit Answer</TaskButton>
              {feedback && <FeedbackText correct={feedback === 'Correct! Well done.'}>{feedback}</FeedbackText>}
              {hints.map((hint, index) => (
                <HintText key={index}>{hint}</HintText>
              ))}
            </QuestionContainer>

            {/* Teacher's Question Setter, visible only to teachers */}
            {role === 'teacher' && (
              <TeacherContainer>
                <TeacherInput
                  type="text"
                  value={teacherQuestion}
                  onChange={(e) => setTeacherQuestion(e.target.value)}
                />
                <TeacherButton onClick={updateQuestion}>Set Question</TeacherButton>
              </TeacherContainer>
            )}
            
          </ScrollContainer>
        </WhiteBackground>
      </AbsoluteContainer>
      <HeaderTitle>Homework</HeaderTitle>
      <WelcomeBanner>Welcome {`First Name`}</WelcomeBanner>
      <Todolist />
    </HomeworkPageContainer>
  );
};

export default HomeworkPage;
