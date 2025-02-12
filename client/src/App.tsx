import './App.css'
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/`);
      console.log(response.data.message);
      setMessage(response.data.message);
    }

    fetchMessage();
  }, []);

  return (
    <>
      <h1 className='text-2xl'>{message}</h1>
    </>
  )
}

export default App