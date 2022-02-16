import {API_DRIVER} from "../config/axiosConfig";
import {endpoints} from "../utils/constants";

const AuthApi = {
    login: (body) => {
        return API_DRIVER.post(endpoints.LOGIN, body)
    },
    register: (body) => {
        return API_DRIVER.post(endpoints.REGISTER, body);
    }
}

export default AuthApi;