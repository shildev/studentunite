//necessary imports are made

import { AUTH } from '../constants/actionTypes';
import * as api from '../api'

export const signin = (formData, history) => async(dispatch) => {
    try { //to log the user in
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (error) {
        console.log(error);
        
    }
}

export const signup = (formData, history) => async(dispatch) => {
    try { //to sign up the user  
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        history.push('/');
    } catch (error) {
        console.log(error);
        
    }
}
