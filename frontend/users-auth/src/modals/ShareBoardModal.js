import store from '../redux/store';
import React, { useState,useEffect} from 'react'
import axios from 'axios'


function ShareBoardModal({setIsShareBoardModalOpen}) {

    const [username, setUsername] = useState("")

    const setOpenShareBoardModal = () => {
        setIsShareBoardModalOpen(false);
        console.log("Open")
    };

    const handleSubmit =  async () => {

        try{
            
            const response = await axios.get('http://localhost:3001/register')
            const usernameArray = response.data && response.data.map(data => data.username)
            console.log(usernameArray)
            if (usernameArray.includes(username)) {
                const updateBoards = store.getState().boards.boards;
                const updateboard = updateBoards && updateBoards.find((board) => board.isActive);
                const sender = localStorage.getItem('username')
                const _id = updateboard._id
                const boardname = updateboard.name
                console.log("sender===>",sender)
                console.log("boardname===>",boardname)
                console.log("_id===>",_id)
                console.log("username==>",username)
                axios.post('http://localhost:3001/request',{_id,username,boardname,sender})
                setIsShareBoardModalOpen(false);
                alert("The Request has been sent")

            } else {
                console.log("N");
            }

            
        }catch (error) {
            console.log('Login Error')
        }
    }
   

  return (
    <div
      className="  fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenShareBoardModal();
      }}
    >
      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl"
      >
        <h3 className='text-lg'>
            Share The Board
        </h3>
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Username
          </label>
          <input
            className=" bg-transparent  px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder="type username to share the board"
            onChange={(e) => setUsername(e.target.value)}
            id="board-name-input"
          />
        </div>
        <div className=" flex w-full mt-10 items-center justify-center space-x-4 ">
            <button
              className=" w-full items-center hover:opacity-70 dark:text-white dark:bg-[#635fc7] relative  text-white bg-[#635fc7] py-2 rounded-full"
              onClick={handleSubmit}
            >
              Confirm
            </button>
            <button
            onClick={() => {
                setIsShareBoardModalOpen(false);
            }}
            className="w-full items-center text-[#635fc7] dark:bg-white hover:opacity-75 bg-[#635fc71a]  py-2 rounded-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShareBoardModal