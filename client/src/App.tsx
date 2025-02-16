import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import Homepage from './pages/Homepage';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode='wait' initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} /> 
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App