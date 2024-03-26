import * as api from '../api';
import { AUTH, ERROR  } from '../constants/actionTypes';
import {  MESSAGES } from '../constants/errorTypes';


export const signin = (formData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);

      localStorage.setItem('profile', JSON.stringify(data));
      dispatch({ type: AUTH, data });

      navigate('/');
    } catch (err) {
      console.log(err);
      const errorKey = err.response?.data?.error;
      
      const errorMessage = MESSAGES[errorKey] || MESSAGES.default;
      
      dispatch({ type: ERROR, payload: errorMessage });
    }
  };
export const signup = (formData, navigate) => async (dispatch) => {
    console.log(formData);
    try {
      const { data } = await api.signUp(formData);

      localStorage.setItem('profile', JSON.stringify(data));
      dispatch({ type: AUTH, data });
  
      navigate('/');
    } catch (err) {
      console.log(err);
      const errorKey = err.response?.data?.error;

      const errorMessage = MESSAGES[errorKey] || MESSAGES.default;

      dispatch({ type: ERROR, payload: errorMessage });
    }
  };
