import { Routes, Route } from 'react-router-dom';
import './App.css';
import Welcome from './pages/Welcome';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {

  const isUserSignIn = !!localStorage.getItem('token')

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Welcome/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        {isUserSignIn && <Route path='/account' element={<Account/>} />}
      </Routes>
    </div>
  );
}

export default App;
