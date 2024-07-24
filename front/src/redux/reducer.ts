import { combineReducers } from "redux";

import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
    user: userSlice,

})

export default rootReducer;