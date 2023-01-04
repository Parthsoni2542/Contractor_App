import React from 'react'
import { View, SafeAreaView, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import cmstyle from '../Styles/commanstyle';
import styles from '../Styles/styles'


import { useNavigation } from '@react-navigation/native';

const Thanks = () => {
     const navigation = useNavigation();
    const continuebtn = () => {
        console.log("ddd")
        navigation.navigate('Home');
    }
    return (
        <View style={style.maincontainer}>
            <StatusBar backgroundColor="#FA9A5B" barStyle="dark-content" />
            <View style={style.logo}>
                <Entypo
                    name="check"
                    size={100}
                    color="#FA9A5B"

                />
            </View>
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <Text style={[styles.fontbold,{ fontSize: 40, color: '#FFFFFF' ,textAlign:'center'}]}>Successfully Submitted</Text>
            </View>
            <TouchableOpacity style={[styles.loginbtn3]} activeOpacity={0.9} onPress={continuebtn} >
                <Text style={[styles.btntext3,styles.fontMedium]}>GO TO HOME</Text>
            </TouchableOpacity>
           
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
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    }
})


export default Thanks;