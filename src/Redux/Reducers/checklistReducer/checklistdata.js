import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_STATE = {
    checklistdata:[], 
    message:''   
};
const checklistdata = (state = INITIAL_STATE, action) => {
    const payload = action.payload
    console.log(payload)
    switch (action.type) {
        case 'CHECKLISTDATA': {
            return {
                ...state,
                checklistdata:payload.data,
                message:payload.data,
              }   
        }
        case 'BSCMSG': {
            return {
                ...state,
                message:payload.data
              } 
        }
        case 'REMARK': {
            return {
                ...state,
                message:payload.data
              } 
        }   
        case 'BOOK': {
            return {
                ...state,
                message:payload.data
              } 
        }
        case 'CHECKLISTMSG': {
            return {
                ...state,
                message:payload.data
              } 
        }

        
        case 'SITEPHOTOS': {
            return {
                ...state,
                message:payload.data
              } 
        }
          
    default:
        return state
    }
    
}

export default checklistdata;