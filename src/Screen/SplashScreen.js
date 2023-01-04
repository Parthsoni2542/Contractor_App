import React, { useEffect, useRef, useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, StatusBar,Image,Modal,TouchableOpacity} from 'react-native';
const SplashScreen = () => {

    return (
        <View style={style.maincontainer}>
            <StatusBar backgroundColor="#FA9A5B" barStyle="dark-content" />
            <View style={style.logo}>
            <Image source={require('../Images/logo.png')} style={{ width: 120, height: 120, borderRadius: 10 }} />
            </View>
            <Text style={{ fontSize: 30, color: '#FFFFFF',fontWeight:'bold' }}>AB Infrastructure</Text>
        </View>

    )
}

const style = StyleSheet.create({

    maincontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FA9A5B',
    },
    logo: {
        width: 160,
        height: 160,
        borderRadius: 100,
        // borderWidth: 7,
        borderColor: '#707070',
        backgroundColor: '#eee',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    }
})


export default SplashScreen;