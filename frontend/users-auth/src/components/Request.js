import React,{ useState} from 'react'
import axios from 'axios'
import YesIcon from '../assets/YesIcon.png'
import NoIcon from '../assets/NoIcon.png'
import {fetchData} from "../redux/boardsSlice"
import { useDispatch } from 'react-redux'

function Request({data,setIsRequestModalOpen}) {

    const dispatch = useDispatch();

    const onAccept = async () => {
        
        const _id = data._id
        console.log("id==>",_id)
        const username = localStorage.getItem('username')
        const boardname = data.boardname
        console.log("username==>",username)
        axios.put('http://localhost:3001/share',{_id,username})
        axios.put('http://localhost:3001/request',{username,boardname})
        dispatch(fetchData())
        setIsRequestModalOpen(false)
        
    };

    const onReject = async () => {
        
        const username = localStorage.getItem('username')
        const boardname = data.boardname
        console.log("Boardname==>",boardname)
        axios.put('http://localhost:3001/request',{username,boardname})
        setIsRequestModalOpen(false)

    };
    

  return (
    <div
    className='flex justify-between  p-2 '>
        <div className='flex justify-between rounded-md p-2 gap-2 items-center border-2 w-full'>
        <p>Boardname :</p>
        <p>{data.boardname}</p>
        <p>Sender :</p>
        <p>{data.sender}</p>  
        </div>
        
        <div className='flex ml-5 gap-2'>

            <img src={YesIcon} className='w-10 h-10 cursor-pointer'
            onClick={onAccept}/>
            <img src={NoIcon} className='w-10 h-10 cursor-pointer'
            onClick={onReject}/>
        </div>
        


    </div>
    
  )
}

export default Request