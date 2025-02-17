/* eslint-disable @typescript-eslint/no-explicit-any */
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBackground from "../assets/layered-waves-haikei.png";
import GitHubButton from "../components/oauth-buttons/GitHubButton";
import GoogleButton from "../components/oauth-buttons/GoogleButton";
import { validateEmail, validatePassword } from "../utils/validation";
import { handleRegister } from "../services/axios";

const Signup: FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [signUpError, setSignUpError] = useState(null);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    navigate('/');
    setLoading(true);
    setErrors({});

    const usernameError = username.length < 3 || username.length > 20 ? 'Username must be between 3 and 20 characters long' : '';
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = password !== confirmPassword ? 'Passwords do not match' : '';

    const hasErrors = usernameError || emailError || passwordError || confirmPasswordError;

    if (usernameError) setErrors((prev) => ({ ...prev, username: usernameError }));
    if (emailError) setErrors((prev) => ({ ...prev, email: emailError }));
    if (passwordError) setErrors((prev) => ({ ...prev, password: passwordError }));

    if (hasErrors) return;

    try {
      const response = await handleRegister(username, email, password);
      if (response.data.success) {
        const userData = { username, email, password };
        Object.entries(userData).forEach(([key, value]) => {
          sessionStorage.setItem(key, value);
        })
      }
      navigate('/');
    } catch (error: any) {
      if (error) {
        setErrors({ general: 'An error occurred. Please try again later.' });
        return;
      }
      const { data, status } = error;

      if (status === 500) {
        setErrors({ general: 'App is under maintenance. Please try again later.' });
        return;
      }

      setErrors((prev) => ({
        ...prev,
        username: data.username || "",
        email: data.email || "",
        password: data.password || "",
        general: data.message || ""
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignupSuccess = (user: any, token: string) => {
    setLoading(false);
    setSignUpError(null);
    localStorage.setItem('access_token', token);
    console.log(`Google login success: ${user}`);
    navigate('/');
  };

  const handleGoogleSignupError = (error: any) => {
    setLoading(false);
    setSignUpError(error);
    console.error(`Google login error: ${error}`);
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="container mx-auto px-6 py-12 h-full">
        <div className="flex justify-center items-center h-full gap-6 text-gray-800">
          <div className="space-y-4 md:space-y-6 md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <h1 className="text-5xl md:text-6xl xl:text-7xl tracking-tight text-gray-200">
              Join <span className="text-indigo-600">Snippy</span> today!
            </h1>
            <p className="text-gray-200 text-3xl">
              The best place to share all of your code snippets!
            </p>
          </div>
          <AnimatePresence mode="popLayout" >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:w-8/12 lg:w-5/12 lg:ml-20"
            >
              <h1 className="text-5xl my-8 text-center text-indigo-500">Sign Up</h1>
              <div className="block border border-indigo-700 rounded-xl shadow-xl shadow-indigo-700/50 dark:border dark:border-indigo-700 bg-black/15 p-8 md:py-12 md:mx-12">
                <form onSubmit={handleSubmit}
                  className="min-w-full space-y-4 md:space-y-6"
                >
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-indigo-500 text-2xl mb-2">Your Username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={username}
                      onChange={handleUsernameChange}
                      placeholder="Your desired username"
                      className="block w-full px-4 py-2 text-base font-normal text-black bg-white bg-clip-padding border border-solid border-gray-300 rounded transition duration-200 ease-in-out m-0 focus:outline-none"
                      aria-required="true"
                      autoComplete="on"
                      required
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                  </div>
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
                    <label htmlFor="password" className="block text-indigo-500 text-2xl mb-2">Enter your Password</label>
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
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>
                  <div className="mb-4 relative">
                    <label htmlFor="password" className="block text-indigo-500 text-2xl mb-2">Confirm Password</label>
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      name="password"
                      id="password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
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
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-2 text-lg text-white">or sign up using</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>
                  <div className="flex justify-center gap-3">
                    <GoogleButton
                      text="Sign in using Google"
                      onSuccessLogin={handleGoogleSignupSuccess}
                      onErrorLogin={handleGoogleSignupError}
                    />
                    <span className="text-xl text-white">or</span>
                    <GitHubButton text="Sign in using GitHub" />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="inline-block px-7 py-3 text-lg leading-6 text-center text-white transition-colors duration-200 transform bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-700 focus:outline-none"
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                    {signUpError && <p className="text-red-500 text-sm mt-1">{signUpError}</p>}
                    <p className="text-xl text-gray-300 mt-2 pt-1 mb-0">Already have an account? <Link to='/login' className="text-indigo-500 hover:text-indigo-600 focus:text-indigo-600 transition duration-200 ease-in-out">Login here</Link></p>
                  </div>
                </form>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Signup