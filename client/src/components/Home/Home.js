//necessary imports are made
import React, { useState, useEffect} from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { getPosts, getPostsBySearch } from '../../reduxactions/posts'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';
import Pagination from '../Pagination';
 
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
//Home component
const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    const query = useQuery();
    const history = useHistory();

    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const classes = useStyles();
    //usestates for the search and hashtag mechanisms
    const [search, setSearch] = useState('');
    const [hashtags, setHashtags] = useState([]);

    //function to get the necessary posts depeneding on ID's after they are searched for
    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    const searchPost = () => {
      //search post function
      if(search.trim() || hashtags) {
        dispatch(getPostsBySearch({ search, hashtags: hashtags.join(',') }));
        history.push(`/posts/search?searchQuery=${search || 'none'}&hashtags=${hashtags.join(',')}`);
      } else {
        history.push('/');
      }

    };

    const handleKeyPress = (e) => {
      //for the processing of user searches in the search bars input text fields
      //keycode 13 represents the enter key. so when this key is entered, the search occurs
      if(e.keyCode === 13) { 
        searchPost();
      }
    };
    
    //functions to handle the hashtag processes 
    const handleAdd = (hashtag) => setHashtags([ ...hashtags, hashtag]);
    const handleDelete = (hashtagToDelete) => setHashtags(hashtags.filter((hashtag) => hashtag!== hashtagToDelete));

  return (
    //Grid layout for the Search Places and Societies functionalities
    <Grow in> 
    <Container maxWidth="xl">
        <Grid container justifyContent ="space-between" alignItems="stretch" spacing={4} className={classes.gridContainer}>
          <Grid item xs={12} sm={3} md={9}>
              <Posts setCurrentId={setCurrentId} />
          </Grid>   
          <Grid item xs={12} sm={6} md={3}>
          <AppBar className={classes.appBarSearch} position="static" color="inherit">
            <TextField 
               name="search" 
               variant="outlined"
               label="Search Places or Societies"
               onKeyPress={handleKeyPress}
               fullWidth
               value={search}
               onChange={(e)=> setSearch(e.target.value)}
            
            />
            <ChipInput 
              style={{ margin: '9px 0'}}
              value={hashtags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search Tags"
              variant="outlined"

            />
            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="secondary">Search</Button>
          </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              {(!searchQuery && !hashtags.length) && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
                )}
          </Grid>                     
        </Grid>
    </Container>
  </Grow>
    )
}
    

export default Home;