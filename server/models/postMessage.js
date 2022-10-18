//necessary imports are made

import mongoose from 'mongoose';

//mongoose database schema for the StudentUnite posts
const postSchema = mongoose.Schema({
    title: String,  //Post title
    message: String, //Post description
    name: String,  //name
    author: String,  //Creator of the post
    hashtags: [String], //Hashtags of the post 
    selectedFile: String, //to convert image to string
    rates: {     //the ratings of the post 
        type: [String],
        default: []
    },
    comments: {   //Comments part of the post
        type: [String], 
        default: [] 
    },
    createdAt: { //date the post is created
        type: Date,
        default: new Date()
    },

});
//schema is converted into a model
const PostMessage = mongoose.model('PostMessages', postSchema);

export default PostMessage;