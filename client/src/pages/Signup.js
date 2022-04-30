import React, { useState } from 'react';
import {useMutation} from '@apollo/client'
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import validate from '../components/ValidateInfo/index';
import silversociallogo from '../assets/silversocial-logo-white-01.png'
// import styling
import '../styles/signupform.scss';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, {error}] = useMutation(ADD_USER)
  // check if form submit error
  const [errors, setErrors] = useState({});

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const {data} =await addUser({
        variables: {...formState}
      })
      Auth.login(data.addUser.token)
    } catch(e){
      console.error(e)
    }
    // add to check some error of input
    setErrors(validate(formState));
  };


  // from material ui
  return (
    <>
    <div className='form-container' style={{height:'100vh'}}>
    <div className="form-content-left">
      <img src={silversociallogo} alt="silver-socials-logo" className='form-img' style={{height:'40%'}}/>
    </div> 
    <div className='form-content-right col-12 col-md-6'>
      <form onSubmit={handleFormSubmit} className='form'>
        <h1>
          Create Account
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={formState.username}
            onChange={handleChange}
            
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={formState.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={formState.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={formState.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Sign up
        </button>
        {error && <div><p style={{color:"red"}}>Sign up failed </p></div>}
        <span className='form-input-login'>
          Already have an account? Login <a href='/login'>here</a>
        </span>
      </form>
    </div>
    </div>
    </>
  );
};

//   return (
//     <main className='flex-row justify-center mb-4'>
//       <div className='col-12 col-md-6'>
//         <div className='card'>
//           <h4 className='card-header'>Sign Up</h4>
//           <div className='card-body'>
//             <form onSubmit={handleFormSubmit} className='form'>
//               <input
//                 className='form-input'
//                 placeholder='Your username'
//                 name='username'
//                 type='username'
//                 id='username'
//                 value={formState.username}
//                 onChange={handleChange}
//               />
//               <input
//                 className='form-input'
//                 placeholder='Your email'
//                 name='email'
//                 type='email'
//                 id='email'
//                 value={formState.email}
//                 onChange={handleChange}
//               />
//               <input
//                 className='form-input'
//                 placeholder='******'
//                 name='password'
//                 type='password'
//                 id='password'
//                 value={formState.password}
//                 onChange={handleChange}
//               />
//               <button className='btn d-block w-100' type='submit'>
//                 Submit
//               </button>
//             </form>
//             {error && <div>Sign up failed </div>}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

export default Signup;