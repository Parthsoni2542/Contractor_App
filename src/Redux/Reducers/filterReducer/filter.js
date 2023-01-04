import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_STATE = {
    alldept:'',
    allzone:'',
    allwork:''
};
const filter = (state = INITIAL_STATE, action) => {
    const payload = action.payload
    console.log("payload",payload)
    switch (action.type) {
        case 'GETALLDEPT': {
            return {
                ...state,
                alldept:payload.data
              }
            
        }
        case 'GETALLZONE': {
            return {
                ...state,
                allzone:payload.data
              } 
        }

       case 'GETALLWORK':{
        return {
            ...state,
            allwork:payload.data
          }   
    }  
       

        
    default:
        return state
    }
    
}

export default filter;