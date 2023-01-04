import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from '../../actionTypes';
import axios from '../../../helpers/axios';


const errMsg = 'Server is unavailable.'
const loginUser = ({ sPassword, sLogin }) => async (dispatch) => {
  console.log("Dddddd", sPassword)
  console.log("sLogin", sLogin)


  try {
    const res = await axios.post(`/users/auth/login`, { sLogin, sPassword })
    dispatch({
      type: LOGIN_SUCCESS,
      resMessage: res.data.message,
      resStatus: true,
      payload: res.data.data,
    })
  }
  catch (err) {
    if (err?.response?.data) {
      dispatch({
        type: LOGIN_FAIL,
        resStatus: false,
        resMessage: errMsg
      })
    }
    else {
      dispatch({
        type: LOGIN_FAIL,
        resStatus: false,
        resMessage: errMsg
      })
    }
  }

  // axios.post(Login, {
  //   sPassword,
  //   sLogin,
  // })
  //   .then((res) => {
  //     AsyncStorage.setItem('token', res.data.Authorization);
  //     AsyncStorage.setItem('type', res.data.data.eType);
  //     // console.log("token",res.data.Authorization)
  //     // console.log("token",res.data.data.eType)
  //     //   AsyncStorage.setItem('user', JSON.stringify(res.data.user));
  //     dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: res.data,
  //     });
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: LOGIN_FAIL,
  //       payload: err.response
  //         ? err.response.data
  //         : { error: 'Something went wrong, try agin' },
  //     });
  //   });
};

const setUserStatus = () => dispatch => {
    try {
      dispatch({
        type: ,
        resMessage: res.data.message,
        resStatus: true,
        payload: res.data.data,
      })
    }
    catch (err) {
      if (err?.response?.data) {
        dispatch({
          type: LOGIN_FAIL,
          resStatus: false,
          resMessage: errMsg
        })
      }
      else {

      }
    }

}

export default {
  loginUser,
  setUserStatus
}