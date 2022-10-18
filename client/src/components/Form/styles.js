//necessary imports are made

import { makeStyles } from '@material-ui/core/styles';
//styles
export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '11px 0',
  },
  buttonSubmit: {
    marginBottom: 8,
  },
}));