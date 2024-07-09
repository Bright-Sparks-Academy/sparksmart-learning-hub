import React from 'react';
import styled from 'styled-components';
import Todolist from './Todolist';

// Author: John Nguyen
// Design the the Homework website page 

// make a position of HomeworkPageContainer
const HomeworkPageContainer = styled.div`
  position: relative;
`;
//move the location of contain to the right way 
const AbsoluteContainer = styled.div`
  position: absolute;
  width: 1385px;
  height: 681px;
  top: 154px;
  left: 20px;
`;
//Build the scroll container to scroll the task
const ScrollContainer = styled.div`
  overflow-y:auto; /* Equivalent to overscroll-auto */
  top:20px;
  position:absolute;
  width:1320px;
`;
//Build yellow background to container
const YellowBackground = styled.div`
  position: absolute;
  width: 1385px;
  height: 505px;
  border-radius: 0.5rem;
  top: 11rem;
  left: 0;
  background-color: #f7f03e;
`;
//Build white background to container
const WhiteBackground = styled.div`
  position: absolute;
  width: 1350px;
  height: 470px;
  top: 202px;
  border-radius: 1rem;
  left: 20px;
  background-color: white;
`;
//Build Taskheader container
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
//Build Taskheader text
const TaskHeaderItem = styled.span`
  font-weight: bold;
  font-size: 0.875rem;
`;
//Build TaskHeader button to fit the task header container
const TaskButton = styled.button`
  background-color: black;
  color: #f7f03e;
  padding: 0.5rem 2.5rem;
  border-radius: 0.5rem;
  margin-left: 1rem;
  cursor: pointer;
`;
//Build Headtitle style of the Text Homework
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
//Build WelcomBanner to the the Text welcom firstname
const WelcomeBanner = styled.div`
  position: absolute;
  width: 362px;
  height: 63px;
  top: 250px;
  left: 20px;
  border-radius: 0.5rem;
  background-color: #f7f03e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: black;
`;
//Build the another task container
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
//Build the label style to fit the container
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
            <span className="relative left-[20px]">Decimal Practices #1</span>
            <TaskHeaderItem className="relative left-[40px]">06/23</TaskHeaderItem>
            <TaskHeaderItem className="relative left-[55px]">100</TaskHeaderItem>
            <div className="flex items-center">
              <TaskButton>View</TaskButton>
              <TaskButton>Submit</TaskButton>
            </div>
           </TaskHeader>

          <TaskLabels>
            <span className="relative left-[20px]">Decimal Practices #1</span>
            <TaskHeaderItem className="relative left-[40px]">06/23</TaskHeaderItem>
            <TaskHeaderItem className="relative left-[55px]">100</TaskHeaderItem>
            <div className="flex items-center">
              <TaskButton>View</TaskButton>
              <TaskButton>Submit</TaskButton>
            </div>
          </TaskLabels>
          

          <Label style={{ top: '15px', left: '50px', width: '135px' }}>
            Assignment
          </Label>
          <Label style={{ top: '-22px', left: '400px', width: '135px' }}>
            Due Date
          </Label>
          <Label style={{ top: '-60px', left: '660px', width: '164px' }}>
            Points
          </Label>
          <Label style={{ top: '-99px', left: '1040px', width: '220px' }}>
            Submission
          </Label>
          </ScrollContainer>
        </WhiteBackground>
      </AbsoluteContainer>
      <HeaderTitle>HomeWork</HeaderTitle>
      <WelcomeBanner>Welcome {`First Name`}</WelcomeBanner>
      <Todolist />
    </HomeworkPageContainer>
  );
};

export default HomeworkPage;


