//necessary imports are made

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  //media styles
  media: {
    borderRadius: '20px',
    width: '100%',
    objectFit: 'cover',
    maxHeight: '800px',

  },
  //post card style
  card: {
    display: 'flex',
    width: '100%',
  },
  //post section style
  section: {
    borderRadius: '18px',
    margin: '10px',
    flex: 1,
  },
  //post image styles
  imageSection: {
    marginLeft: '15px',
  },
  //recommended post section styles
  recommendedPosts: {
    display: 'flex',
  },
  //loading icon styles
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '25px', borderRadius: '15px',
  },
  //Comment section styles
  commentsOuterContainer: {
    display: 'flex', justifycontent: 'space-between',
  },

  commentsInnerContainer: {
    height: '180px',
    overflowY: 'auto',
    marginRight: '25px'
  },

}));