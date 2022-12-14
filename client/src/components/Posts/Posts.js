import React from 'react';

import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';
//Posts component 
const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();
//Loading functions for when posts are loaded to the user
    if(!posts.length && !isLoading) return 'No posts';
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems ="stretch" spacing={3}>
                { posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))} 
            </Grid>
        )
    );
};

export default Posts;