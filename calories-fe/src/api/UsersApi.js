import {API_DRIVER} from "../config/axiosConfig";
import {endpoints} from "../utils/constants";

const UsersApi = {
    inviteFriend: (body) => {
        return API_DRIVER.post(endpoints.INVITE_FRIEND, body);
    }
}

export default UsersApi;