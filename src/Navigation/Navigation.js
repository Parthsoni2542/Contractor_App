import React, { lazy, useEffect, Suspense, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Splash from '../Screen/SplashScreen';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getuser, validateLoginbtn } from '../Redux/Actions/auth'
// import { GlobalContext } from '../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from './AuthNavigator';
import SuperVisorNavigator from './SuperVisorNavigator';
import LabourNavigator from './LabourNavigator';
import Loader from '../components/Loader';

// const AuthNavigator = lazy(() => import('./AuthNavigator'));

export default function Navigator() {
    const dispatch = useDispatch()
    const state = useSelector(state => state.auth)
    const [isLoading, setisLoading] = useState(true)
    const [authLoaded, setAuthLoaded] = useState(false);



    useEffect(() => {
        if (state.authToken == '') {
            dispatch(getuser())
            

        } else { 
            // dispatch(validateLoginbtn()) 
            setisLoading(false)
        }

    }, [state.authToken]);
 

    if (isLoading) {
        return <Splash />;
    }

  
    return (

        <NavigationContainer>
            {
                state.authToken == null ? <AuthNavigator /> : (state.userType == 'L' ?<LabourNavigator />:<SuperVisorNavigator/>)
            }


        </NavigationContainer>



    )


}




