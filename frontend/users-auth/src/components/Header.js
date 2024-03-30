import React, { useState,useEffect } from "react";
import Logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropDown";
import ElipsisMenu from "./ElipsisMenu";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";
import SignoutIcon from "../assets/signout.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header({ setIsBoardModalOpen, isBoardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [name,setName] = useState('') //สร้าง state 

  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  
  const boards = useSelector((state) => {
    return state.boards.boards
  });
  const board = boards && boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") { // target ไว้ระบุต้นทางเหตุการณ์ textcontent เป็นค่าข้อความที่อยู่ภายใน element
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      const name = board.name
      console.log(name)
      axios.post('http://localhost:3001/test2',{name})
      
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  useEffect(() => { //ใช้ในการจัดการ side effects โดยจะทำงานหลังจากที่ component ถูก render
    const username = localStorage.getItem('username')
    setName(username)
  }, [])
  
  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('index')
    navigate('/login')
  }
  
  

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">
      <header className=" flex justify-between dark:text-white items-center  ">
        {/* Left Side  */}
        <div className=" flex items-center space-x-2  md:space-x-4">
          <img src={Logo} alt=" Logo " className=" h-6 w-6" />
          <h5 className=" md:text-4xl  hidden md:inline-block font-bold mr-[30px] font-sans">
            {name}
          </h5>
          <div className=" flex items-center border-2 rounded-lg">
            <h3 className=" max-w-[400px] md:text-2xl  text-xl font-bold font-sans p-2  ">
              Board Name : {board && board.name}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt=" dropdown icon"
              className=" w-3 ml-2 md:hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>

        {/* Right Side */}

        <div className=" flex space-x-4 items-center md:space-x-6 ">
          <button
            className=" bg-[#635fc7] py-2 px-4 rounded-full text-white text-lg font-semibold hover:opacity-80 duration-200 hidden md:block"
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            + Add New Task
          </button>
          <button
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
            className=" bg-[#635fc7]  rounded-full text-white text-lg font-semibold hover:opacity-80 duration-200 py-1 px-3 md:hidden "
          >
            +
          </button>

          <img
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false)
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            src={elipsis}
            alt="elipsis"
            className=" cursor-pointer h-6"
          />
          <img
            onClick={handleSignOut}
            src={SignoutIcon}
            alt="signout"
            className=" cursor-pointer h-6 "
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              type="Boards"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>

        {openDropdown && (
          <HeaderDropDown
            setOpenDropdown={setOpenDropdown}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        )}
      </header>
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}
      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
