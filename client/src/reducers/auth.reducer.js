import { AUTH, LOG_OUT } from "../constant";

const initialState = {
    authdata: null
};

const setProfileFromLocalStorage = (data) => {
    localStorage.setItem("profile", JSON.stringify(data));
}
const removeProfileFromLocalStorage = () => {
    localStorage.removeItem("profile");
}
const getProfileFromLocalStorage = (token) => {
    return JSON.parse(localStorage.getItem("profile"));
}


export default (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case AUTH:
            console.log(payload);
            setProfileFromLocalStorage(payload?.result);
            return { ...state, authdata:{...payload?.result,token:payload?.result.token} };
        case LOG_OUT:
            removeProfileFromLocalStorage();
            return { ...state, authdata: null };
        default:
            return state;
    }
}

export { getProfileFromLocalStorage }