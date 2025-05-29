import React, { useEffect, useState } from 'react'
import { NAVLIST } from '../../../constant/landing/LANDINGCONSTANT'
import { Link } from 'react-router';

interface NavbarProps {
  navlist : Array<{key:string; label:string}>,
  onNavClick : (sectionKey: string) => void
}

const Nav : React.FC<NavbarProps> = ({navlist, onNavClick}) => {
  
  const [Header, setHeader] = useState(false)

  const scrollHeader = () => {
    if(window.scrollY >= 30){
      setHeader(true)
    }
    else {
      setHeader(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
        scrollHeader()
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })
  
  return (
    <nav className={`${Header ? 'transition-all p-5 bg-white shadow-lg z-50 fixed w-full top-0 start-0' : 'bg-transparent p-5'} px-32`}>
        <div className='flex justify-between items-center gap-10'>
            <button className='text-xl flex items-center gap-1 duration-500 p-5 bg'>
                <span className='bg-gradient-to-t from-violet-500 px-2 rounded-md to-purple-700 font-bold text-white'>E</span><span className='text-purple-800 font-bold'>-</span>
                <span className='font-semibold'>Litera</span>
            </button>
            <ul className='flex gap-5 items-center font-semibold'>
                {NAVLIST.map((i) => (
                <li>
                  <button onClick={() => onNavClick(i.key)} className=''>
                          {i.label}
                  </button>
                </li>
                ))}                    
            </ul>
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

export default Nav