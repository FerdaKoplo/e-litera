import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ThemeToggle from "../toggle-theme";

const NavAuth = () => {
    

//   useEffect(() => {
//     const handleScroll = () => {
//         scrollHeader()
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => {
//       window.removeEventListener("scroll", handleScroll)
//     }
//   })
      
  return (
    <nav className='flex top-0 sticky justify-between items-center px-32 p-5'>
        <Link to={"/"} >
            <button className='text-xl flex items-center gap-1 '>
                <span className='bg-gradient-to-t from-violet-500 px-2 rounded-md to-purple-700 font-bold text-white'>E</span><span className='text-purple-800 font-bold'>-</span>
                <span className='font-semibold'>Litera</span>
            </button>
        </Link>
        <div className="flex items-center gap-10">
            <ThemeToggle />
            <Link to={'/login'}>
                  <button className='text-xl flex gap-2 items-center'>
                      <span className='bg-gradient-to-t from-violet-500 px-2 py-1 rounded-md to-purple-700 font-bold text-white'>Sign</span>
                      <span className='font-semibold'>In</span>
                  </button>
            </Link>
            <Link to={'/register'}>
                  <button className='text-xl flex gap-2 items-center'>
                      <span className='bg-gradient-to-t from-violet-500 px-2 py-1 rounded-md to-purple-700 font-bold text-white'>Sign</span>
                      <span className='font-semibold'>Up</span>
                  </button>
            </Link>
        </div>
    </nav>
  )
}

export default NavAuth