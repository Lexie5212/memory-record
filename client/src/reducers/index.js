import { combineReducers } from "redux";
import reducer from './reducers';
import auth from './auth';

export default combineReducers({reducer, auth});