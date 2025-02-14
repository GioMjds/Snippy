import { ChangeEvent, FC, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

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
    setLoading(true);
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-gray-100 flex items-center justify-center"
    >
      <div className="container mx-auto px-6 py-12 h-full">
        <div className="flex justify-center items-center h-full gap-6 text-gray-800">
          <div className="space-y-4 md:space-y-6 md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-gray-800">
              Welcome to Snippy!
            </h1>
            <p className="text-blue-600 font-semibold text-3xl">
              The best place to share all of your snippets!
            </p>
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <h1 className="text-5xl font-bold my-4 text-center">Login</h1>
            <div className="block rounded-lg shadow-lg bg-white p-8 md:py-12 md:mx-12">
              <form onSubmit={handleSubmit}
                className="min-w-full space-y-4 md:space-y-6"
              >
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-xl font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="name@email.com"
                    className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition duration-200 ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                    aria-required="true"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4 relative">
                  <label htmlFor="email" className="block text-gray-700 text-xl font-medium mb-2">Your Password</label>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    className="block w-full px-4 py-2 pr-10 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition duration-200 ease-in-out m-0 focus:text-gray-700 focus:outline-none"
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
                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 text-lg leading-6 text-center text-white transition-colors duration-200 transform bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Login'}
                  </button>
                  <div className="">
                    <Link to='/forgot-password' className="font-medium text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Forgot Password?</Link>
                  </div>
                  <p className="text-xl font-semibold mt-2 pt-1 mb-0">Don't have an account? <Link to='/signup' className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Sign Up</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Login