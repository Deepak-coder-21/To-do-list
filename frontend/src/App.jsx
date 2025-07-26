
import { use, useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import RefrshHandler from './RefrshHandler'

function App() {
  const[isAuthenticated, setIsAuthenticated] = useState(false);
  const PriveteRoute =({element}) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }
return (
  <>
    <BrowserRouter>
    <Navbar />
        <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<PriveteRoute element={<Home setIsAuthenticated={setIsAuthenticated} />}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>

  </>
)
}


export default App;
