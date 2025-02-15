import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

const GoogleButton: FC<{ text: string, onClick?: () => void }> = ({ text, onClick }) => {
  const login = async () => {
    // Implement Google OAuth here
  }
  
  return (
    <div className="flex justify-center">
      <button 
        className="bg-white hover:bg-gray-300 text-black py-2 px-4 rounded-lg transition-all duration-200 ease-in-out"
        type="button"
        onClick={login}
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