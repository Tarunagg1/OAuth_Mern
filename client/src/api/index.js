import axios from 'axios';
import { removeProfileFromLocalStorage } from '../config/common';
import { LOG_OUT, NORMAL_AUTH } from '../constant';
import store from '../store';

const URL = 'http://localhost:4000';

const axiosinstance = axios.create({
    baseURL: URL
});

axiosinstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = JSON.parse(localStorage.getItem("profile"));
    if (token) {
        config.headers.Authorization = `Bearear ${token?.token}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


axiosinstance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    const status = error.response.status ? error.response.status : 401;
    if (status && status === 401) {
        removeProfileFromLocalStorage()
        store.dispatch({
            type: LOG_OUT
        })
    }
    return Promise.reject(error);
})


export const fetchPosts = (page) => axiosinstance.get(`/posts/?page=${page || 1}`)
export const fetchPost = (id) => axiosinstance.get(`/posts/${id}`);

export const fetchPostsBySearch = (searchQuery) => axiosinstance.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const createPostApi = (data) => axiosinstance.post(`/posts`, data);
export const updatePostApi = (id, data) => axiosinstance.patch(`/posts/${id}`, data);
export const deletePostApi = (id) => axiosinstance.delete(`/posts/${id}`);

export const updateLikeApis = (id, data) => axiosinstance.patch(`/posts/${id}/like`, data);


export const registerApi = (fomrData) => axiosinstance.post(`/auth/register`, fomrData);
export const loginApi = (fomrData) => axiosinstance.post(`/auth/login`, fomrData);


