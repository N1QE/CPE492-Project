import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice, { fetchData } from "../redux/boardsSlice";
import Task from "./Task";
import store from '../redux/store';
import axios from "axios";

function Column({ colIndex }) {

  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ]; 

  const dispatch = useDispatch(); 
  const [color, setColor] = useState(null)
  const boards = useSelector((state) => { //ใช้ useSelector เพื่อดึงข้อมูลจาก redux store
    return state.boards.boards
  });
  
  const board = boards && boards.find((board) => board.isActive === true); //กำหนดค่าให้ตัวแปรโดยใช้ method find
  const col = board.columns.find((col, i) => i === colIndex);
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [dispatch]); //useDispatch ส่ง action เพื่อเปลี่ยนแปลง state ใน Redux store 

  

  const handleOnDrop = (e) => { //e อ็อบเจกต์ Event ที่ถูกส่งเข้ามา

    const { prevColIndex , taskIndex } = JSON.parse( //ใช้แปลง JSON string ที่ได้มาเป็น Object
      e.dataTransfer.getData("text") //ใช้เพื่อดึงข้อมูลที่ถูกลากมาจากการ Drag and Drop
    );
    const data = e.dataTransfer.getData("text"); // ดึงข้อมูลที่ถูกลากมา
    const droppedData = JSON.parse(data); // แปลงข้อมูล JSON เป็น Object
    console.log(droppedData); // ทำอะไรกับข้อมูลที่ได้รับต่อไป

    if (colIndex !== prevColIndex) { //ตรวจสอบเงื่อนไข
      dispatch(
        boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex }) //ทำการ dispatch
      );
      const updateBoards = store.getState().boards.boards;
      const updateboard = updateBoards && updateBoards.find((board) => board.isActive);
      const _id = updateboard._id
      const name = updateboard.name
      const columns = updateboard.columns
      axios.put('http://localhost:3001/account',{_id,name,columns})
    }
  };

  const handleOnDragOver = (e) => { //e object event
    e.preventDefault(); //ใช้เพื่อป้องกันการกระทำที่เป็นค่าเริ่มต้นของเบราว์เซอร์
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="scrollbar-hide   mx-5 pt-[90px] min-w-[280px] "
    >
      <p className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${color} `} />
        {col.name} ({col.tasks.length})
      </p>
      
      {col.tasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;
