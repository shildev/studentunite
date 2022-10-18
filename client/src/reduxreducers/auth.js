//necessary imports are made

import { AUTH, LOGOUT } from '../constants/actionTypes';
//reducer functions for the authentication component
const authReducer = (state = { authData: null }, action) => {
   switch(action.type) {
    case AUTH:
        localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
        return { ...state, authData: action?.data };
    case LOGOUT:
       localStorage.clear();

       return { ...state, authData: null};
    default:
        return state;

   }
};

export default authReducer;