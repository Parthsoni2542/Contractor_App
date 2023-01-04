import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import cmstyle from '../Styles/commanstyle';
import styles from '../Styles/styles'
import Header from '../components/Header';
import Listingbox from '../components/Listingbox';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { currentsitedetail, getNotvisited } from '../Redux/Actions/SiteListing';
import Loader from '../components/Loader';
import { getAllworktype } from '../Redux/Actions/filter';
const NonVisted = () => {
    const navigation = useNavigation();
    const state = useSelector(state => state.Sitelist)
    const visited = useSelector(state => state.visited)
    const [refreshing, setRefreshing] = React.useState(false);
    const dispatch = useDispatch();
    // console.log("visted",visited.isStatus)
    // console.log(state.notvisitedlist)
    const checkinbtn = (x, y) => {
        console.log("x", x)
        console.log("y", y)
        // dispatch(currentsitedetail(x, y))
        // navigation.navigate('SiteLocation');
    }
    const filter = () => {

        navigation.navigate('Filter', {
            eStatus: "NV"
        })
    }

    useEffect(() => {
        dispatch(getAllworktype())
        dispatch(getNotvisited("NV"))
       
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(getNotvisited("NV")).then(() => setTimeout(function () { setRefreshing(false); }, 2000));
    }, []);


    return (
        <SafeAreaView style={[cmstyle.flex_1]}>
            <StatusBar backgroundColor="#FA9A5B" barStyle="dark-content" />
            <Header home filterdata={filter} eStatus="NV" />
            <View style={[cmstyle.items_center,cmstyle.flex_1, { marginTop: 90 }]}>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>

                    {
                        state.notvisitedloading == false ? <Loader /> : <Listingbox visitname btn={(x, y) => checkinbtn(x, y)} notvisitlist={state} />

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
    logo: {
        width: 160,
        height: 160,
        borderRadius: 100,
        // borderWidth: 7,
        borderColor: '#707070',
        backgroundColor: '#eee',
        borderWidth: 1,

        // marginBottom: 30
    }
})


export default NonVisted;