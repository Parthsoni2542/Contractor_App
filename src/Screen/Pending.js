import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, SafeAreaView, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, RefreshControl, TextInput, ActivityIndicator } from 'react-native';
import cmstyle from '../Styles/commanstyle';
import styles from '../Styles/styles'
import Header from '../components/Header';
import Listingbox from '../components/Listingbox';
import { currentsitedetail, getList } from '../Redux/Actions/SiteListing'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import { getAllworktype } from '../Redux/Actions/filter';
const Pending = () => {
    const state = useSelector(state => state.Sitelist)
    console.log("pendinglist", state.pendinglist)
    const [value, setValue] = useState();
    const [refreshing, setRefreshing] = React.useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getList("P"))
        dispatch(getAllworktype())
    }, [state.getsitename])


    const checkinbtn = (x, y) => {
        dispatch(currentsitedetail(x, y))
        navigation.navigate('CheckIn');
    }

    const filter = () => {
        navigation.navigate('Filter', {
            eStatus: "P"
        })
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(getList("P")).then(() => setTimeout(function () { setRefreshing(false); }, 2000));
    }, []);

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
                }
                >

                    {state.getsitename == false ? <Loader /> :
                        <Listingbox pending btn={(x, y) => checkinbtn(x, y)} pendinglist={state} />
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


export default Pending;