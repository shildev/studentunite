//necessary imports are made

import { makeStyles } from '@material-ui/core/styles';
//search bar styles
export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 5,
    marginBottom: '1rem',
    display: 'flex',
    padding: '18px',
  },
  //pagination styles
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '18px',
  },
}));