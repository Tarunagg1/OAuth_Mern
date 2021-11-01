import axios from 'axios';

const URL = 'http://localhost:4000';

export const fetchPosts = () => axios.get(`${URL}/posts`);
export const createPostApi = (data) => axios.post(`${URL}/posts`, data);
export const updatePostApi = (id, data) => axios.patch(`${URL}/posts/${id}`, data);
export const deletePostApi = (id) => axios.delete(`${URL}/posts/${id}`);

export const updateLikeApis = (id, data) => axios.patch(`${URL}/posts/${id}/like`, data);




