import {
    LOGIN_FAIL,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGOUT_USER

} from '../actionTypes/';

const initialState = {
    authToken: '',
    userType: 'L',
    userName : ''
}

const auth = (state = initialState, { type, data = null }) => {
    switch (type) {
        case LOGIN_SUCCESS:
            console.log("fffffff", payload);
            return {
                ...state,
                // authToken : payload.Authorization
                loading: false,
                data: payload,
                isLoggedIn: true,
            };
        case LOGOUT_USER:
            return {
                ...state,
                loading: false,
                data: null,
                isLoggedIn: false,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };

        default:
            return state;
    }

}
export default auth;

/*

{
    authToken : 'x',
    authToken : 'x',
    authToken : 'x',
}

*/