import React from 'react';
import styled from 'styled-components';
import Todolist from './Todolist';

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

const HomeworkPage = () => {
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