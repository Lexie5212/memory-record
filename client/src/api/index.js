import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:4000'});

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile');
  console.log('profile',localStorage.getItem('profile'));
  if (profile) {
   
    const { token } = JSON.parse(profile);
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`${'/posts'}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${'/posts'}/${id}`);
export const likePost = (id) => API.patch(`${'/posts'}/${id}/likePost`);

export const signIn = (FormData) => API.post('/user/signin', FormData);
export const signUp = (FormData) => API.post('/user/signup', FormData);