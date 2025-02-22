import { motion } from "framer-motion"
import { FC, ReactNode } from "react"

interface InteractionButtonsProps {
  icon: ReactNode;
  text: string;
  onClick: () => void;
}

const InteractionButtons: FC<InteractionButtonsProps> = ({ icon, text, onClick }) => {
  return (
    <motion.button
      className="flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-gray-100 focus:outline-none cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
    >
      <span className="text-gray-700 text-sm">{icon} {text}</span>
    </motion.button>
  )
}

export default InteractionButtons