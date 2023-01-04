import React, { useState,useEffect } from 'react'
import { View, SafeAreaView, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, TextInput ,ActivityIndicator,RefreshControl} from 'react-native';
import cmstyle from '../Styles/commanstyle';
import styles from '../Styles/styles'
import Header from '../components/Header';
import Listingbox from '../components/Listingbox';
import { useNavigation } from '@react-navigation/native';
import { getOngoig } from '../Redux/Actions/SiteListing';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
const SuperOngoing = () => {
    const navigation = useNavigation();
    const state = useSelector(state => state.Sitelist)
    console.log("OngoingList",state.ongoing)
    const [refreshing, setRefreshing] = React.useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOngoig("ON"))
    }, [])
 const Remarkbtn = ()=>{
     navigation.navigate('Remark')
 }
 const filter = () => {
    navigation.navigate('Filter', {
        eStatus: "ON",
    })
}


const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getOngoig("ON")).then(() => setTimeout(function () { setRefreshing(false); }, 2000));
}, []);
    return (
        <SafeAreaView style={[cmstyle.flex_1]}>
            <StatusBar backgroundColor="#FA9A5B" barStyle="dark-content" />
            <Header home filterdata={filter} otherParam="Header"/>
            <View style={[cmstyle.items_center, { marginTop: 90 }]}>
                <ScrollView showsVerticalScrollIndicator={false}  refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                } >

                { state.loadings== false ? <Loader/> : <Listingbox OnGoingSupervisior  ongoing={state.ongoing} btnname={Remarkbtn} eStatus="ON"/>
                    
            }
                    
                </ScrollView>

            </View>
            <View style={{ marginTop: 80 }}>

            </View>

        </SafeAreaView>

    )
}

const style = StyleSheet.create({

    maincontainer: {
        flex: 1,
        backgroundColor: '#fff',
    },

})


export default SuperOngoing;