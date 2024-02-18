import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

//action creators
export const getPosts = () => async(dispatch) => {//dispatch from redux-thunk
    // const action = { type:'FETCH_ALL', payload:[]}

    // dispatch(action);
    try {
        const { data } = await api.fetchPosts();//fetching data from api
        dispatch({ type: FETCH_ALL, payload: data }) ;//sending data thr action payload,in the reducer,return action.payload

     } catch (error) {
        console.log(error);
    }
}
export const createPost = (post) => async(dispatch) =>{
    try{
        const { data } = await api.createPost(post);
        dispatch({ type:CREATE, payload: data })
    }
    catch(error){
        console.log(error);
    }
}
export const updatePost = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);
  
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const deletePost = (id) => async (dispatch) => {
    try {
      await api.deletePost(id);
  
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error);
    }
  };
  export const likePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
  
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };