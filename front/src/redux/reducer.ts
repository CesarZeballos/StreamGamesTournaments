import { combineReducers } from "redux";

import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
    user: userSlice,
    // tournament: tournamentSlice,

})

export default rootReducer;