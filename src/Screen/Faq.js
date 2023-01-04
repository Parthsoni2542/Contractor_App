import React from 'react'
import { View, SafeAreaView, Text, StyleSheet, StatusBar} from 'react-native';
import cmstyle from '../Styles/commanstyle';
import styles from '../Styles/styles'
import Header from '../components/Header';
const Faq = () => {
    return (
       <SafeAreaView style={[cmstyle.flex_1]}>
            <StatusBar backgroundColor="#FA9A5B" barStyle="dark-content" />
            <Header outgoinglist name="FAQ" />
            </SafeAreaView>

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


export default Faq;