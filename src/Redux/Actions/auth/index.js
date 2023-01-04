import { Login, validateLogin } from '../../../api/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../helpers/axios';






export const loginUser = (sLogin, sPassword) => async (dispatch) => {

    const token = await AsyncStorage.getItem('token')
    fetch(`${Login}`, {
        "method": "POST",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            sLogin,
            sPassword
        })
    }).then(Response => Response.json())
        .then(res => {
            console.log("dndndnddmndmdnmdn",res)

            if(res.status == 200){
                dispatch({ type: "LOGIN", payload: {data:res, resMessage: res.message, resStatus: !!res.data } })
                AsyncStorage.setItem('token', res.Authorization);
                AsyncStorage.setItem('type', res.data.eType);
                AsyncStorage.setItem('uname', res.data.sName);
            }
            dispatch({ type: "LOGINFAIED", payload: { msg:'Invalid UserName and Password',invalid:false} })
            // props.storedata(list)
            // console.log('datassdddd', data.data.results)
        })

}


export const loginmsgclear = () => async (dispatch) => {
    dispatch({ type: "LOGINFAIED", payload: { msg:''} })
}
// export const loginUser = (sLogin, sPassword) => async (dispatch) => {

//     try {
//         const res = await axios.post(Login, {
//             sLogin,
//             sPassword
//         })
//         console.log(`object`, res)
//         // dispatch({ type: "LOGIN", payload: {data:res.data, resMessage: res.data.message, resStatus: !!res.data.data } })

//

//     }
//     catch (error) {
//         dispatch({ type: "LOGIN", payload: { resMessage: "failed", resStatus: false } })
//         console.log("error",error)
//     }
// }

export const getuser = () => async (dispatch) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const type = await AsyncStorage.getItem('type');
        const uname = await AsyncStorage.getItem('uname');
        // console.log(uname)
        if (token && token.length) {
            dispatch({ type: "GETUSER", payload: { resStatus: true, data: { type }, token: { token } || null }, uname: { uname } })
        } else {
            dispatch({ type: "GETUSER", payload: { resStatus: false, token: null } })

        }
    } catch (error) {
        console.log("ssssss", error.message)
    }

}


export const validateLoginbtn = () => async (dispatch) => {
    console.log()
    const token = await AsyncStorage.getItem('token') || ''
    console.log("token", token)
    console.log(token)
    fetch(`${validateLogin}`, {
        "method": "POST",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
    }).then(Response => Response.json())
        .then(data => {
            dispatch({ type: "VELIDATELOGIN", payload: { data: data.bIsValid } })
        }).catch((err) => {
            console.log("err", err)
        })
}



export const logoutBtn = () => async (dispatch) => {
    const token = await AsyncStorage.removeItem('token');
    const type = await AsyncStorage.removeItem('type');
    loginmsgclear()
    dispatch({ type: "GETUSER", payload: { resStatus: false, data: { type }, token: { token } } })
}