import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";

function Task({ colIndex, taskIndex }) {
  
  const boards = useSelector((state) => {
    return state.boards.boards
  });
  const board = boards && boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  
  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => { //ใช้ foreach เพื่อ loop array
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData( //ใช้เพื่อกำหนดข้อมูลที่จะถูกลากไป
      "text", //กำหนดชนิดข้อมูลที่ถูกลาก
      JSON.stringify({ taskIndex, prevColIndex: colIndex }) //แปลงข้อมูลให้เป็น JSON
    );
  };

  return (
    <div className="flex ">
      
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable={isDraggable}
        onDragStart={handleOnDrag}
        className="w-[270px] first:my-5  bg-white rounded-tl-lg rounded-bl-lg dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer "
      > 
        <p className=" font-bold tracking-wide ">{task.title}</p>
        <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
         {completed} of {subtasks.length} completed tasks 
        </p>
      </div>
      <div className={`${task.color} w-[20px] h-[96px] mt-[20px] rounded-tr-lg rounded-br-lg `}>
        
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
      
    </div>
    
  );
}

export default Task;
