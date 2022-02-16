import {combineReducers} from "redux";
import foodEntriesReducer from "./foodEntriesReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    foodEntriesReducer: foodEntriesReducer,
    authReducer: authReducer
})

export default rootReducer;
