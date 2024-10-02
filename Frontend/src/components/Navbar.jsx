import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full py-4 px-10 flex justify-between'>
        <div className='text-blue-600 text-2xl font-bold'>Blogs.</div>
        <NavLink  className={(e) => {return e.isActive?"font-bold text-white bg-gray-600 px-3 py-2 rounded-md": "font-bold text-white bg-blue-600 px-3 py-2 rounded-md"}} to={"/create"}>Create Blog</NavLink>
    </div>
  )
}

export default Navbar
