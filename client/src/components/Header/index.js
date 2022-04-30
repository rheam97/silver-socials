import React, {useState} from "react";
import { Link } from "react-router-dom";
import silversocialslogo from '../../assets/silversocial-logo-01.png';
import AuthService from "../../utils/auth";
import { animateScroll as scroll, } from 'react-scroll'

import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    AuthService.logout();

  };

    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)

    const handleClose =()=> setNav(!nav)


  return (
    <div className='w-screen h-[80px] mt-6 z-10fixed drop-shadow-lg'>

      <nav className="text-center">
        {AuthService.loggedIn() ? (
          <>
          <div className='px-2 flex justify-between items-center w-full h-full'>
              <div className='flex items-center'>
                <ul className='md:flex md:items-center'>
                  <li className="text-xl">
                  <img src={silversocialslogo} className='md:flex hidden ml-8' alt="silver-socials-logo" style={{width:'3rem'}}/>
                  </li>

                  <li className="md:ml-8 text-xl">
                      <Link to="/" className="hover:text-gray-400 duration-500">
                        <h1 className='text-3xl font-bold mr-4 sm:text-4xl font-[Poppins]'>Silver Socials</h1>
                      </Link>
                  </li>
                </ul>
                <ul className='hidden md:flex'>
                  <li><Link to="/" className="text-gray-800 hover:text-gray-400 duration-500 px-2 py-3">Home</Link></li>
                  <li><Link to="/about" className="text-gray-800 hover:text-gray-400 duration-500 px-2 py-3">About</Link></li>
                  <li><Link to="/donation" className="text-gray-800 hover:text-gray-400 duration-500 px-2 py-3">Donation</Link></li>
                </ul>
              </div>
              <div className='hidden md:flex pr-4'>
                <button className='border-none bg-transparent text-black mr-4'>
                  <Link to="/profile" className="text-gray-800 hover:text-gray-400 duration-500">Me</Link>
                </button>
          
                <button className='px-8 py-3 rounded-xl duration-500 hover:bg-cyan-600'>
                  <a href="/" onClick={logout} className="text-gray-800 hover:text-white duration-500">
                      Logout
                  </a> 
                </button>
              </div>
              <div className='md:hidden mr-4 z-10fixed' onClick={handleClick}>
                  {!nav ? <MenuIcon className='w-5' /> : <XIcon className='w-5' />}
              </div>

              <ul className={!nav ? 'hidden' : 'absolute duration-500 ease-in-out bg-zinc-200 w-full px-8 top-[60px] text-left md:hidden'}>
                <li className='border-b-2 border-zinc-300 w-full mt-6'><Link onClick={handleClose} to="/" className="text-gray-800 hover:text-gray-400 duration-500">Home</Link></li>
                <li className='border-b-2 border-zinc-300 w-full mt-6'><Link onClick={handleClose} to="/about" className="text-gray-800 hover:text-gray-400 duration-500">About</Link></li>
                <li className='border-b-2 border-zinc-300 w-full mt-6'><Link onClick={handleClose} to="/donation" className="text-gray-800 hover:text-gray-400 duration-500">Donation</Link></li>

              <div className='flex flex-col my-4 mb-8'>
              <button className='border border-cyan-600 rounded-xl bg-transparent px-8 py-3 text-black mr-4 mt-6'>
                  <Link to="/profile" className="text-gray-800 hover:text-gray-400 duration-500">Me</Link>
                </button>
          
                <button className='px-8 py-3 rounded-xl duration-500 bg-cyan-600 hover:bg-gray-300 mt-6 mr-4'>
                  <a href="/" onClick={logout} className="hover:text-white duration-500">
                      Logout
                  </a> 
                </button>
              </div>
              </ul>
            </div>
          
            {/* <ul className='md:flex md:items-center'>
              <li className="md:ml-8 text-xl">
              <Link to="/profile" className="text-gray-800 hover:text-gray-400 duration-500">Me</Link>
              </li>
              <li className="md:ml-8 text-xl">
              <a href="/" onClick={logout} className="text-gray-800 hover:text-gray-400 duration-500">
                Logout
              </a>
              </li>
            </ul>
             */}
          </>
        ) : (
          <>
          {/* <ul className='md:flex md:items-center'>
              <li className="md:ml-8 text-xl">
              <Link to="/login" className="text-gray-800 hover:text-gray-400 duration-500">Login</Link>
              </li>
              <li className="md:ml-8 text-xl">
              <Link to="/signup" className="text-gray-800 hover:text-gray-400 duration-500">Signup</Link>
              </li>
            </ul> */}
            <div className='px-2 flex justify-between items-center w-full h-full'>
              <div className='flex items-center'>
                <ul className='md:flex md:items-center'>
                  <li className="text-xl">
                  <img src={silversocialslogo} className='md:flex hidden ml-8' alt="silver-socials-logo" style={{width:'3rem'}}/>
                  </li>

                  <li className="md:ml-8 text-xl">
                      <Link to="/" className="hover:text-gray-400 duration-500">
                        <h1 className='text-3xl font-bold mr-4 sm:text-4xl font-[Poppins]'>Silver Socials</h1>
                      </Link>
                  </li>
                </ul>
                <ul className='hidden md:flex'>
                  <li><Link to="/" className="text-gray-800 hover:text-gray-400 duration-500 px-2 py-3">Home</Link></li>
                  <li><Link to="/about" className="text-gray-800 hover:text-gray-400 duration-500 px-2 py-3">About</Link></li>
                  <li><Link to="/donation" className="text-gray-800 hover:text-gray-400 duration-500 px-2 py-3">Donation</Link></li>
                </ul>
              </div>
              <div className='hidden md:flex pr-4'>
                <button className='border-none bg-transparent text-black mr-4'>
                  <Link to="/login" className="text-gray-800 hover:text-gray-400 duration-500">Login</Link>
                </button>
          
                <button className='animate-ping px-8 py-3 rounded-xl duration-500 hover:bg-cyan-600'>
                <Link to="/signup" className="hover:text-white duration-500">Join</Link>
                </button>
              </div>
              <div className='md:hidden mr-4' onClick={handleClick}>
                  {!nav ? <MenuIcon className='w-5' /> : <XIcon className='w-5' />}
                
              </div>

              <ul className={!nav ? 'hidden' : 'absolute duration-500 ease-in-out bg-zinc-200 w-full px-8 top-[60px] text-left md:hidden'}>
                <li className='border-b-2 border-zinc-300 w-full mt-6'><Link onClick={handleClose} to="/" className="text-gray-800 hover:text-gray-400 duration-500">Home</Link></li>
                <li className='border-b-2 border-zinc-300 w-full mt-6'><Link onClick={handleClose} to="/about" className="text-gray-800 hover:text-gray-400 duration-500">About</Link></li>
                <li className='border-b-2 border-zinc-300 w-full mt-6'><Link onClick={handleClose} to="/donation" className="text-gray-800 hover:text-gray-400 duration-500">Donation</Link></li>

              <div className='flex flex-col my-4 mb-8'>
              <button className='border border-cyan-600 rounded-xl bg-transparent px-8 py-3 text-black mr-4 mt-6'>
                  <Link to="/login" className="text-gray-800 hover:text-gray-400 duration-500">Login</Link>
                </button>
          
                <button className='px-8 py-3 rounded-xl duration-500 bg-cyan-600 hover:bg-gray-300 mt-6 mr-4'>
                <Link to="/signup" className="hover:text-white duration-500">Join</Link>
                </button>
              </div>
              </ul>
            </div>

          {/* <ul className='md:flex md:items-center'>
            <li className="text-xl">
            <img src={silversocialslogo} alt="silver-socials-logo" style={{width:'3rem'}}/>
            </li>

            <li className="md:ml-8 text-xl">
                <Link to="/" className="hover:text-gray-400 duration-500">
                  <h1 className='text-3xl font-bold mr-4 sm:text-4xl font:[Poppins]'>Silver Socials</h1>
                </Link>
            </li>
          </ul>
        </div>
        <div className='md:hidden mr-4' onClick={handleClick}>
            {!nav ? <MenuIcon className='w-5' /> : <XIcon className='w-5' />}
        </div> */}
          </>
        )}
      </nav>
    </div>
);
};

export default Header;
