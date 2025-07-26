import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [signupinfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupinfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  console.log(signupinfo);
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupinfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required");
    }
    try {
      const url = "https://to-do-list-blond-nine-82.vercel.app//auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupinfo)
      });
      const result = await response.json();
      console.log(result);
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      }
      else if (error) {
        const details = error.details || error;
        handleError(details);
      }
      else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  }
  return (
    <main className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create Your Account</h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              id="name"
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="John Doe"
              value={signupinfo.name}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              value={signupinfo.email}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              id="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              value={signupinfo.password}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-4 px-4 rounded-md hover:bg-gray-700 cta-button"
          >
            Sign up
          </button>
          <ToastContainer/>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Log in here
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;
