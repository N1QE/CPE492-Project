import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";
import { updateData } from "../redux/boardsSlice";
import store from '../redux/store';
import axios from "axios";

function AddEditTaskModal({
  type,
  device,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("bg-[#2b2c37]")
 
  const boards = useSelector((state) => {
    return state.boards.boards
  });
  const board = boards && boards.find((board) => board.isActive);

  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([]);
  
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);
  const [isFocused5, setIsFocused5] = useState(false);
  const [isFocused6, setIsFocused6] = useState(false);
  const [isFocused7, setIsFocused7] = useState(false);
  const [isFocused8, setIsFocused8] = useState(false);

  const handleFocus1 = () => {
    setIsFocused1(true);
  }
  const handleBlur1 = () => {
    setIsFocused1(false);
  }
  const handleFocus2 = () => {
    setIsFocused2(true);
  }
  const handleBlur2 = () => {
    setIsFocused2(false);
  }
  const handleFocus3 = () => {
    setIsFocused3(true);
  }
  const handleBlur3 = () => {
    setIsFocused3(false);
  }
  const handleFocus4 = () => {
    setIsFocused4(true);
  }
  const handleBlur4 = () => {
    setIsFocused4(false);
  }
  const handleFocus5 = () => {
    setIsFocused5(true);
  }
  const handleBlur5 = () => {
    setIsFocused5(false);
  }
  const handleFocus6 = () => {
    setIsFocused6(true);
  }
  const handleBlur6 = () => {
    setIsFocused6(false);
  }
  const handleFocus7 = () => {
    setIsFocused7(true);
  }
  const handleBlur7 = () => {
    setIsFocused7(false);
  }
  const handleFocus8 = () => {
    setIsFocused8(true);
  }
  const handleBlur8 = () => {
    setIsFocused8(false);
  }

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    if (type === "add") {

      const updateBoards = store.getState().boards.boards;
      const updateboard = updateBoards && updateBoards.find((board) => board.isActive);
      console.log("1==>",updateboard)
      const findColumn = updateboard.columns && updateboard.columns.find(item => item.name === status);
      console.log("2==>",findColumn)
      console.log("length==>",findColumn.tasks.length)
      if(findColumn.tasks.length < 10){

        dispatch(boardsSlice.actions.addTask({title,description,color,subtasks,status,newColIndex,}));
        const updateBoards = store.getState().boards.boards;
        const updateboard = updateBoards && updateBoards.find((board) => board.isActive);
        const _id = updateboard._id
        const name = updateboard.name
        const columns = updateboard.columns
        axios.put('http://localhost:3001/account',{_id,name,columns})

      }
      else{
        alert("There are too many tasks in this column")
      }
      

    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          color,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
      const updateBoards = store.getState().boards.boards;
      const updateboard = updateBoards && updateBoards.find((board) => board.isActive);
      const _id = updateboard._id
      const name = updateboard.name
      const columns = updateboard.columns
      axios.put('http://localhost:3001/account',{_id,name,columns})
    }
  };

  return (
    <div
      className={
        device === "mobile"
          ? "  py-6 px-6 pb-40  absolute overflow-y-scroll scrollbar-hide left-0 flex  right-0 bottom-[-100vh] top-0 dropdown "
          : "  py-6 px-6 pb-40  absolute overflow-y-scroll scrollbar-hide left-0 flex  right-0 bottom-0 top-0 dropdown "
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      {/* Modal Section */}

      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" e.g Take coffee break"
          />
        </div>

        {/* Description */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className=" bg-transparent outline-none min-h-[170px] focus:border-0 px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] "
            placeholder="type something to describe the task"
          />
        </div>
        {/*Colors*/}
        <div className="mt-5 ">
          <label className="  text-sm dark:text-white text-gray-500">
            Colors
          </label>
          <div className="flex justify-center space-x-6">
            
            <div className= {`rounded-full w-6 h-6 mt-3 bg-red-500 ${ isFocused1 ? "border-2" : "border-0" }`}
            onFocus={handleFocus1}
            onBlur={handleBlur1}
            tabIndex="0"
            onClick={() => setColor("bg-red-500")}
            />
            <div className= {`rounded-full w-6 h-6 mt-3 bg-blue-500 ${ isFocused2 ? "border-2" : "border-0" }`}
            onFocus={handleFocus2}
            onBlur={handleBlur2}
            tabIndex="0"
            onClick={() => setColor("bg-blue-500")}
            />
            <div className= {`rounded-full w-6 h-6 mt-3 bg-pink-300 ${ isFocused3 ? "border-2" : "border-0" }`}
            onFocus={handleFocus3}
            onBlur={handleBlur3}
            tabIndex="0"
            onClick={() => setColor("bg-pink-300")}
            />
            <div className= {`rounded-full w-6 h-6 mt-3  bg-yellow-300 ${ isFocused4 ? "border-2" : "border-0" }`}
            onFocus={handleFocus4}
            onBlur={handleBlur4}
            tabIndex="0"
            onClick={() => setColor("bg-yellow-500")}
            />
            <div className= {`rounded-full w-6 h-6 mt-3  bg-orange-500 ${ isFocused5 ? "border-2" : "border-0" }`}
            onFocus={handleFocus5}
            onBlur={handleBlur5}
            tabIndex="0"
            onClick={() => setColor("bg-orange-500")}
            />
            <div className= {`rounded-full w-6 h-6 mt-3 bg-black ${ isFocused6 ? "border-2" : "border-0" }`}
            onFocus={handleFocus6}
            onBlur={handleBlur6}
            tabIndex="0"
            onClick={() => setColor("bg-black")}
            />
            <div className= {`rounded-full w-6 h-6 mt-3 bg-slate-200 ${ isFocused7 ? "border-2" : "border-0" }`}
            onFocus={handleFocus7}
            onBlur={handleBlur7}
            tabIndex="0"
            onClick={() => setColor("bg-slate-200")}
            />
            <div className= {`rounded-full w-6 h-6 mt-3 bg-gray-600 ${ isFocused8 ? "border-2" : "border-0" }`}
            onFocus={handleFocus8}
            onBlur={handleBlur8}
            tabIndex="0"
            onClick={() => setColor("bg-gray-600")}
            />
            
            
          </div>
        </div>

        {/* Subtasks */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Subtasks
          </label>

          {subtasks.map((subtask, index) => (
            <div key={index} className=" flex items-center w-full ">
              <input
                onChange={(e) => {
                  onChangeSubtasks(subtask.id, e.target.value);
                }}
                type="text"
                value={subtask.title}
                className=" bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]  "
                placeholder=" e.g Take coffee break"
              />
              <img
                src={crossIcon}
                onClick={() => {
                  onDelete(subtask.id);
                }}
                className=" m-4 cursor-pointer "
              />
            </div>
          ))}

          <button
            className=" w-full items-center dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full "
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
          >
            + Add New Subtask
          </button>
        </div>

        {/* current Status  */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            value={status}
            onChange={onChangeStatus}
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((column, index) => (
              <option key={index} className="dark:bg-[#2b2c37]"
              >{column.name}</option>
            ))}
          </select>
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setIsAddTaskModalOpen(false);
                type === "edit" && setIsTaskModalOpen(false);
              }
            }}
            className=" w-full items-center text-white bg-[#635fc7] py-2 rounded-full "
          >
           {type === "edit" ? " save edit" : "Create task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
