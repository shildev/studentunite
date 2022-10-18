//necessary imports are made
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import studentunite from '../../images/studentunite.png';


//Navigation bar component
const Navbar = () => {
    const classes = useStyles();
      const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
      const dispatch = useDispatch();
      const history = useHistory();
      const location = useLocation();
  //Logging out function
      const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
        
      };
      useEffect(() => {
        const token = user?.token;
//token based authorisation is used
        if(token) {
          const decodedToken = decode(token);
          if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);

//navigation bar layout
    return (
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className = {classes.brandContainer}>
          <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">StudentUnite</Typography>
          <img className={classes.image} src={studentunite} alt="studentunite" height="85" />
        </div> 
       
        <Toolbar className = {classes.toolbar}>
                         {/* code shown if the user is logged in: */}
         {user ? (
            <div className ={classes.profile}>
                <Avatar className={classes.red} alt = {user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography className = {classes.userName} variant="h6">{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="inherit" onClick={logout}>Logout</Button>
            </div>
                        /* code shown if the user is not logged in: */

         ) : (
             <Button component={Link} to="/auth" variant="contained" color="inherit">Sign in</Button>
         )}
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;
