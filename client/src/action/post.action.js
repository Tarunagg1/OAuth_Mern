import * as api from '../api';
import { CREATE_POST, DELETE_POST, FETCH_ALL_POST, FETCH_SINGLE_POST, SEARCH_POST, START_POST_LOADING, STOP_POST_LOADING, UPDATE_POST } from '../constant';


export const getPost = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_POST_LOADING })
            const { data } = await api.fetchPosts();
            dispatch({ type: FETCH_ALL_POST, payload: { postMessage: data.postMessage, currentPage: data.currentPage, numberOfPage: data.numberOfPage } });
            dispatch({ type: STOP_POST_LOADING })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getSinglePost = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_POST_LOADING })
            const { data } = await api.fetchPost(id);
            dispatch({ type: FETCH_SINGLE_POST, payload: data.postMessage });
            dispatch({ type: STOP_POST_LOADING })
        } catch (error) {
            console.log(error.message);
        }
    }
}


export const getPostBySearch = (searchQuery) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_POST_LOADING })
            const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
            dispatch({ type: SEARCH_POST, payload: data });
            dispatch({ type: STOP_POST_LOADING })
        } catch (error) {
            console.log(error.message);
        }
    }
}


export const createPost = (postData, history) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_POST_LOADING })
            const { data } = await api.createPostApi(postData);
            history.push(`/posts/${data._id}`);
            dispatch({ type: CREATE_POST, payload: data });
            dispatch({ type: STOP_POST_LOADING })
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

export const updatePost = (id, formdata) => {
    return async (dispatch) => {
        try {
            const { data } = await api.updatePostApi(id, formdata);
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




