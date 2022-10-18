//necessary imports are made

import React, { useState, useRef } from 'react'; 
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../reduxactions/posts';
//Comment section component
const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsReference = useRef();
//asynchronous actions  to handle the submission and layout of new user comments
    const handleClick = async () => {
        const userComment = `${user.result.name}: ${comment}`;

        const newComments = await dispatch(commentPost(userComment, post._id));
        setComments(newComments);
        setComment('');

        commentsReference.current.scrollIntoView({ behavior: 'smooth'});
    };

//user interface layout for comments made by users
    return (
        <div>
            <div className = {classes.commentsOuterContainer}>
              <div className = {classes.commentsInnerContainer}>
                <Typography paragraph variant="h6">Comments</Typography>
                {comments.map((c, i) => (
                    <Typography key={i} paragraph variant="subtitle1">
                        <strong>{c.split(': ')[0]} </strong>
                        {c.split(':')[1]}
                    </Typography>
                ))}
                <div ref={commentsReference} />
            </div>
            {user?.result?.name && ( //only displays comment option if user is signed in/present
            <div style = {{ width: '70%'}}>
            <Typography paragraph variant="h6">Been here before? Have any questions? If so, add a comment:</Typography>
            <TextField
                fullWidth
                rows={4}
                variant = "outlined"
                label="Comment"
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
                <Button style={{ marginTop: '10px'}} fullWidth variant="contained" color="secondary" onClick={handleClick}>
                    Comment
                </Button>
            </div>
            )}
          </div>
        </div>
    );     
};

export default CommentSection;
