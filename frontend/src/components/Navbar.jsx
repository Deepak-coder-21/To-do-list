import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className='bg-gray-800 text-white p-4 flex justify-between items-center'>
        <div className='text-3xl font-bold underline'>iTask</div>
        <ul className='flex space-x-4'>
            <Link to="/home"><li className='hover:font-bold cursor-pointer hover:text-yellow-200'>Home</li></Link>
            <Link to=""><li className='hover:font-bold cursor-pointer hover:text-red-700 hidden'>Log out</li></Link>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
