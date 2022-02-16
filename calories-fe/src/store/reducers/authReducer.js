import * as actionTypes from '../actionTypes';
import {updateObject} from "../../utils/utils";
import {storeConstants} from "../../utils/constants";
import {initialAuthState} from "../../utils/reduxUtils";

const initialState = {
    error: false,
    ...(sessionStorage.getItem(storeConstants.AUTH) ?
        {...JSON.parse(sessionStorage.getItem(storeConstants.AUTH))} : {...initialAuthState})
}

const setError = (state, action) => {
    return updateObject(state, {error: action.payload});
}

const setLoginSuccess = (state, action) => {
    sessionStorage.setItem(storeConstants.AUTH, JSON.stringify(action.payload));
    return updateObject(state, {...action.payload});
}

const logoutUser = (state) => {
    sessionStorage.removeItem(storeConstants.AUTH);
    return updateObject(state, {...initialAuthState});
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH_ERROR:
            return setError(state, action);
        case actionTypes.LOGIN_USER_SUCCESS:
            return setLoginSuccess(state, action);
        case actionTypes.LOGOUT_USER:
            return logoutUser(state);
        default:
            return state;
    }
}

export default authReducer;