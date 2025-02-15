import { ChangeEvent, FC, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import loginBackground from '../assets/layered-waves-haikei.png';
import GoogleButton from "../components/buttons/GoogleButton";
import GitHubButton from "../components/buttons/GitHubButton";
// import { githubOauthUser } from "../constants/env";

const Login: FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    email?: string,
    password?: string
  }>({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    navigate('/feed');
    setLoading(true);
    setErrors((prev) => ({
      ...prev,
      email: '',
    }));
  };

  // const handleGoogleLogin = async () => {
  //   // Implement Google login
  // }

  // const handleGitHubLogin = async () => {
  //   // Implement GitHub login
  //   window.location.assign(`${githubOauthUser}`);
  // }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-6 py-12 h-full"
      >
        <div className="flex justify-center items-center h-full gap-6 text-gray-800">
          <div className="space-y-4 md:space-y-6 md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <h1 className="text-5xl md:text-6xl xl:text-7xl tracking-tight text-gray-200">
              Welcome to <span className="text-indigo-600">Snippy!</span>
            </h1>
            <p className="text-gray-200 text-3xl">
              The best place to share all of your code snippets!
            </p>
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <h1 className="text-5xl my-8 text-center text-indigo-500">Login</h1>
            <div className="block border border-indigo-700 rounded-xl shadow-xl shadow-indigo-700/50 dark:border dark:border-indigo-700 bg-black/15 p-8 md:py-12 md:mx-12">
              <form onSubmit={handleSubmit}
                className="min-w-full space-y-4 md:space-y-6"
              >
                <div className="mb-4">
                  <label htmlFor="email" className="block text-indigo-500 text-2xl mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="name@email.com"
                    className="block w-full px-4 py-2 text-base font-normal text-black bg-white bg-clip-padding border border-solid border-gray-300 rounded transition duration-200 ease-in-out m-0 focus:outline-none"
                    aria-required="true"
                    autoComplete="on"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4 relative">
                  <label htmlFor="email" className="block text-indigo-500 text-2xl mb-2">Your Password</label>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    className="block w-full px-4 py-2 pr-10 text-base font-normal text-black bg-white bg-clip-padding border border-solid border-gray-300 rounded transition duration-200 ease-in-out m-0 focus:outline-none"
                    aria-required="true"
                    required
                  />
                  <div className="absolute right-2 top-3/4 transform -translate-y-1/2 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon
                      icon={passwordVisible ? faEye : faEyeSlash}
                      className="h-5 w-5 text-gray-500"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-2 text-lg text-white">or login using</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex justify-center gap-3">
                  <GoogleButton text="Login with Google" />
                  <span className="text-xl text-white">or</span>
                  <GitHubButton text="Login with GitHub" />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 text-lg leading-6 text-center text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Login'}
                  </button>
                  <div className="flex justify-center items-center mt-4">
                    <Link to='/forgot-password' className="text-lg font-medium text-indigo-500 underline hover:text-indigo-600 focus:text-indigo-700 transition duration-200 ease-in-out">Forgot Password?</Link>
                  </div>
                  <p className="text-xl text-gray-300 mt-2 pt-1 mb-0">Don't have an account? <Link to='/register' className="text-indigo-500 hover:text-indigo-600 focus:text-indigo-600 transition duration-200 ease-in-out">Create New Account</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Login