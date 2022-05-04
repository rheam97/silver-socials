import React from 'react';
import { Link } from "react-router-dom";
 // bg-slate-900 text-gray-300 py-y px-2 

const Footer = () => {
  return (
   
    <footer className="w-screen mt-24 font-[Poppins] bg-black">
      <div className='flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-around sm:flex-row text-center items-center'>
          <p className='font-bold uppercase text-white'>Create your own Silver Socials group</p>
          <Link to='/donation'>
                <button className='py-3 px-6 my-4 border border-white rounded-full text-white hover:bg-cyan-600 duration-500'>
                      Donation
                </button>
            </Link>
        <div>
          <p className='py-4 text-white'>&copy;{new Date().getFullYear()} by Silver Socials Developers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

