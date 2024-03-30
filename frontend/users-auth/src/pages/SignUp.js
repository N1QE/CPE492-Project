import { useState,useEffect } from "react"
import React from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import signupicon from '../assets/signupicon.png'

function SignUp() {

    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
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
    
    const handleRegister = (event) => {
        event.preventDefault()
        axios
        .post('http://localhost:3001/register', { email, username, password})
        .then( () => {
            alert('Registration Succesful')
            setEmail('')
            setUsername('')
            setPassword('')
            fetchUsers()
            navigate('/login')
        })
        .catch((error) => {
            console.log('Unable to register')
        })
    }
    


  return (
    <div className='w-full h-screen flex'>
        <div className='w-full h-[100%] bg-slate-100 text-white flex items-center justify-center '>
            <form className='rounded-lg w-[600px] h-[500px] p-9 bg-[#635fc7] border-[5px] border-white mt-10 '
            onSubmit={handleRegister}>
                <div className="flex flex-col items-center">
                    <img src={signupicon} className="max-w-20 h-auto"/>
                    {/* EMAIL INPUT */}
                    <div className="flex flex-col gap-2 ">

                        <label>Email :</label>
                        <input className='w-[400px] rounded-xl bg-white p-2  hover:bg-blue-100 text-black'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                        
                    
                    </div>
                    <br/>
                    
                    {/* USERNAME INPUT */}
                    <div className="flex flex-col gap-2 ">
                    <label>Username :</label>
                    <input className='w-[400px] rounded-xl bg-white p-2 hover:bg-blue-100 text-black'
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <br/>

                    {/* PASSWORD INPUT */}
                    <div className="flex flex-col gap-2 ">
                    <label>Password :</label>
                    <input className='w-[400px] rounded-xl bg-white p-2 hover:bg-blue-100 text-black'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <br/>

                    {/* BUTTON */}
                    <button className='w-[200px] h-[50px] border rounded-md bg-white text-[#635fc7] hover:bg-blue-100 hover:text-[#635fc7] text-xl font-semibold'
                    type='submit'>Sign up</button>

                </div>
                
            </form>
        </div>
        
    </div>
  )
}

export default SignUp