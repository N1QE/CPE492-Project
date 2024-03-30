import  React, { useState , useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux';
import boardsSlice, {fetchData} from "../redux/boardsSlice"
import Home from "../components/Home";
import Header from "../components/Header";
import EmptyBoard from '../components/EmptyBoard';
import store from '../redux/store';
import shareIcon from '../assets/shareicon.png'
import ShareBoardModal from '../modals/ShareBoardModal';
import letterIcon from '../assets/lettericon.png'
import RequestModal from '../modals/RequestModal';
import axios from 'axios';

function Account() {

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [isShareBoardModalOpen, setIsShareBoardModalOpen] = useState(false)
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [RequestData, setRequestData] = useState()
  const username = localStorage.getItem('username')

  const boards = useSelector((state) => {
    return state.boards.boards
  });
  
  const setOpenShareBoardModal = () => {
    setIsShareBoardModalOpen(true);
    console.log("Open")
  };
  
  const setOpenRequestModal = async () => {
    setIsRequestModalOpen(true);
    try{
            
      const response = await axios.get('http://localhost:3001/register')
      console.log("==>",response.data)
      const filteredArray = response.data && response.data.filter(data => data.username === username);
      console.log("filter=>",filteredArray)
      const requestArray = filteredArray && filteredArray.map(data => data.request);
      console.log("requestArray=>",requestArray)
      const filterRequestArray = requestArray.flat();
      console.log("filterRequestArray=>",filterRequestArray)
      setRequestData(filterRequestArray)
      
  }catch (error) {
    
  }

  };
  
  const activeBoard = boards && boards.find((board) => board.isActive);
  if(!activeBoard  && boards && boards.length > 0){
    const theIndex = parseInt(localStorage.getItem('index'))
    dispatch(boardsSlice.actions.setBoardActive({index:theIndex}))
  }
  
  useEffect(() => {

    dispatch(fetchData())

    }, [boards])
    
  return (

    <div className=" overflow-hidden  scrollbar-hide overflow-x-scroll">
      <>
        {boards && boards.length > 0 ?
        <>
          
          <Header
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
          />
          <Home
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
          />
          <div className="fixed w-16 h-16 bottom-0 right-0 p-4 mr-10 mb-10 rounded-full shadow-[#364e7e1a] bg-[#635fc7]"
          onClick={setOpenShareBoardModal}>
          <img src={shareIcon} alt=" share" className=" h-8 w-8 cursor-pointer" />
          </div>
          <div className="fixed w-16 h-16 bottom-0 right-0 p-4 mr-32 mb-10 rounded-full shadow-[#364e7e1a] bg-[#635fc7]"
          onClick={setOpenRequestModal}>
          <img src={letterIcon} alt=" share" className=" h-8 w-8 cursor-pointer" />
          </div>
        </>
        :
        <>
          
          <EmptyBoard type='add'/>
        </>
        }
      </>
      { isShareBoardModalOpen && ( <ShareBoardModal
      setIsShareBoardModalOpen={setIsShareBoardModalOpen}/>)}
      { isRequestModalOpen && ( <RequestModal
      setIsRequestModalOpen={setIsRequestModalOpen}
      RequestData={RequestData}
      setOpenRequestModal={setOpenRequestModal}/>)}
    </div>
    
  )
}

export default Account