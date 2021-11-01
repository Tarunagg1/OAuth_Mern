import { CREATE_POST, DELETE_POST, FETCH_ALL_POST, SET_LIKE, UPDATE_POST } from "../constant";

const initialState = {
    posts: []
};

export default (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case FETCH_ALL_POST:
            return { ...state, posts: payload }
        case CREATE_POST:
            const getPost = [...state.posts];
            getPost.push(payload);
            return { ...state, posts: getPost }
        case DELETE_POST:
            let getPosts = state.posts.filter(post => post._id !== payload);
            console.log(getPosts);
            return { ...state, posts: getPosts }
        case UPDATE_POST:
        case SET_LIKE:
            const getPostss = state.posts.map((ele) => ele._id === payload._id ? payload : ele);
            return { ...state, posts: getPostss }
        default:
            return state;
    }
}