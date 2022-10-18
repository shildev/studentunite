//necessary imports are made

import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, RATE, COMMENT, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/actionTypes';

//reducer functions for the posts component including the loading states, and fetching of all action payload data

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };

        case END_LOADING:
            return { ...state, isLoading: false };

        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case FETCH_POST:
            return { ...state, post: action.payload };   
        case RATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))}
        case COMMENT:
            return { ...state, posts: state.posts.map((post) => {
                if(post._id === action.payload._id) {
                    return action.payload;
                }
                return post;
            })}
        
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))}
        case CREATE:state:
            return { ...state, posts: [...state, action.payload] };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload)}
        default:
            return state;
        
    
    }
};