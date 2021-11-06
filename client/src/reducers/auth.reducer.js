import { getProfileFromLocalStorage, removeProfileFromLocalStorage, setProfileFromLocalStorage } from "../config/common";
import { AUTH, LOG_OUT, NORMAL_AUTH } from "../constant";

const initialState = {
    authdata: null
};


let profile = getProfileFromLocalStorage();

if(profile){
    initialState.authdata = profile;
}

export default (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case AUTH:
            let ret = { ...payload?.result, token: payload?.token }
            setProfileFromLocalStorage(ret);
            return { ...state, authdata: ret };
        case LOG_OUT:
            removeProfileFromLocalStorage();
            return { ...state, authdata: null };
        case NORMAL_AUTH:
            removeProfileFromLocalStorage();
            return { ...state, authdata: profile ? profile : null};

        default:
            return state;
    }
}

