import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, TextInput, RefreshControl,ActivityIndicator } from 'react-native';
import cmstyle from '../Styles/commanstyle';
import styles from '../Styles/styles'
import Header from '../components/Header';
import Listingbox from '../components/Listingbox';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currentsitedetail, getOngoig } from '../Redux/Actions/SiteListing';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
const OnGoing = () => {
    const navigation = useNavigation();
    const state = useSelector(state => state.Sitelist)
    console.log("OngoingList", state.ongoing)
    const [refreshing, setRefreshing] = React.useState(false);
    const dispatch = useDispatch();

    const continuebtn = (x, y) => {
        dispatch(currentsitedetail(x, y))
        navigation.navigate('OngoingList');
    }
    useEffect(() => {
        dispatch(getOngoig("ON"))
    }, [state.loadings])

    const filter = () => {
        navigation.navigate('Filter', {
            EEStatus: "ON"
        })
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(getOngoig("ON")).then(() => setTimeout(function () { setRefreshing(false); }, 2000));
    }, []);

    // console.log("fgfgfggf",state.loadings)
    return (
        <SafeAreaView style={[cmstyle.flex_1]}>
            <StatusBar backgroundColor="#FA9A5B" barStyle="dark-content" />
            <Header home filterdata={filter} />
            <View style={[cmstyle.items_center, { marginTop: 90 }]}>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>


                    {
                        state.loadings == false ? <Loader/> : <Listingbox OnGoing btn={(x, y) => continuebtn(x, y)} ongoing={state.ongoing} />

                    }

                </ScrollView>

            </View>
            <View style={{ padding:60}}>

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


export default OnGoing;