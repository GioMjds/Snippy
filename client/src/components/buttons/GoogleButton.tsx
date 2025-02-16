import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

interface GoogleButtonProps {
  text: string;
  onClick?: () => void;
}

const GoogleButton: FC<GoogleButtonProps> = ({ text, onClick }) => {
  return (
    <div className="flex justify-center">
      <button 
        className="bg-white hover:bg-gray-300 text-black py-2 px-4 rounded-lg cursor-pointer transition-all duration-200 ease-in-out"
        type="button"
        onClick={onClick}
      >
        <FontAwesomeIcon 
          icon={faGoogle}
          className='mr-2'
        /> {text}
      </button>
    </div>
  )
}

export default GoogleButton