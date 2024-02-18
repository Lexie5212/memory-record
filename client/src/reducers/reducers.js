import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
const postReducer = (posts = [], action) => {
    switch(action.type){
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts,action.payload];
        case UPDATE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));//the output should be array, action.payload is the new post
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);//filter out the one that wanna deleted
        case LIKE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        default:
            return posts;
    }
}
export default postReducer;