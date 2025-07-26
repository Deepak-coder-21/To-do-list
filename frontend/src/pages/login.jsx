import { use, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import 'react-toastify/dist/ReactToastify.css';

function login() {
  const [logininfo, setloginInfo] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyloginInfo = { ...logininfo };
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  };
  console.log(logininfo);
  const handlelogin = async (e) => {
    e.preventDefault();
    const {email, password } = logininfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logininfo)
      });
      const result = await response.json();
      console.log(result);
      const { success, message, token, user, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('name',user.name); 
        setTimeout(() => {
          navigate('/home')
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
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>

        <form onSubmit={handlelogin} className="space-y-5">


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
              value={logininfo.email}
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
              value={logininfo.password}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-4 px-4 rounded-md hover:bg-gray-700 cta-button"
          >
            Login
          </button>
          <ToastContainer />
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          do't have an account?{' '}
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in here
          </Link>
        </p>
      </div>
    </main>
  );
}

export default login;