import React from 'react';

const Todolist = () => {
      
  return (
    <div className="absolute w-[653px] h-[753px] top-[854px] left-[189px] bg-yellow-400 rounded-xl p-6 overflow-hidden">
      <div className="relative w-[563px] h-[682px] top-4 left-[35px] bg-white p-6 rounded-lg  shadow-inner">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">To-Do List</h2>
          <p className="text-lg font-semibold">June 2024</p>
          <div className="flex justify-center items-center mb-4">
          <button className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 ">{'<'}</button>
          <p className=" inline  font-semibold bg-primary-color  text-black py-1 px-5 text-base text-center cursor-pointer mr-4 outline-none shadow-[0_1px_black] rounded-[0px]">
           <span>Week 3: 06/17 - 06/23</span>
          </p>
          <button className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center ml-2">{'>'}</button>
          </div>
        </div>
       
        <div className= "overscroll-auto">
          <div className="flex justify-between items-center bg-gray-200 p-2 mb-2 rounded-md w-[456px] mx-auto">
            <span>Decimal Practices #1-3</span>
            <span className="text-sm">06/18</span>
            <button className="bg-black text-amber-400 px-2 py-1  cursor-pointer rounded-md">View</button>
          </div>
          <div className="flex justify-between items-center bg-gray-200 p-2  mb-2 rounded-md w-[456px] mx-auto">
            <span>Fraction Multiplication</span>
            <span className="text-sm">06/22</span>
            <button className="bg-black text-amber-400 px-2 cursor-pointer py-1 rounded-md">View</button>
          </div>
        </div>
      </div>
    </div>
        
      
    
  );
};

export default Todolist;