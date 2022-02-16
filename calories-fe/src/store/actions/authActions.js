import * as actionTypes from '../actionTypes';
import AuthApi from "../../api/AuthApi";
import {toastError, toastSuccess} from "../../components/shared/toast/Toast";
import UsersApi from "../../api/UsersApi";

export const loginUser = (body) => {
    return dispatch => {
        dispatch({type: actionTypes.SET_AUTH_ERROR, payload: false})
        AuthApi.login(body).then(res => {
            dispatch({type: actionTypes.LOGIN_USER_SUCCESS, payload: res.data})
        }).catch(e => {
            console.error(e);
            dispatch({type: actionTypes.SET_AUTH_ERROR, payload: true})
        })
    }
}

export const registerUser = (body) => {
    AuthApi.register(body).then(() => {
        toastSuccess("Successfully registered!")
    }).catch(e => {
        console.error(e);
        toastError("Error registering user, please try again!")
    })
}

export const logoutUser = () => {
    return dispatch => {
        dispatch({type: actionTypes.LOGOUT_USER})
    }
}

export const inviteFriend = (body) => {
    UsersApi.inviteFriend(body).then(res => {
        console.log(res.data);
        toastSuccess("Successfully invited a friend")
    }).catch(e => {
        console.error(e);
        toastError("Error inviting friend")
    })

}