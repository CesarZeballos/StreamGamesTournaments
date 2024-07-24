import { combineReducers } from "redux";

import loginSlice from "./slices/loginSlice";

const rootReducer = combineReducers({
    login: loginSlice,

})

export default rootReducer;