import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_STATE = {
    message:'',
    status:'',
    isStatus:false
    
};
const visited = (state = INITIAL_STATE, action) => {
    const payload = action.payload
    console.log(payload)
    switch (action.type) {
        case 'SITEADD': {
            setTimeout(() => {
               if(payload.added) {
                return {
                    ...state,
                    isStatus:false
                  }
               }
            }, 5000);
            return {
                ...state,
                message:payload.data,
                status:payload.status,
                isStatus:payload.added
              }
            
        }        
    default:
        return state
    }
    
}

export default visited;