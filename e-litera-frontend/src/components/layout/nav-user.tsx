import React, { useEffect, useState } from 'react'
import { FaRegUser, FaUserCircle } from 'react-icons/fa'
import { Link, Links } from 'react-router'
import { IoIosArrowDown } from "react-icons/io";
import { HOVERCONSTANT } from '@/constant/user/USERCONSTANT';
import { Button } from '../ui/button';
import { useLogoutMutation } from '@/store/slice/auth.service';
import { RiLogoutBoxLine } from "react-icons/ri"
import ThemeToggle from '../ui/toggle-theme';

const NavUser = () => {

    const [logout] = useLogoutMutation()

    const [Header, setHeader] = useState(false)

    const scrollHeader = () => {
        if (window.scrollY >= 30) {
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
    }, [])

    async function handleLogout() {
        try {
            await logout().unwrap()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className={`sticky top-0 start-0 z-50 px-32 p-5 flex items-center justify-between ${Header ? 'bg-white dark:bg-black' : 'bg-white dark:bg-black px-20 '} dark:text-white transition-all duration-300`}>

            <Link to={"/"}>
                <button className='text-xl flex items-center gap-1 '>
                    <span className='px-2 rounded-md  bg-gradient-to-t  from-violet-500  to-purple-700 dark:from-white  dark:to-white dark:text-black  font-bold text-white'>E</span><span className='text-purple-800 dark:text-white font-bold'>-</span>
                    <span className='font-semibold'>Litera</span>
                </button>
            </Link>
            <ul className='flex justify-center items-center gap-10 font-semibold'>
                <Link to={'/koleksi-cetak'} >
                    <li className='hover:scale-110 duration-500'>
                        Koleksi Cetak
                    </li>
                </Link>
                <Link to={'/koleksi-digital'} >
                    <li className='hover:scale-110 duration-500'>
                        Koleksi Digital
                    </li>
                </Link>
                <Link to={'/forum'} >
                    <li className='hover:scale-110 duration-500'>
                        Forum
                    </li>
                </Link>
            </ul>


            <div className='flex items-center gap-10'>
                <ThemeToggle />
                <div className='group relative inline-block'>
                    <div className='flex items-center gap-2'>
                        <FaUserCircle className='text-3xl' />
                        <IoIosArrowDown />
                    </div>
                    <div className='flex flex-col right-0 w-48 gap-2 items-start dark:bg-black bg-white  mt-5 px-5 opacity-0 absolute group-hover:opacity-100 duration-500 '>
                        {HOVERCONSTANT.map((hover, i) => (
                            <Link to={hover.route} className='w-full'>
                                <p key={i} className={`text-black flex items-center gap-2 ${i % 2 !== 1 ? 'hover:bg-purple-500 hover:text-white dark:text-white' : 'dark:bg-black bg-white dark:text-white'} duration-300 text-xs w-full py-2 rounded-md px-1 font-semibold`}>
                                    {hover.icon}
                                    {hover.text}
                                </p>
                            </Link>
                        ))}
                        <Button className='flex font-semibold' onClick={() => handleLogout()}>
                            <RiLogoutBoxLine />
                            Logout
                        </Button>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default NavUser