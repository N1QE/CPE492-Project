import React from 'react';
import Kanban from '../assets/kanban2.jpg'
import Hi from '../assets/hiemoji.png'

function Home() {
  return (
    <div className='w-full h-screen bg-[#f3f3f5] text-black flex items-center justify-center '>
        
        <div className='flex flex-col items-center  bg-[#ffffff] rounded-md p-10 shadow-2xl border-[#635fc7] border-[4px]'>
          <div className='flex flex-'>
            <img src={Hi} className='max-w-20'/>
            <h1 className='text-5xl m-3'>Welcome to our website</h1>
          </div>
          
          
          <div className='max-w-xl h-auto'> 
            <img src={Kanban}/>  
          </div>
        </div>
        
    </div>
  )
}

export default Home