import axios from 'axios';
//HTTP client library used to make API requests 

const API = axios.create({ baseURL: 'http://localhost:5000' })
//creates new instance of axios with custom confugration of the base URL

API.interceptors.request.use((req) => {
    //function to handle API intercept requests and responses 
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    } //checks if the profile credentials in the application are valid
    return req;
});

//GET request methods for the different get, post, delete and other actions are set
export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&hashtags=${searchQuery.hashtags}`);

export const createPost  = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const ratePost = (id) => API.patch(`/posts/${id}/ratePost`);
export const commentPost = (value, id) => API.post(`/posts/${id}/commentPost`, { value });

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);