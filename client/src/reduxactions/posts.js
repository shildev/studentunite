//necessary imports are made

import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, RATE, COMMENT, DELETE } from '../constants/actionTypes';
import * as api from '../api'

//action creators; functions which will return specific actions(objects which have a type and payload)
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id); //retrieve response from api; returning post data from backend
        //redux implemented to dispatch action from backend data

        
        dispatch({ type: FETCH_POST, payload: data }); 
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error);
    }

};



//asynchronous action to fetch posts
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page); //retrieve response from api; returning post data from backend
        //redux implemented to dispatch action from backend data
        
        dispatch({ type: FETCH_ALL, payload: data }); 
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error);
    }

};
//asynchronous action to fetch posts by search queries from the user
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        console.log(data);
        dispatch({ type: FETCH_BY_SEARCH, payload: data }); 
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error);
        
    }
};


//asynchronous action to create posts
export const createPost = (post, history) => async (dispatch) => {
    try { 
        dispatch({ type: START_LOADING });

        const { data } = await api.createPost(post);

        history.push(`/posts/${data._id}`);

        dispatch({ type: CREATE, payload: data })
        
    } catch (error) {
        console.log(error);
    }
};
//asynchronous action to edit or update posts, error in this action for some reason that still needs resolving.
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};
//asynchronous action to delete posts
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
    
};
//asynchronous action to rate posts
export const ratePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.ratePost(id);
        dispatch({ type: RATE, payload: data });
    } catch (error) {
        console.log(error);
        
    }
};
//asynchronous action to comment on posts
export const commentPost = (value, id) => async (dispatch) => {
    try {
       const { data }  = await api.commentPost(value, id);
    
       dispatch({ type: COMMENT, payload: data });
       return data.comments;

    } catch (error) {
        console.log(error);
        
    }
};



