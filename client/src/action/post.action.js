import * as api from '../api';
import { CREATE_POST, DELETE_POST, FETCH_ALL_POST, UPDATE_POST } from '../constant';


export const getPost = () => {
    return async (dispatch) => {
        try {
            const { data } = await api.fetchPosts();
            dispatch({ type: FETCH_ALL_POST, payload: data.postMessage });
        } catch (error) {
            console.log(error.message);
        }
    }
}



export const createPost = (postData) => {
    return async (dispatch) => {
        try {
            const { data } = await api.createPostApi(postData);
            dispatch({ type: CREATE_POST, payload: data });
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const deletePost = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await api.deletePostApi(id);
            dispatch({ type: DELETE_POST, payload: id });
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const updatePost = (id,formdata) => {
    return async (dispatch) => {
        try {
            const { data } = await api.updatePostApi(id,formdata);
            dispatch({ type: UPDATE_POST, payload: data.resp });
        } catch (error) {
            console.log(error.message);
        }
    }
}


export const likePost = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await api.updateLikeApis(id);
            dispatch({ type: UPDATE_POST, payload: data.resp });
        } catch (error) {
            console.log(error.message);
        }
    }
}


