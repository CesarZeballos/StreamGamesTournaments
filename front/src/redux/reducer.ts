import { combineReducers } from "redux";

import exampleSlice from './slices/exampleSlice';

const rootReducer = combineReducers({
    example: exampleSlice,

})

export default rootReducer;