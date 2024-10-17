import { combineReducers } from "@reduxjs/toolkit";
import authreducer from './Reducers/Auth/reducer'


const rootReducer = combineReducers({
  auth: authreducer,
});

export default rootReducer;
