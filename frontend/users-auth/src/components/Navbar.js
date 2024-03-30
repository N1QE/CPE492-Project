import React from 'react'
import { Link , useNavigate } from 'react-router-dom'

function Navbar() {
  const isUserSignIn = !!localStorage.getItem('token') //ใช้ตรวจสอบว่า user login อยู่หรือไม่
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('index')
    navigate('/login')
  }

  return (
    <nav className='flex fixed w-full justify-between p-4 border-b border-white items-center bg-[#635FC7] text-white font-bold '>
        <Link to='/'><h1 className='text-4xl'>KANBAN BOARD</h1></Link>
        <ul className='flex gap-10 text-xl '>
            {isUserSignIn ? (
            <>
            <Link to='/account'><li>Account</li></Link>
            <li><button onClick={handleSignOut}>Sign Out</button></li>
            </>
            ) : (
              <>
              <Link to='/login'><li>Login</li></Link>
              <Link to='/signup'><li>Sign up</li></Link>
              </>
            )}   
        </ul>
    </nav>
  )
}

export default Navbar