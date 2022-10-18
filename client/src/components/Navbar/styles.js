//necessary imports are made

import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    fontFamily: 'Roboto',
    padding: '10px 50px',
   
  },
  heading: {
    color: "white",
    textDecoration: 'none',
    fontSize: '3em',
    fontWeight: 550,
  },
  image: {
    marginLeft: '7px',
    marginTop: '2px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '380px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '270px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  logout: {
    marginLeft: '20px',
    fontSize: 14,
    fontWeight: 650,
  },
  userName: {
    display: 'flex',
    color: 'white',
    fontSize: 23,
    fontWeight: 260,

  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  //colour used for user profile display picture
  //user profile picture may be updated in future, for example allowing users to customise their own picture
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
}));