import { AUTH, LOGOUT, ERROR } from '../constants/actionTypes';

const initialState = { authData: null, error: '' };
const authReducer = (state =  initialState, action) => {
   switch (action.type) {
    case AUTH:
        console.log(action?.data);
        localStorage.setItem('profile',JSON.stringify({...action?.data}));
        return {...state, authData: action?.data, error: ''};
    case LOGOUT:
        localStorage.clear();
        return {...state, authData: null, error: '' };
    case ERROR:
        return {...state,  error: action.payload};
    default:
        return state;
   }
} 
export default authReducer;