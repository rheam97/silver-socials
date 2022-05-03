import React from 'react';
import { Link } from "react-router-dom";

import heroImage from '../../assets/hero-image.png';

const Hero = () => {
  return (
    <div className='w-full h-full flex flex-col justify-between'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto py-10'>
            <div className='flex flex-col justify-center md:items-start w-full px-12 py-8 font-[Poppins]'>
                <h1 className='py-3 text-5xl md:text-7xl font-bold'>Silver Socials</h1>
                <p className='text-2xl'>People have turned to Silver Social to meet people, make friends, find support, and explore their interests. —join the fun.</p>
                <Link to='/signup' className='text-center mt-12 py-3 px-6 w-[45%] md:w-[45%] lg:w-[40%] my-4 bg-cyan-600 rounded-full text-white hover:bg-cyan-900 duration-500'>
                    <button> Get Started </button>
                </Link>
            </div>
            <div>
                <img className='w-full' src={heroImage} alt="silver-social" />
            </div>
        </div>
    </div>
  )
}

export default Hero