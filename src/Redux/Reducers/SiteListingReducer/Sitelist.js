import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_STATE = {
    pendinglist:'',
    notvisitedlist:'',
    ongoing:'',
    compltedlist:'',
    currentsiteid:'',
    currensitename:'',
    getsitename:false,
    loadings:false,
    cmploading:false,
    notvisitedloading:false,
    sitedata:''


};
const Sitelist = (state = INITIAL_STATE, action) => {
    const payload = action.payload
    // console.log("ddhdhdhdhhdhdhdhdghdddgddgd",payload)
    switch (action.type) {
        case 'GETPENDING': {
            return {
                ...state,
                pendinglist:payload.data,
                getsitename:payload.getsitename
              }
        }
        case 'GETNOTVISIED': {
            return {
                ...state,
                notvisitedlist:payload.data,
                notvisitedloading:payload.notvisitedloading,
              } 
        }
       case 'GETNOGOING':{
        return {
            ...state,
            ongoing:payload.data,
            loadings:payload.loadings,
          }   
    }  
    case 'GETCOMPLITED':{
        return {
            ...state,
            compltedlist:payload.data,
            cmploading:payload.cmploading,
          }   
    }
    case 'GETSITEDETAIL':{
        return {
            ...state,
            currentsiteid:payload.id,
            currensitename:payload.name
            // compltedlist:payload.data
          }   
    } 
    case 'GETSITEDATA':{
        return {
            ...state,
            sitedata:payload,

            // compltedlist:payload.data
          }   
    } 
     
    default:
        return state
    }
    
}

export default Sitelist;