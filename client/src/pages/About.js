import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';


const About = () => {
return (
    <main className="h-full">
        <Header />
        <div className='w-full h-full flex flex-col items-start justify-between mx-auto font-[Poppins]'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
            <div className='flex flex-col justify-center md:items-start w-full px-12 py-12 font-[Poppins]'>
                <h1 className='py-3 text-5xl md:text-7xl font-bold'>Welcome to</h1>
                <h1 className='py-3 text-5xl md:text-7xl font-bold' style={{ color:'#199BC5' }}>Silver Socials</h1>
                {/* <div className="my-6 flex flex-row">
                  <ul>
                    <li>
                    <Link to='/'>
                        <button className='border border-cyan-600 text-center w-[45%] md:w-[45%] lg:w-[100%] mt-12 py-3 px-6 my-4 rounded-full hover:bg-gray-300 duration-500'> Home </button>
                    </Link>
                    </li>
                    
                    <li>
                    <Link to='/donation'>
                        <button className='text-center mt-12 py-3 px-6 w-[45%] md:w-[45%] lg:w-[100%] my-4 bg-cyan-600 rounded-full text-white hover:bg-cyan-900 duration-500'> Donation </button>
                    </Link>
                    </li>
                  </ul>               
                </div> */}
                <div className='md:flex pr-4 my-9'>
                  <Link to="/" className='mr-5'>
                  <button className='px-12 py-3 border border-cyan-600 text-center rounded-full hover:bg-cyan-600 duration-500'>Home</button>
                  </Link>
                  <Link to="/donation">
                    <button className='px-8 py-3 rounded-full duration-500 text-white bg-cyan-600 hover:bg-cyan-900'>Donation</button>
                  </Link>
                </div>
          

                <p className='text-base'>Silver Socials is community funded, and we welcome donations to keep it going.</p>
            </div>
            <div className='pt-3 text-xl flex flex-col justify-center md:items-start w-full px-12'>
                  <p className=''>A program of meetup activities aimed at older people in communities across the DC Metro Area. In this application you will find a range of activities 
                  delivered by fellow members.</p>
                  <br/>

                  <p>If you want to meet new people within your community, watch or participate in a range of activities or you know a friend, 
                   neighbor or family member who might like to try something new, direct them to Silver Socials.</p>
                   <br/>

                  <p>Everyone is welcome to come along and try a new activity. 
                  Visit our Home page to find a Silver Socials event near you. </p>
            </div>
        </div>
    </div>
        
      <Footer className='bottom-0'/>
    </main>
      
  );
};

export default About;