import React from "react";
import { Link } from "react-router-dom";

import AuthService from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    AuthService.logout();
    
  };

  return (
    
    <header className="bg-secondary mb-4 py-2 flex-row align-center App-header App-link">
      <div className="container flex-row justify-space-between-lg justify-center align-center App-link">
        <Link to="/">
          <h1>Silver Socials</h1>
        </Link>

        <nav className="text-center">
          {AuthService.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
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
