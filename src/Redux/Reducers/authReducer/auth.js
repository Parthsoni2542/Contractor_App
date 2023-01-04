import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_STATE = {
  authToken: '',
  userType: '',
  userName: '',
  resStatus: false,
  resMessage: '',
  bIsValid:null,
  msg:'',
  invalid:true
};
const auth = (state = INITIAL_STATE, action) => {
  const payload = action.payload
  switch (action.type) {
    
    case 'LOGIN': {
      console.log("resStatus: false",payload.data.Authorization);
      // console.log("token",payload.data.Authorization)
      // console.log("eType",payload.data.eType)
      // console.log("sName",payload.data.sName)
      // console.log("resMessage",payload.resMessage)
      // console.log("resStatus",payload.resStatus)
      return {
        ...state,
        authToken:payload.data.Authorization,
        userType:payload.data.data.eType,
        userName:payload.data.data.sName,
        resMessage:payload.data.resMessage,
        resStatus:payload.data.resStatus
      }
    }

    case 'LOGINFAIED':{
      console.log("resStatus: false",payload);
      setTimeout(() => {
        return {
          ...state,
          msg:'',
          invalid:payload.invalid
        }   
      }, 2000); 
      return {
        ...state,
        msg:payload.msg,
        invalid:payload.invalid
      }
    }

    case 'GETUSER': {
      console.log("logindata", payload);
      // console.log("state",  state,
      // );
      return {

        ...state,
        resMessage: payload.resMessage,
        resStatus: payload.resStatus,
        userType: payload?.data?.type || '',
        authToken: payload?.token?.token || null,
        userName: payload?.uname?.uname || ''
      }
    }

    case 'VELIDATELOGIN': {

      return {
        ...state,
        bIsValid: payload.data,
       
      }
    }

    
    default:
      return state
  }
};

export default auth;