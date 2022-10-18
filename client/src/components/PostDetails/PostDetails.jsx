//necessary imports are made

import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import useStyles from './styles';

import { getPost, getPostsBySearch } from '../../reduxactions/posts';

import CommentSection from './CommentSection';
//Post Details component
const PostDetails = () => {
  const { post, posts, isLoading }  = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
//to retrieve all the posts 
  useEffect(() => {
    dispatch(getPost(id));
  }, [id])

  useEffect(() => {
    if(post) {
      dispatch(getPostsBySearch({ search: 'none', hashtags: post?.hashtags.join(',')})); 
      //only using hashtags to recommend posts
    }
  }, [post]);
  

  if (!post) return null;

  if(isLoading) {
      return (<Paper elevation={6} className={classes.loadingPaper}>
          <CircularProgress size= "7em"/>
      </Paper>
      );
  }
//if the post is loading a circular motion icon is displayed
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const openPost = (_id) => history.push(`/posts/${_id}`)
//presentation of post with all the necessary details
  return (
    <Paper style={{ padding: '18px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
            <Typography variant="h3" component="h2">{post.title}</Typography>
            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.hashtags.map((hashtag) => `#${hashtag} `)}</Typography>
            <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
            <Typography variant="h6">Created by: {post.name}</Typography>
            <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '16px 0' }} />
            <Typography variant="body1"><strong>More features coming soon...</strong></Typography>
          <Divider style={{ margin: '16px 0' }} />
        <CommentSection post={post} />
          <Divider style={{ margin: '18px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || ''} alt={post.title} />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography paragraph variant ="h5">You may also be interested in:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, message, name, rates, selectedFile, _id}) => (
              <div style={{ margin: '17px', cursor:"pointer"}} onClick={() => openPost(_id)} key={_id}>
                <Typography paragraph variant="h6">{title}</Typography>
                <Typography paragraph variant="subtitle2">{name}</Typography>
                <Typography paragraph variant="subtitle2">{message}</Typography>
                <Typography paragraph variant="subtitle1">🌟:{rates.length}</Typography>
                <img src={selectedFile} width="180px"/>
                </div>
            ))}
          </div>
        </div>
      )}
      </Paper>
  );
};

export default PostDetails;