import React from 'react';
import styled from 'styled-components';

//Build the Todolist part like this picture

//Build the Todoliscontainer shape and background color yellow
const TodolistContainer = styled.div`
  position: absolute;
  width: 653px;
  height: 753px;
  top: 854px;
  left: 20px;
  background-color: #FFD900; /* Equivalent to bg-yellow-400 */
  border-radius: 1rem; /* Equivalent to rounded-xl */
  padding: 1.5rem; /* Equivalent to p-6 */
  overflow: hidden;
`;
//Build the TodolistInner with background white to fit the container
const TodolistInner = styled.div`
  position: relative;
  width: 563px;
  height: 682px;
  top: 1rem; /* Equivalent to top-4 */
  left: 35px;
  background-color: white;
  padding: 1.5rem; /* Equivalent to p-6 */
  border-radius: 1rem; /* Equivalent to rounded-lg */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); /* Equivalent to shadow-inner */
`;
//Build the Header to fit the text Todolist , title , and navbutton inside the container
const Header = styled.div`
  text-align: center;
  margin-bottom: 1rem; /* Equivalent to mb-4 */
`;
//Build Title to fit the container
const Title = styled.h2`
  font-size: 1.5rem; /* Equivalent to text-2xl */
  font-weight: bold;
`;
//Build the Subtitle to fit the container
const SubTitle = styled.p`
  font-size: 1.125rem; /* Equivalent to text-lg */
  font-weight: 600; /* Equivalent to font-semibold */
`;
//Build the NavButton to fit in calender
const NavButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem; /* Equivalent to mb-4 */
`;
//Build the style of Navbutton
const NavButton = styled.button`
  background-color: black;
  color: white;
  border-radius: 50%;
  width: 2rem; /* Equivalent to w-8 */
  height: 2rem; /* Equivalent to h-8 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem; /* Equivalent to mr-2 and ml-2 */
`;
//Build the title of calendar
const WeekDisplay = styled.p`
  font-weight: 600; /* Equivalent to font-semibold */
  background-color: #f7f03e; /* Equivalent to bg-primary-color */
  color: black;
  padding: 0.25rem 1.25rem; /* Equivalent to py-1 and px-5 */
  font-size: 1rem; /* Equivalent to text-base */
  text-align: center;
  cursor: pointer;
  margin-right: 1rem; /* Equivalent to mr-4 */
  outline: none;
  box-shadow: 0 1px black; /* Equivalent to shadow-[0_1px_black] */
  border-radius: 0; /* Equivalent to rounded-[0px] */
`;
//Build the scroll container to fit the box of task container
const ScrollContainer = styled.div`
  overflow-y: auto; /* Equivalent to overscroll-auto */
  height:92px;
  position:absolute;
  width:550px;
`;
//Build the Taskcontainer 
const TaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e5e7eb; /* Equivalent to bg-gray-200 */
  padding: 0.5rem; /* Equivalent to p-2 */
  margin-bottom: 0.5rem; /* Equivalent to mb-2 */
  border-radius: 0.375rem; /* Equivalent to rounded-md */
  width: 456px;
  margin: 0 auto; /* Equivalent to mx-auto */
  position:relative;
`;
//Build the Task Button to fit the container
const TaskButton = styled.button`
  background-color: black;
  color: #f59e0b; /* Equivalent to text-amber-400 */
  padding: 0.25rem 0.5rem; /* Equivalent to px-2 and py-1 */
  cursor: pointer;
  border-radius: 0.375rem; /* Equivalent to rounded-md */
 
`;

const Todolist = () => {
  return (
    <TodolistContainer>
      <TodolistInner>
        <Header>
          <Title>To-Do List</Title>
          <SubTitle>June 2024</SubTitle>
          <NavButtonsContainer>
            <NavButton>{'<'}</NavButton>
            <WeekDisplay>Week 3: 06/17 - 06/23</WeekDisplay>
            <NavButton>{'>'}</NavButton>
          </NavButtonsContainer>
        </Header>
        <ScrollContainer>
          <TaskContainer style ={{ top: '2px', left: '12px', width: '460px' }} >
            <span>Decimal Practices #1-3</span>
            <span className="text-sm">06/18</span>
            <TaskButton>View</TaskButton>
          </TaskContainer>
          <TaskContainer  style={{ top: '7px', left: '12px', width: '460px' }}>
            <span>Fraction Multiplication</span>
            <span className="text-sm">06/22</span>
            <TaskButton >View</TaskButton>
          </TaskContainer>
        </ScrollContainer>
      </TodolistInner>
    </TodolistContainer>
  );
};

export default Todolist;
