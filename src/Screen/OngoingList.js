import React, { useState, useRef, useEffect } from 'react'
import { View, SafeAreaView, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image, Dimensions, BackHandler, Alert } from 'react-native';
import cmstyle from '../Styles/commanstyle';
import styles from '../Styles/styles';
import Header from '../components/Header';
import RBSheet from "react-native-raw-bottom-sheet";
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Ongoing } from '../Redux/Actions/ongoing';
import { useSelector, useDispatch } from 'react-redux';
import { Checkoutbtn } from '../Redux/Actions/checklist';
import Loader from '../components/Loader';
import { getList } from '../Redux/Actions/SiteListing';
import { aws } from '../api/api';
const windowWidth = Dimensions.get('window').width;
const OngoingList = () => {
    const state = useSelector(state => state.ongoinglist)
    console.log("dddddcbcdcd", state.ongoinglist)
    const dispatch = useDispatch();
    const getsitedetail = useSelector(state => state.Sitelist)
    console.log(getsitedetail)
    const navigation = useNavigation();
    const submitbtn = (id, name, type, url) => {

        if (type == "V") {
            navigation.navigate('VideoList', {
                name: name,
                id: id,
                currentsite: getsitedetail.currentsiteid,
                url: url
            });
        } else {
            navigation.navigate('Ongoingworks', {
                name: name,
                id: id,
                currentsite: getsitedetail.currentsiteid,
                url: url
            });
        }

    }

    const submitbtn12 = () => {
        navigation.navigate('UploadMeasurement', {
            id: getsitedetail.currentsiteid,
            name: getsitedetail.currensitename
        });
    }

    useEffect(() => {
        dispatch(Ongoing(getsitedetail.currentsiteid))
        // HandBack();

    }, [])


    // const HandBack = () => {
    //     BackHandler.addEventListener('hardwareBackPress', HandleBackPressed);
    //     return () => {
    //         BackHandler.removeEventListener('hardwareBackPress', HandleBackPressed);
    //     }
    // }

    // const showAlert = () =>
    //     Alert.alert(
    //         "Are You Sure Exit ?",
    //         "My Alert Msg",
    //         [
    //             {
    //                 text: "Yes",
    //                 onPress: () => Alert.alert("Cancel Pressed"),
    //                 style: "cancel",
    //             }, {
    //                 text: "No",
    //                 onPress: () => Alert.alert("Cancel Pressed"),
    //                 style: "cancel",
    //             },
    //         ],
    //         {
    //             cancelable: true,
    //             onDismiss: () =>
    //                 Alert.alert(
    //                     "This alert was dismissed by tapping outside of the alert dialog."
    //                 ),
    //         }
    //     );


    // const HandleBackPressed = () => {
    //     console.log("back")
    //     // showAlert()

    //     dispatch(Ongoing(getsitedetail.currentsiteid))
    //     dispatch(getList("P"))
    //     // dispatch(getList("ON"))
    //     navigation.navigate('Home')
    //     return true;


    // };

    // const submitbtn1 = () => {

    //     navigation.navigate('Ongoingworks', {
    //         name: "COMPACTCTION ON EARTH"
    //     });
    // }
    // const submitbtn2 = () => {

    //     navigation.navigate('Ongoingworks', {
    //         name: "EXCVATION DEPTH"
    //     });
    // }
    // const submitbtn3 = () => {

    //     navigation.navigate('Ongoingworks', {
    //         name: "WMM LAYING"
    //     });
    // }

    // const submitbtn4 = () => {

    //     navigation.navigate('Ongoingworks', {
    //         name: "WMM COMPACTION"
    //     });
    // }


    const cleardata = () => {
        dispatch(Checkoutbtn(getsitedetail.currentsiteid))
        dispatch(getList("ON"))
        dispatch(getList("P"))
        navigation.navigate('Home')
    }

    const isStartbtn = (state.ongoinglist.filter((item, i) => {
        console.log("item", item)
        return !item.aMediaUrls
    })).length > 0

    return (
        <SafeAreaView style={[cmstyle.flex_1]}>
            <StatusBar backgroundColor="#FA9A5B" barStyle="dark-content" />
            <Header CheckList name="On Going" btnname={"SUBMIT"} btna={submitbtn12} clear={cleardata} img={state.ongoinglist == '' || state.ongoinglist.length == 0 ? '' : null} startbtn={isStartbtn} />
            <ScrollView>
                {state.loader == false ? <Loader /> :
                    state.ongoinglist == '' || state.ongoinglist.length == 0 ? <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}><Text style={{ fontWeight: 'bold', fontSize: 20 }}>No Ongoing Sites Found</Text></View> : state.ongoinglist.map((index, i) => {
                        console.log("index", index.aMediaUrls)
                        return (
                            <View style={[cmstyle.items_center, cmstyle.justify_center]}>
                                <View style={[{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }]}>
                                    <TouchableOpacity style={[styles.nextvisitbox2]} onPress={() => submitbtn(index.iSiteStepId, index.sTitle, index.eMediaType, index.aMediaUrls)} activeOpacity={0.9}>
                                        <View style={{ alignItems: 'center' }}>
                                            {console.log("sgdfgdfdgdgddgfgd", index.sImage)}
                                            <Image  source={{
                                                uri: (aws + index.sImage)}} height={50} style={{
                                                width: windowWidth - 67,
                                                height: 152,
                                                borderRadius: 9,
                                                // marginTop: 11,

                                                backgroundColor: '#fbf4e6',
                                            }} resizeMode="cover" />
                                            
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{index.sTitle}</Text>


                                </View>
                                {console.log("state.ongoinglist", state.ongoinglist)}
                                {
                                    index.bIsUploaded == false ? <View style={{ width: 60, height: 60, borderWidth: 1, position: 'absolute', right: 7, top: 50, borderRadius: 15, borderColor: '#FFA368', backgroundColor: '#ffff', alignItems: 'center', justifyContent: 'center' }}>
                                        <Ionicons
                                            name="time-outline"
                                            size={38}
                                            color="#FFA368"
                                            style={styles.menuIcon}
                                        />
                                    </View> : <View style={{ width: 60, height: 60, borderWidth: 1, position: 'absolute', right: 7, top: 50, borderRadius: 15, borderColor: '#008018', backgroundColor: '#ffff', alignItems: 'center', justifyContent: 'center' }}>
                                        <AntDesign
                                            name="checkcircleo"
                                            size={38}
                                            color="#008018"
                                            style={styles.menuIcon}
                                        />
                                    </View>
                                }

                            </View>
                        )
                    })
                }




                <View style={{ padding: 20 }}></View>

            </ScrollView>
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


export default OngoingList;