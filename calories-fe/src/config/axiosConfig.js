import axios from "axios";
import {storeConstants} from "../utils/constants";
import {store} from "../store/store";
import * as actions from "../store/actions";

export const API_DRIVER = axios.create(
    {
        baseURL: process.env.REACT_APP_API_BASE_URL,
        responseType: "json"
    }
)

API_DRIVER.interceptors.request.use(
    config => {
        const auth = JSON.parse(sessionStorage.getItem(storeConstants.AUTH));
        if (auth) {
            config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

API_DRIVER.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error?.response?.status === 401) {
            store.dispatch(actions.logoutUser());
        }
        return Promise.reject(error);
    }
);

export const NUTRITIONIX_API_DRIVER = axios.create(
    {
        baseURL: process.env.REACT_APP_NUTRITIONIX_API_BASE_URL,
        responseType: "json",
        headers: {
            "x-app-id": process.env.REACT_APP_NUTRITIONIX_APP_ID,
            "x-app-key": process.env.REACT_APP_NUTRITIONIX_API_KEY
        }
    }
)