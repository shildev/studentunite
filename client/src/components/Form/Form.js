//necessary imports are made
import React, { useState, useEffect } from 'react';
import { Paper, Button, TextField, Typography } from '@material-ui/core';
//MaterialUI imports made for frontend UI design component
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { createPost, updatePost } from '../../reduxactions/posts';



const Form = ({ currentId, setCurrentId}) => {
      //the different form use states, where each state variable is added to a specific functional component

    const [postData, setPostData] = useState({ title: '', message: '', hashtags: '', selectedFile: '' });
    const post = useSelector((state) => currentId ? state.posts.posts.find((message) => message._id === currentId) : null);
    //useSelector used to return the specific states
   
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();

    const history = useHistory();
    //used to redirect users to different pages

    const dispatch = useDispatch();
    //react hook used to dispatch actions from the form component
    useEffect(() => {
        //react hook used to fetch post data
        if(post) setPostData(post);

    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //if/else statement for post submission in actions
        if(currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
    }   else {
            dispatch(createPost({ ...postData, name: user?.result?.name }, history));
            clear();

    }
};
//clear form component
    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', hashtags: '', selectedFile: '' });

    };

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    You need to sign in first to add or rate places/societies. Best hop on that...
                </Typography>

            </Paper>
        )
    }

    //with "...postData": in each Textfield ,every last property modified of said field will change while data persists
    return (
        //Post creation form layout with configuration of textfields and buttons
        <Paper className={classes.paper} elevation={8}> 
            <form autoComplete='on' noValidate className={classes.form} onSubmit={handleSubmit}>
            <Typography
                variant = "h6">{ currentId ? 'Editing' : 'Add' } your Place or Society
            </Typography>         
            <TextField name ="title" variant ="outlined" label="Name of your chosen place/society" style={{ paddingBottom: '20px' }} fullWidth value={postData.title} onChange={ (e) => setPostData({ ...postData, title: e.target.value })} />
            <TextField name ="message" variant ="outlined" label="Details about chosen place/society" style={{ paddingBottom: '20px' }} fullWidth value={postData.message} onChange={ (e) => setPostData({ ...postData, message: e.target.value })} />
            <TextField name ="hashtags" variant ="outlined" label="Hashtags" style={{ paddingBottom: '20px' }} fullWidth value={postData.hashtags} onChange={ (e) => setPostData({ ...postData, hashtags: e.target.value.split(',') })} />
            <div className={classes.fileInput}>
                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                />
            </div>
            <Button className= {classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="default" size="small" onClick={clear} fullWidth>Clear</Button>


            </form>
            
        </Paper>
    );
}

export default Form;