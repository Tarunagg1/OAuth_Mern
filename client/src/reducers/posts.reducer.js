import { CREATE_POST, DELETE_POST, FETCH_ALL_POST, FETCH_SINGLE_POST, SEARCH_POST, SET_LIKE, START_POST_LOADING, STOP_POST_LOADING, UPDATE_POST } from "../constant";

const initialState = {
    posts: [],
    post: null,
    searchPosts: [],
    numberOfPage: 0,
    currentPage: 0,
    loading: false
};

export default (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case FETCH_ALL_POST:
            return { ...state, posts: payload.postMessage, numberOfPage: payload.numberOfPage, currentPage: payload.currentPage };
        case FETCH_SINGLE_POST:
            return { ...state, post: payload };
        case SEARCH_POST:
            return { ...state, posts: payload };
        case CREATE_POST:
            const getPost = [...state.posts];
            getPost.push(payload);
            return { ...state, posts: getPost }
        case DELETE_POST:
            let getPosts = state.posts.filter(post => post._id !== payload);
            return { ...state, posts: getPosts }
        case START_POST_LOADING:
            return { ...state, loading: true }
        case STOP_POST_LOADING:
            return { ...state, loading: false }
        case UPDATE_POST:
        case SET_LIKE:
            const getPostss = state.posts.map((ele) => ele._id === payload._id ? payload : ele);
            return { ...state, posts: getPostss }
        default:
            return state;
    }
}