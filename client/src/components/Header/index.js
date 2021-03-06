import React, {useState} from "react";
import { Link } from "react-router-dom";
import silversocialslogo from '../../assets/silversocial-logo-01.png';
import AuthService from "../../utils/auth";
import { animateScroll as scroll, } from 'react-scroll';
import { Redirect, useParams } from "react-router-dom";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
// import Search from '../Search'

import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    AuthService.logout();

  };

  // serach bar
  const [term, setTerm] = useState('');

  const [nav, setNav] = useState(false)
  const handleClick = () => setNav(!nav)

  const handleClose =()=> setNav(!nav)

  const { username: userParam } = useParams();

  // const [addpost] = useMutation(ADD_POST);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  
  const user = data?.me || data?.user || {};
  console.log(user, "testing")
  // console.log(user, "testing")
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }
    
  return (
    // <div className='w-screen h-[80%] z-10 bg-white drop-shadow-lg'>

      <nav className="text-center py-6 font-[Poppins] w-screen h-[80%] z-10 bg-white drop-shadow-lg">
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
              {/* <Search searchText={(text) => setTerm(text)} /> */}

              {/* search engine */}
              {/* <label class="relative block">
                <span class="sr-only">Search</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </span>
                <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
              </label> */}

              <div className='hidden md:flex pr-4'>
                  <Link to="/profile">
                  <button className='mr-3 px-8 py-3 rounded-full duration-500 hover:bg-cyan-600 hover:text-white'>
                  {/* <Link to="/profile" className="text-gray-800 hover:text-white duration-500"> */}
                  {`${user.username}`}
                  {/* </Link> */}
                  </button>
                  </Link>
                  
          
                
                  <a href="/" onClick={logout}>
                  <button className='px-8 py-3 rounded-full duration-500 hover:bg-cyan-600 hover:text-white'>Logout</button>
                  </a> 
                
              </div>
              <div className='md:hidden mr-4 z-50fixed' onClick={handleClick}>
                  {!nav ? <MenuIcon className='w-5' /> : <XIcon className='w-5' />}
              </div>

              <ul className={!nav ? 'hidden' : 'absolute duration-500 ease-in-out bg-zinc-200 w-full px-8 top-[85px] left-0 text-left md:hidden'}>
                <li className='border-b-2 border-zinc-300 w-full mt-6'><Link onClick={handleClose} to="/" className="text-gray-800 hover:text-gray-400 duration-500">Home</Link></li>
                <li className='border-b-2 border-zinc-300 w-full mt-6'><Link onClick={handleClose} to="/about" className="text-gray-800 hover:text-gray-400 duration-500">About</Link></li>
                <li className='border-b-2 border-zinc-300 w-full mt-6'><Link onClick={handleClose} to="/donation" className="text-gray-800 hover:text-gray-400 duration-500">Donation</Link></li>

              <div className='flex flex-col my-4 mb-8'>
                  <Link to="/profile" className='text-center border border-cyan-600 rounded-full bg-transparent px-8 py-3 text-black mr-4 mt-6 hover:bg-white duration-500'>
                  <button>{`${user.username}`}</button>
                  </Link>          
                <a href="/" onClick={logout} className="text-center px-8 py-3 rounded-full duration-500 text-white bg-cyan-600 mt-6 mr-4 hover:bg-cyan-900 duration-500">
                <button>Logout</button>
                </a>  
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

              {/* <Search searchText={(text) => setTerm(text)} /> */}

              {/* search engine */}
              {/* <label class="relative block">
                <span class="sr-only">Search</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </span>
                <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
              </label> */}

              <div className='hidden md:flex pr-4'>
                <Link to="/login">
                <button className='mr-3 px-8 py-3 rounded-full duration-500 hover:bg-cyan-600 hover:text-white'>
                  Login
                </button>
                </Link>
                {/* animate-ping */}
                <Link to="/signup">
                <button className='px-8 py-3 rounded-full duration-500 text-white bg-cyan-600 hover:bg-cyan-900'>
                Join
                </button>
                </Link>
              </div>
              <div className='md:hidden mr-4 z-50fixed' onClick={handleClick}>
                  {!nav ? <MenuIcon className='w-5' /> : <XIcon className='w-5' />}
                
              </div>

              <ul className={!nav ? 'hidden' : 'absolute z-50 duration-500 ease-in-out bg-zinc-200 w-full px-8 top-[85px] left-0 text-left md:hidden'}>
                <li className='border-b-2 border-zinc-300 w-full mt-6'><Link onClick={handleClose} to="/" className="text-gray-800 hover:text-gray-400 duration-500">Home</Link></li>
                <li className='border-b-2 border-zinc-300 w-full mt-6'><Link onClick={handleClose} to="/about" className="text-gray-800 hover:text-gray-400 duration-500">About</Link></li>
                <li className='border-b-2 border-zinc-300 w-full mt-6'><Link onClick={handleClose} to="/donation" className="text-gray-800 hover:text-gray-400 duration-500">Donation</Link></li>

              <div className='flex flex-col my-4 mb-8'>
                <Link to="/login" className="text-center text-gray-800 border border-cyan-600 rounded-full bg-transparent px-8 py-3 text-black mr-4 mt-12 hover:bg-white duration-500">
                  <button>Login</button>
                </Link>
                <Link to="/signup" className="text-center px-8 py-3 text-white rounded-full duration-500 bg-cyan-600 hover:bg-cyan-900 mt-6 mr-4 duration-500">
                  <button>Join</button>
                </Link>
              </div>
              </ul>
            </div>
          </>
        )}
      </nav>
    // </div>
);
};

export default Header;
