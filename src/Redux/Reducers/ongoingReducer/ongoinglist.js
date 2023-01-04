import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_STATE = {
    ongoinglist:[], 
    message:'' ,
    sitestep:'',
    loader:false,
    msg:''
};
const ongoinglist = (state = INITIAL_STATE, action) => {
    const payload = action.payload
    console.log("databbasse",payload)
    switch (action.type) {
        case 'ONGOINGLIST': {
            return {
                ...state,
                ongoinglist:payload.data,
                loader:payload.loader
                // message:payload.data,
                // status:payload.status,
                // isStatus:payload.added
              }   
        } 
        case 'SITESTEPSTORE': {

            console.log("payloadsssssddd",payload)
            return {
                ...state,
                sitestep:payload.data,
                msg:payload.msg
                // message:payload.data,
                // status:payload.status,
                // isStatus:payload.added
              }   
        }        
    default:
        return state
    }
    
}

export default ongoinglist;