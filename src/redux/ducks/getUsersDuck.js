import axios from 'axios';

// const 
const initialState = {
    users: []
}

// types
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';

// reducers
export default function getUserReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USERS_SUCCESS:
            return {...state, users: action.payload}
        default:
            return state;
    }
}

// actions
export const getUsersAction = () => async (dispatch) => {
    const resp = await axios.get("/api/users/");
    dispatch({
        type: GET_USERS_SUCCESS,
        payload: resp.data.users
    })
}