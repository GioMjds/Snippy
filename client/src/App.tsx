import './App.css'
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './layouts/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  )
}

export default App