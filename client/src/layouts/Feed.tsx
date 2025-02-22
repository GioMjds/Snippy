import { FC } from "react";
import { FaEllipsisV } from "react-icons/fa";
import CodeSnippet from "../components/CodeSnippet";
import { 
  FaArrowAltCircleUp, 
  FaArrowAltCircleDown, 
  FaShareAlt,
  FaCommentAlt 
} from "react-icons/fa";
import InteractionButtons from "../components/InteractionButtons";

interface FeedPostProps {
  postData?: {
    username: string;
    postTimestamp: string;
    caption: string;
    codeSnippet?: string;
    upvoteCount?: number;
    downvoteCount?: number;
    shareCount?: number;
    profileImage?: string;
  }
}

const Feed: FC<FeedPostProps> = ({ postData }) => {
  const defaultProfileImage = postData?.profileImage || "https://via.placeholder.com/40x40/png";

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 mb-4">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* Profile Image */}
            <img 
              src={postData?.profileImage || defaultProfileImage} alt={`${postData?.username} profile`} 
              className="w-10 h-10 rounded-full object-cover"
              // onError={(e) => {
              //   e.currentTarget.src = defaultProfileImage;
              // }}
            />
            <div>
              <div className="font-semibold text-gray-800">{postData?.username}</div>
              <div className="text-sm text-gray-600">{postData?.caption}</div>
              <div className="text-xs text-gray-500">{postData?.postTimestamp}</div>
            </div>
          </div>
          {/* Option Icon (Ellipsis) */}
          <button 
            className="text-gray-500 hover:text-gray-600 focus:outline-none cursor-pointer"
            onClick={() => console.log("Option Clicked")}
          >
            <FaEllipsisV />
          </button>
        </div>
      </div>
      {/* Post Content */}
      <div className="px-4 pb-3">
        <div className="mb-2 text-gray-700">{postData?.caption}</div>
        <CodeSnippet code={postData?.codeSnippet || ""} />
      </div>

      {/* Post Interactions */}
      <div className="border-t border-gray-200 px-4 py-2 flex justify-between items-center">
        <div className="text-sm text-gray-700 space-x-4">
          <span>{postData?.upvoteCount || 0} <FaArrowAltCircleUp /></span>
          <span>{postData?.shareCount || 0} <FaShareAlt /></span>
        </div>
        <div className="flex space-x-4">
          <InteractionButtons 
            icon={<FaArrowAltCircleUp /> }
            text="Upvote"
            onClick={() => console.log("Upvote Clicked")}
          />
          <InteractionButtons 
            icon={<FaArrowAltCircleDown /> }
            text="Downvote"
            onClick={() => console.log("Downvote Clicked")}
          />
          <InteractionButtons 
            icon={<FaCommentAlt /> }
            text="Comment"
            onClick={() => console.log("Comment Clicked")}
          />
          <InteractionButtons 
            icon={<FaShareAlt /> }
            text="Share"
            onClick={() => console.log("Share Clicked")}
          />
        </div>
      </div>
    </div>
  )
}

export default Feed