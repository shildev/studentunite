//necessary imports are made
import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../reduxactions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}
//initial state object set for the site to check if user is authenticated
const Auth = () => {
  //the different authentication states, where each state variable is added to a specific functional component
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  //react hook used to dispatch actions from the form component

  const history = useHistory();
//used to redirect users to different pages

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    //if/else statement for sign up and sign in actions
    if(isSignup) {
        dispatch(signup(formData, history));

    } else {
        dispatch(signin(formData, history));

    }

  };

  const handleChange = (e) => { 
    //spreads to form data, and only updating the specific property/input currently being utilised
    //by using the same handleChange function for each property
    //rather than having to change each state field seperately
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const switchMode = () => {
    //used to render the different sign up and sign in components based on the user inputs
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);

  };

//Authentication form 
  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
         <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
         <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing ={2}>
               {
                    isSignup && (
                        <>
                              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                              <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                        </>
                    )} 
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
            </Grid>
     
            <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
            {isSignup ? 'Sign up' : 'Sign in'}
            </Button>
            

          
               
            <Grid container justifyContent  = "flex-end">
                <Grid item>
                    <Button onClick={switchMode}>
                        {isSignup ? 'Already got an account? Sign in' : "No account? Click here and sign up already. "}
                    </Button>
                </Grid>
            </Grid>
         </form>
        </Paper>
    </Container>

  );
};

export default Auth;

