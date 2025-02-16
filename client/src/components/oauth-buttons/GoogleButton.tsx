/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface GoogleButtonProps {
  text: string;
  onSuccessLogin?: (user: any, token: string) => void;
  onErrorLogin?: (error: any) => void;
}

const GoogleButton: FC<GoogleButtonProps> = ({ text, onSuccessLogin, onErrorLogin }) => {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`
          }
        });
        console.log(userInfoResponse.data);

        const credential = tokenResponse.credential;
        const backendResponse = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google/frontend-callback`, { credential });

        onSuccessLogin(backendResponse.data.user, backendResponse.data.token);
      } catch (error) {
        console.error(`Google failed or back end error: ${error}`);
        onErrorLogin(error);
      }
    },
    onError: (error: any) => {
      console.error(`Google failed: ${error}`);
      onErrorLogin(error);
    }
  })

  return (
    <div className="flex justify-center">
      <button 
        className="bg-white hover:bg-gray-300 text-black py-2 px-4 rounded-lg cursor-pointer transition-all duration-200 ease-in-out"
        type="button"
        onClick={googleLogin}
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