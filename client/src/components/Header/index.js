import React from "react";
import { Link } from "react-router-dom";
import silversocialslogo from '../../assets/silversocial-logo-01.png';
import AuthService from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    AuthService.logout();
    
  };

  return (
    
    // <header className="bg-secondary mb-4 py-2 flex-row align-center App-header App-link">
    // tailwindcss
    <header className="shadow-md w-full fixed top-0 left-0">

      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className='font-bold text-2x1 cursor-pointer flex items-center font-[Poppins] text-gray-800'>
          <ul className='md:flex md:items-center'>
            <li className="text-xl">
            <img src={silversocialslogo} alt="silver-socials-logo" style={{width:'3rem'}}/>
            </li>

            <li className="md:ml-8 text-xl">
            <Link to="/" className="hover:text-gray-400 duration-500">
              <h1>Silver Socials</h1>
            </Link>
            </li>
          </ul>
        </div>

        <nav className="text-center">
          {AuthService.loggedIn() ? (
            <>
              <ul className='md:flex md:items-center'>
                <li className="md:ml-8 text-xl">
                <Link to="/profile" className="text-gray-800 hover:text-gray-400 duration-500">Me</Link>
                </li>
                <li className="md:ml-8 text-xl">
                <a href="/" onClick={logout} className="text-gray-800 hover:text-gray-400 duration-500">
                  Logout
                </a>
                </li>
              </ul>
              
            </>
          ) : (
            <>
            <ul className='md:flex md:items-center'>
                <li className="md:ml-8 text-xl">
                <Link to="/login" className="text-gray-800 hover:text-gray-400 duration-500">Login</Link>
                </li>
                <li className="md:ml-8 text-xl">
                <Link to="/signup" className="text-gray-800 hover:text-gray-400 duration-500">Signup</Link>
                </li>
              </ul>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

// const Header = () => {
//   const logout = (event) => {
//     event.preventDefault();
//     AuthService.logout();
    
//     if (window.location.pathname === '/login') {
//       return null;
//     } else {
//       return <header className="bg-secondary mb-4 py-2 flex-row align-center App-header App-link">
//       <div className="container flex-row justify-space-between-lg justify-center align-center App-link">
//         <Link to="/">
//           <h1>Silver Socials</h1>
//         </Link>

//         <nav className="text-center">
//           {AuthService.loggedIn() ? (
//             <>
//               <Link to="/profile">Me</Link>
//               <a href="/" onClick={logout}>
//                 Logout
//               </a>
//             </>
//           ) : (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/signup">Signup</Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   }}
// };

export default Header;
