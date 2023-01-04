import React,{createContext,useReducer} from 'react';
import authInatialState from './intialstate/authState';
import auth from './reducers/auth';

export const GlobalContext = createContext({});

const GlobalProvider = ({children})=>{
    const [authState, authDispatch] = useReducer(auth, authInatialState)


    return (
        <GlobalContext.Provider
         value={{authState,authDispatch}}>
         {children}
         </GlobalContext.Provider>
    ); 
};

export default GlobalProvider;