// src/components/HomeworkPage.js

import React from 'react';
import Todolist from './Todolist';

const HomeworkPage = () => {
  return (
    <div >
      <div >
            <div className="absolute w-[1385px] h-[681px] top-[154px] left-[114px]">
             <div className="absolute w-[1385px] h-[505px] rounded-lg top-44 left-0 bg-[#f7f03e]" />
          <div className="absolute w-[1350px] h-[470px]  top-[202px] rounded-xl left-[20px] bg-white">
            
            <div className="flex justify-between items-center p-2 mb-2  absolute w-[1250px] h-[46px] top-[125px] left-10 rounded-[20px] mx-auto">
              <div className="flex justify-between items-center  p-2 mb-2 absolute w-[1250px] h-[40px] top-0 left-0 bg-[#d9d9d9] rounded-[20px] mx-auto" > 
              <span className= "relative left-[20px]">Decimal Practices #1</span>
              <span className="font-bold text-sm relative left-[40px]">06/23</span>
              <span className=" font-bold relative left-[55px] text-sm">100</span>
              
              <div className="relative  left-[200px] right-[-250px]">
              <button className=" bg-black text-yellow-400  px-10 py-1  rounded-md mr-10">View</button>
              </div>
              <button className=" bg-black text-yellow-400  relative left-[300 px] right-0 px-10 py-1 rounded-md mr-2">Submit</button>
              
              </div>
              
            </div>

            <div className="absolute w-[1024px] h-[38px] top-[62px] left-10">
            <div className="flex justify-between items-center  p-2 mb-2 absolute w-[1250px] h-[40px] top-0 left-0 bg-[#d9d9d9] rounded-[20px] mx-auto" > 
              <span className= "relative left-[20px]">Decimal Practices #1</span>
              <span className="font-bold text-sm relative left-[40px]">06/23</span>
              <span className=" font-bold relative left-[55px] text-sm">100</span>
              
              <div className="relative  left-[200px] right-[-250px]">
              <button className=" bg-black text-yellow-400  px-10 py-1  rounded-md mr-10">View</button>
              </div>
              <button className=" bg-black text-yellow-400  relative left-[300 px] right-0 px-10 py-1 rounded-md mr-2">Submit</button>
              
              </div>
            </div>

            <div className="absolute w-48 h-[27px] top-[18px] left-[63px] bg-black rounded-[20px]">
              <div className="absolute w-[135px] top-[-2px] left-[23px] font-bold text-white text-xl tracking-[1.20px] leading-[normal] whitespace-nowrap">
                Assignment
              </div>
            </div>
            
            <div className="absolute w-48 h-[29px] top-4 left-[352px] bg-black rounded-[20px]" >
            <div className="absolute w-[135px] top-[-2px] left-[40px] font-bold text-white text-xl tracking-[1.20px] leading-[normal] whitespace-nowrap">
                Due Date
              </div>
            </div>
            
            <div className="absolute w-[164px] h-[27px] top-3.5 left-[594px] bg-black rounded-[20px]" >
            <div className="absolute w-[135px] top-[-2px] left-[50px] font-bold text-white text-xl tracking-[1.20px] leading-[normal] whitespace-nowrap">
                Points
              </div>
            </div>

            <div className="absolute w-[220px] h-[27px] top-3.5 left-[1007px] bg-black rounded-[20px]" >
            <div className="absolute w-[135px] top-[-2px] left-[50px] font-bold text-white text-xl tracking-[1.20px] leading-[normal] whitespace-nowrap">
                Submission
              </div>  
            </div>
          </div>

          
          <div className="absolute w-[463px] top-0 left-[595px] font-bold text-black text-[40px] tracking-[2.40px] leading-[normal]">
            HomeWork
          </div>
          <div className="absolute w-[362px] h-[63px] top-[86px] left-8 rounded-lg  bg-[#f7f03e]" >
          <span className="relative  w-[751px] top-auto bottom-[-15px] left-14  font-bold text-black text-2xl tracking-[1.44px] leading-[normal]"> Welcome {`First Name`}</span>
          </div>
        </div>
       
      </div>
      <Todolist />
    </div>
    
  );
}

export default HomeworkPage;
