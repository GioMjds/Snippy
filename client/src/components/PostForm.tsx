import { motion } from "framer-motion"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

interface PostFormProps {
  userProfileImage?: string;
  onStartPostClick: () => void;
}

const PostForm: FC<PostFormProps> = ({ userProfileImage, onStartPostClick }) => {
  const profileImageSrc = userProfileImage || "https://via.placeholder.com/40x40/png";

  const navigate = useNavigate();

  const navigateToProfile = async () => {
    // Navigate to user profile, using navigate params will do
    navigate('/profile/:userId');
  }
  
  return (
    <motion.div
      className="bg-white rounded-md shadow-sm p-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <img 
            src={profileImageSrc} 
            alt={profileImageSrc} 
            className="w-full h-full object-cover border-2 border-gray-800 rounded-full cursor-pointer" 
            onClick={navigateToProfile}
          />
        </div>

        {/* Post Input Area */}
        <button
          onClick={onStartPostClick}
          className="flex-grow bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 text-gray-500 text-left cursor-pointer focus:outline-none"
        >
          Post a code snippet
        </button>
      </div>
    </motion.div>
  )
}

export default PostForm