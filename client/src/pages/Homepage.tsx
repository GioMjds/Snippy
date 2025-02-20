import { useNavigate } from "react-router-dom"
import Feed from "../layouts/Feed"
import LeftSidebar from "../layouts/LeftSidebar"
import Navbar from "../layouts/Navbar"
import RightFooter from "../layouts/RightFooter"
import { handleLogout } from "../services/axios"

const Homepage = () => {
  const navigate = useNavigate();
  const logoutButton = async () => {
    try {
      const response = await handleLogout();
      if (response.status === 200) {
        console.log("Log out successful");
        sessionStorage.removeItem('session_token');
        navigate('/login');
      } else {
        console.error("Log out failed");
      }
    } catch (error) {
      console.error(`Error during logout: ${error}`);
    }
  }

  return (
    <>
      <Navbar />
      <LeftSidebar />
      <Feed />
      <RightFooter />
      <button 
        onClick={logoutButton}
        className="p-4 bg-indigo-600 text-white"
      >
        Log Out
      </button>
    </>
  )
}

export default Homepage