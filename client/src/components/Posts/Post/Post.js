//necessary imports are made

import React, { useState } from 'react';
import useStyles from './styles';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, ratePost } from '../../../reduxactions/posts';
import { useHistory } from 'react-router-dom';
  
//Post component
const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [rates, setRates] = useState(post?.rates);

    const hasRatedPost = post.rates.find((rate) => rate === (user?.result?._id))
//Asynchronous post rating function
    const handleRate = async () => {
        dispatch(ratePost(post._id));
        //if else statement for whether a user rates a post
        if(hasRatedPost) {
            setRates(post.rates.filter((id) => id !== (user?.result._id)))
        } else {
            setRates([ ...post.rates, user?.result._id ])
        }
    };
//Presentation of rating feature to user 
    const Rates = () => {
        if (rates.length > 0) {
            return rates.find((rate) => rate === (user?.result?._id))
              ? (
                <><StarIcon fontSize="small" />&nbsp;{rates.length > 2 ? `You and ${rates.length - 1} others` : `${rates.length} rate${rates.length > 1 ? 's' : ''}` }</>
                ) : (

                    <><StarBorder fontSize="small" />&nbsp;{rates.length} {rates.length === 1 ? 'Rate' : 'Ratings'}</>
                  );
              }

              return <><StarBorder fontSize="small" />&nbsp;Rate</>;
            };

    const openPost = () => history.push(`/posts/${post._id}`);
//onClick functionalities and changes in post interfaces during user ratings
    return (
        <Card className={classes.card} raised elevation={12}>
        <ButtonBase name="ratingtest" className={classes.cardAction} onClick={openPost} >
            <CardMedia className = {classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h5">{post.name}</Typography>
                <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?._id === post?.author) && (
                    //onClick functionalities
                <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
                )}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.hashtags.map((tag) => `#${tag} `)}</Typography>
                </div>
                    <Typography className={classes.title} variant="h5" paragraph>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" >{post.message}</Typography>
                </CardContent>
            </ButtonBase>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" disabled={!user?.result} onClick={handleRate}>
                        <Rates/>
                    </Button>
                    {(user?.result?._id === post?.author) && (
                      <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                         <DeleteIcon fontSize="small" />
                              Delete
                      </Button>       
                    )}
                   
                </CardActions>

        </Card>
    );
}

export default Post;