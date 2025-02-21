import { useNavigate } from "react-router-dom"
import Feed from "../layouts/Feed"
import Navbar from "../layouts/Navbar"
import RightFooter from "../layouts/RightFooter"
import { handleLogout } from "../services/axios"
import PostForm from "../components/PostForm"

const Homepage = () => {
  const navigate = useNavigate();
  const logoutButton = async () => {
    try {
      const response = await handleLogout();
      if (response.status === 200) {
        console.log("Log out successful");
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
      <PostForm />
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