//necessary imports are made

import PostMessage from "../models/postMessage.js";
import express from 'express';
import mongoose from 'mongoose';

//The Post controller for the backend

const router = express.Router();

//asynchronous request response backend function to get posts
export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT; 
        //retrieves the starting index of each page
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
        
    }
}
//asynchronous request response backend function to get a post 
export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
        
    }

}




//asynchronous request response backend function to get a post by search
export const getPostsBySearch = async (req, res) => {

    const { searchQuery, hashtags } = req.query
    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({ $or: [ { title }, { hashtags: { $in: hashtags.split(',') }}] });
        
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message })
        
    }
}

//asynchronous request response backend function to create a post 
export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({  ...post, author: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
        
    }

}

//asynchronous request response backend function to update a post 
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('There are no posts with that id.');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true });

    res.json(updatedPost);
}

//asynchronous request response backend function to delete a post 
export const deletePost = async (req, res) =>  {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('There are no posts with that id.');

    await PostMessage.findByIdAndRemove(id);
    console.log('DELETE');
    res.json({ message: 'Post has been successfully deleted' });

}

//asynchronous request response backend function to rate a post 
export const ratePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated' });
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('There are no posts with that id.');

    const post = await PostMessage.findById(id);

    const index = post.rates.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        post.rates.push(req.userId);
        //if the user wants to rate the post
    } else {
        post.rates = post.rates.filter((id) => id!== String(req.userId));
        //if the user wants to unrate the post
    }
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}

//asynchronous request response backend function to comment on a post 
    export const commentPost = async(req, res) => {
        const { id } = req.params;
        const { value } = req.body;

        const post = await PostMessage.findById(id);
        post.comments.push(value);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.json(updatedPost);

    };

    export default router;