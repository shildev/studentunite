

import { combineReducers } from "redux";
//reducer functions to combine the post and authentication reducers
import posts from './posts';

import auth from './auth';

export default combineReducers({ posts, auth });