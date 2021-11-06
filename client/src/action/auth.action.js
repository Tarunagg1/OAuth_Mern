import { toast } from 'react-toastify';
import * as api from '../api';
import { AUTH } from '../constant';


export const loginUser = (formdata, history) => {
    return async (dispatch) => {
        try {
            const { data } = await api.loginApi(formdata);
            dispatch({ type: AUTH, payload: { result: data.result, token: data.token } });
            history.push('/');
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message)
            }
        }
    }
}


export const registerUser = (formdata, history) => {
    return async (dispatch) => {
        try {
            const { data } = await api.registerApi(formdata);
            console.log(data);
            dispatch({ type: AUTH, payload: data });
            history.push('/');
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

