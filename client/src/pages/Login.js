import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import silversociallogo from '../assets/silversocial-logo-white-01.png';
import { Link, useNavigate } from 'react-router-dom';
// import google login and logo
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';

// import styling
import '../styles/signupform.scss';

// import material ui 
// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, {error}] =useMutation(LOGIN_USER)
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // google login creditial
  // const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));

    // const { name, googleId, imageUrl } = response.profileObj

    // const doc = {
    //   _id: googleId,
    //   _type: 'user',
    //   userName: name,
    //   image: imageUrl
    // }
  }

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} =await login({
        variables: {...formState}
      })
      Auth.login(data.login.token)
    }catch(e){
      console.error(e)
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className='flex-row justify-center mb-4 h-screen' style={{height:'100vh'}}>
    <div className='form-container h-screen'>
    <div className="form-content-left">
      <img src={silversociallogo} alt="silver-socials-logo" className='form-img' style={{height:'40%'}}/>
    </div> 
    <div className='form-content-right col-12 col-md-6'>
      <form onSubmit={handleFormSubmit} className='form'>
        <h1>
          Sign In
        </h1>
        {/* <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
          {errors.username && <p>{errors.username}</p>}
        </div> */}
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
          {/* {errors.email && <p>{errors.email}</p>} */}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
          {/* {errors.password && <p>{errors.password}</p>} */}
        </div>
        {/* <div className='form-inputs'>
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
        </div> */}

        {/* Google credetials */}
        <div className="shadow-2xl form-inputs">
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  type="button"
                  className="form-input-btn flex"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  style={{width:'100%', border:'2px solid lightgrey', color:'grey', background:'white'}}
                >
                  <FcGoogle className="mr-4" /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>

        <button className='form-input-btn' type='submit'>
          Log in
        </button>
        {error && <div><p style={{color:"red"}}>Login failed</p></div>}

        <span className='form-input-login'>
          <Link to="/signup">
            {"Don't have an account? Sign Up"}
          </Link>
          {/* Already have an account? Login <a href='/login'>here</a> */}
        </span>
      </form>
    </div>
    </div>
      {/* <div className='col-12 col-md-6'>
        <div className='card'>
          <h4 className='card-header'>Login</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button className='btn d-block w-100' type='submit'>
                Submit
              </button>
            </form>
            {error && <div>Login failed</div>}
          </div>
        </div>
      </div> */}
    </main>
  );
};


// from material ui
// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const theme = createTheme();

// export default function Login() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             {/* <LockOutlinedIcon /> */}
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }

export default Login;



