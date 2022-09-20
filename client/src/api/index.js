import axios from 'axios';

const url = 'http://localhost:5000/posts';

//get all posts
export const fetchPosts = () => axios.get(url);

//add new post
export const createPost = (data) => axios.post(url, data);

//update post
export const updatePost = (id, data) => axios.patch(`${url}/${id}`, data);