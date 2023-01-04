import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, TextInput, Modal, RefreshControl,ActivityIndicator, TouchableHighlight, Pressable } from 'react-native';
import cmstyle from '../Styles/commanstyle';
import styles from '../Styles/styles'
import Header from '../components/Header';
import Listingbox from '../components/Listingbox';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getList } from '../Redux/Actions/SiteListing';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';

const PendingSite = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [active, setactive] = useState(0)
    const state = useSelector(state => state.Sitelist)
    const [refreshing, setRefreshing] = React.useState(false);
    console.log("Pendinglist ", state)
    const navigation = useNavigation();
    const continuebtn = () => {
        navigation.navigate('OngoingList');
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getList("P"))
    }, [])

    const model = () => {
        setModalVisible(true)
    }
    const closemodel = () => {
        setModalVisible(!modalVisible)
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
    // const [secure, setSecure] = React.useState(props.secure);
    return (
        <SafeAreaView style={[cmstyle.flex_1]}>
            <StatusBar backgroundColor="#E2BC64" barStyle="dark-content" />
            <Header mysite modelddd={filter} sitename="Pending Site" />
            <View style={[cmstyle.items_center]}>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={style.centeredView}>

                            <View style={style.modalView}>
                                <Header filter close={closemodel} />

                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: '90%' }}>
                                        <Text style={[styles.fontMedium, { color: '#000000', fontSize: 16, marginTop: 5 }]}>Select Status</Text>
                                    </View>

                                    <TouchableOpacity onPress={() => { setactive(0) }}
                                        style={active === 0 ? style.Active : style.inactive} activeOpacity={0.5}>
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={active === 0 ? [styles.fontMedium, { fontSize: 18, color: '#fff', textAlign: 'center' }] : [styles.fontMedium, { fontSize: 18, color: '#938F8D', textAlign: 'center' }]}> MEASUREMENT SUBMITTED</Text>
                                        </View>

                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setactive(1) }}
                                        style={active === 1 ? style.Active : style.inactive} activeOpacity={0.5}>
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={active === 1 ? [styles.fontMedium, { fontSize: 18, color: '#fff', textAlign: 'center' }] : [styles.fontMedium, { fontSize: 18, color: '#938F8D', textAlign: 'center' }]}> BILL SUBMITTED</Text>
                                        </View>
                                    </TouchableOpacity>


                                    <TouchableOpacity onPress={() => { setactive(2) }}
                                        style={active === 2 ? style.Active : style.inactive} activeOpacity={0.5}>
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={active === 2 ? [styles.fontMedium, { fontSize: 18, color: '#fff', textAlign: 'center' }] : [styles.fontMedium, { fontSize: 18, color: '#938F8D', textAlign: 'center' }]}>SES CREATED</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setactive(3) }}
                                        style={active === 3 ? style.Active : style.inactive} activeOpacity={0.5}>
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={active === 3 ? [styles.fontMedium, { fontSize: 18, color: '#fff', textAlign: 'center' }] : [styles.fontMedium, { fontSize: 18, color: '#938F8D', textAlign: 'center' }]}>AMOUNT CREDITED</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ width: '90%' }}>
                                        <Text style={[styles.fontMedium, { color: '#000000', fontSize: 16, marginTop: 15 }]}>Select Month</Text>
                                    </View>
                                    <View style={{ width: "80%", height: 80, backgroundColor: '#F2F2F2', borderRadius: 10, marginTop: 10, padding: 10 }}>
                                        <Text style={[styles.fontMedium, { color: '#9FA2AA', fontSize: 18 }]}>select month and year</Text>
                                        <TouchableOpacity style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <Text style={[styles.fontMedium, { color: '#333F54', fontSize: 18 }]}>January - 2020</Text>
                                            <AntDesign
                                                name="calendar"
                                                size={30}
                                                color="#FE9A58"
                                                style={styles.menuIcon}
                                            />

                                        </TouchableOpacity>

                                    </View>
                                </View>

                            </View>
                        </View>
                    </Modal>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                    {state.getsitename == false ? <Loader /> : state.pendinglist == '' && !state.pendinglist.length ? <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                        <Text style={{ fontSize: 30 }}>No Sites Found</Text>
                    </View> : (state.pendinglist.map((index, i) => {
                       
                        return (
                            <View style={[cmstyle.flex_row, cmstyle.flex_wrap, {
                                marginTop: 10, borderRadius: 10
                            }]} key={index._id}>
                                <View style={[styles.nextvisitbox5]}>
                                    <Text style={[styles.fontSize_20, styles.fontbold, { textAlign: 'left', color: '#333F54' }]}>{index.sName}</Text>
                                    <View style={{ borderWidth: 1, borderColor: '#C3C3C362' }}></View>
                                    <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                        <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Enginner Name : </Text>
                                        <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.sUsername}</Text>
                                    </View>
                                    <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                        <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Date of Created : </Text>
                                        <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.dCreatedAt.split('T').[0]}</Text>
                                    </View>
                                    <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                        <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Length : </Text>
                                        <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.nMinLength}-{index.nMaxLength}Meters </Text>
                                        <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12, marginLeft: 50 }]}>Dept. :  </Text>
                                        <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.sDepartment}</Text>
                                    </View>
                                    <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                        <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Type of Work : </Text>
                                        <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.sWorktype}</Text>

                                    </View>
                                    <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                        <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Address : </Text>
                                        <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.sAddress}</Text>
                                    </View>
                                    <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                        <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Zone : </Text>
                                        <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.sZone}</Text>
                                    </View>
                                </View>

                            </View>
                        )
                    }))

                    }





                    <View style={{ padding: 50 }}></View>
                </ScrollView>
            </View>
            <View style={{ marginTop: 80 }}>

            </View>

        </SafeAreaView>

    )
}

const style = StyleSheet.create({


    centeredView: {
        // flex: 1,
        height: 100
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22
    },
    modalView: {
        // margin: 20,
        height: 480,
        backgroundColor: "#FFFFFF",
        // borderWidth: 1,
        // borderColor: '#707070',
        // borderRadius: 20,
        // padding: 35,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        // flex:3,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    inactive: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#938F8D',
        width: 330,
        height: 50,
        marginLeft: 5,
        marginTop: 10,
        borderRadius: 50
    },
    Active: {
        alignItems: 'center',
        backgroundColor: '#FA9A5B',
        borderColor: 'orange',
        width: 330,
        height: 50,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 50,
        color: 'blue',
        justifyContent: 'center',
    },

    inactive1: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#938F8D',
        width: 170,
        height: 50,
        marginLeft: 5,
        marginTop: 10,
        borderRadius: 50
    },
    Active1: {
        alignItems: 'center',
        backgroundColor: '#FA9A5B',
        borderColor: 'orange',
        width: 170,
        height: 50,
        marginTop: 10,
        borderWidth: 1,
        marginLeft: 5,
        borderRadius: 50,
        justifyContent: 'center',
    },

    activetext: {
        fontSize: 20,
        color: '#fff'
    },
    inactivetext: {
        fontSize: 20,
        color: '#938F8D'
    }
});



export default PendingSite;