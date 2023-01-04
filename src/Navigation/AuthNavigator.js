import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screen/Login';


const AuthNavigator = () => {
    const AuthStack = createStackNavigator();
    return (
        <AuthStack.Navigator screenOptions={{headerShown:false}}>
            <AuthStack.Screen name="Login" component={Login}></AuthStack.Screen>
        </AuthStack.Navigator>
    );
}

export default AuthNavigator;