import React, { useEffect, useRef, useState } from 'react';
// import cmstyle from './src/Styles/commanstyle';
import cmstyle from './src/Styles/commanstyle'
import Navigation from './src/Navigation/Navigation.js'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import store from './src/Redux/combineReducers';

import { View, SafeAreaView, Text, StyleSheet, StatusBar,Image,Modal,TouchableOpacity} from 'react-native';
import NetInfo from '@react-native-community/netinfo'

console.log("All Application state store in Redux", store.getState());
const App = () => {
  const [networkpage, setNetworkpage] = useState(false)
  const [isInternetReachable, setIsInternetReachable] = useState(true)

   
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
        if (state.isConnected === false) {
            // setLoader(true)
            setNetworkpage(true)
        } else {
            setNetworkpage(false)
        }
        // setIsInternetReachable(state.isInternetReachable ?? false)
    })
    return () => {
        unsubscribe()
    }

}, [])

const networkMsg = () => {
    return (
        <Modal
            transparent={true}
            visible={networkpage}
           >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', backgroundColor: '#f2f2f2' }}>
            <Image source={require('./src/Images/noInternet.png')}  style={{width:200,height:200}} />
                <Text style={{ fontSize:23,marginTop:5}}>Whoops !</Text>
                <Text style={{ fontSize:16,color:'black'}}>Slow or no internet connection</Text>
                <Text style={{ fontSize:16,color:'black'}}>Check your internet connection and try again.</Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{ backgroundColor:'#FA9A5B',
                    borderRadius:8,
                    paddingVertical:10,
                    marginTop:15,
                    paddingHorizontal:50}}
                >
                    <Text style={{fontSize:20,
                        color:'#fff'}}>Retry</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
  return (
    <Provider store={store}>
      <SafeAreaView style={cmstyle.flex_1}>
      {networkMsg()}
        <Navigation />
      </SafeAreaView>
    </Provider>
  )
}

export default App;