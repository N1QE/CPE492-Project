import { useState,useEffect } from "react"
import React from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import loginicon from '../assets/loginicon.png'

function Login() {

    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
      
        fetchUsers();

    }, [])

    const fetchUsers  = () => {
        axios 
        .get('http://localhost:3001/register')
        .then((res) => {
            console.log(res.data)
        })
    }

    const handleLogin =  async (event) => {
        event.preventDefault();
        try{
            
            const response = await axios.post('http://localhost:3001/login', {username,password})
            const token = response.data.token
            const loggedInUsername = username;
            alert(`Login successful. Welcome, ${loggedInUsername}!`)
            setUsername('')
            setPassword('')
            fetchUsers();
            navigate('/account')
            window.location.reload()
            localStorage.setItem('token',token)
            localStorage.setItem('username',username)
            localStorage.setItem('index',0)
        }catch (error) {
            console.log('Login Error')
        }
    }




  return (
    <div className='w-full h-screen flex '>
        <div className='w-full  bg-slate-100 text-white flex justify-center items-center '>
            <form className='rounded-lg w-[500px] h-[450px] p-9 bg-[#635FC7] border-[#ffffff] border-[5px] mt-[40px] '
            onSubmit={handleLogin}>
                <div className="flex flex-col items-center">
                    <img src={loginicon} className="max-w-20 h-auto "/>
                    <br/>
                    <hr/>
                {/* USERNAME INPUT */}
                <div className="flex flex-col gap-2 ">
                    <label>Username : </label>
                    <input className='w-[400px] rounded-xl bg-white p-2 hover:bg-blue-100 font-semi hover:shadow-xl text-black'
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <br/>
                {/* PASSWORD INPUT */}
                <div className="flex flex-col gap-2">
                    <label>Password : </label>
                    <input className='w-[400px] rounded-xl bg-white p-2 hover:bg-blue-100 text-black'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                
                <br/>
                <br/>
                {/* BUTTON */}
                <button className='w-[200px] h-[50px] border rounded-md bg-white text-[#635fc7] hover:bg-blue-100 hover:text-[#635fc7] text-xl font-semibold'
                type='submit'>Login </button>
                </div>
                
            </form>
        </div>
        
    </div>
  )
}

export default Login