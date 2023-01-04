import React, { useState, useRef } from 'react'
import { View, SafeAreaView, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import cmstyle from '../Styles/commanstyle';
import styles from '../Styles/styles';
import { useNavigation } from '@react-navigation/native';
import Loader from './Loader';
import DropDownPicker from 'react-native-dropdown-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSelector, useDispatch } from 'react-redux';
import { updateWorktypeData } from '../Redux/Actions/Visitsite';
import { getList, getNotvisited } from '../Redux/Actions/SiteListing';
import { getAllworktype } from '../Redux/Actions/filter';
import Feather from 'react-native-vector-icons/Feather';
const Listbox = (props) => {
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [siteid, setsiteid] = useState("");
    const states = useSelector(state => state.visited)
    const [modalVisible, setModalVisible] = useState(false);
    const stateauth = useSelector(state => state.auth)
    const refRBSheet = useRef();
    const dispatch = useDispatch();
    const state = useSelector(state => state.filter)
    const [refreshing, setRefreshing] = React.useState(false);

    const [items, setItems] = useState(
        state.allwork == '' ? [] : state.allwork.map((index, i) => (
            { label: index.sName, value: index._id }
        )))
    const bottomopen = (isiteid) => {
        dispatch(getAllworktype())
        refRBSheet.current.open()
        setsiteid(isiteid)


    }

    const updateworktype = () => {
        dispatch(updateWorktypeData(siteid, value))
        dispatch(getNotvisited("NV"))
        refRBSheet.current.close()

    }





    // console.log("props",props.pendinglist.pendinglist)
    const emplogo = () => {
        if (props.pending) {
            return (
                <View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {

                            !props.pendinglist.pendinglist || !props.pendinglist.pendinglist.length ? <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                                <Text style={{ fontSize: 30 }}>No Sites Found</Text>
                            </View> : props.pendinglist.pendinglist.map((index, i) => {
                                console.log(index.sName)
                                return (
                                    <>
                                        <View style={[cmstyle.flex_row, styles.sado, { marginTop: 10, }]} key={index._id}>

                                            {/* <Modal
                                                animationType="slide"
                                                transparent={true}
                                                visible={modalVisible}
                                                onRequestClose={() => {
                                                    Alert.alert("Modal has been closed.");
                                                    setModalVisible(!modalVisible);
                                                }}
                                            >
                                                <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
                                                    <View style={{ backgroundColor: 'red', flex: 1 }}>
                                                        <View style={{ width: '100%', height: '50%', }}>
                                                           
                                                        </View>
                                                    </View>
                                                </SafeAreaView>
                                            </Modal> */}
                                            <View style={[styles.nextvisitbox]}>
                                                {/* <DropDownPicker
                                                    open={open}
                                                    value={value}
                                                    items={items}
                                                    setOpen={setOpen}
                                                    setValue={setValue}
                                                    setItems={setItems}
                                                /> */}
                                                <Text style={[styles.fontSize_20, styles.fontbold, { textAlign: 'left', color: '#333F54' }]}>{index.sName}</Text>
                                                <View style={{ borderWidth: 1, borderColor: '#C3C3C362' }}></View>
                                                <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                    <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Enginner Name: </Text>
                                                    <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.sUsername}</Text>
                                                </View>
                                                <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                    <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Date of Created: </Text>
                                                    <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.dCreatedAt.split('T').[0]}</Text>
                                                </View>
                                                <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                    <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Length: </Text>
                                                    <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.nMinLength}-{index.nMaxLength}Meters </Text>
                                                    <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12, marginLeft: 50 }]}>Dept.: </Text>
                                                    <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.sDepartment}</Text>
                                                </View>
                                                <View style={[cmstyle.flex_row, { marginTop: 10, width: '80%' }]}>
                                                    <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Type of Work: </Text>
                                                    <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.sWorktype}</Text>

                                                </View>
                                                <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                    <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Address: </Text>
                                                    <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}> {index.sAddress}</Text>
                                                </View>
                                                <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                    <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Zone: </Text>
                                                    <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.sZone}</Text>
                                                </View>
                                            </View>

                                        </View>
                                        <View style={[cmstyle.flex_row, cmstyle.flex_wrap]}>
                                            <TouchableOpacity style={[styles.pendingbtn, { alignItems: 'center', justifyContent: 'center' }]} onPress={() => props.btn(index._id, index.sName)} activeOpacity={0.7} >
                                                <Text style={[styles.btntext, styles.fontMedium]}>JOIN SITE</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </>
                                )
                            })
                        }

                        {/* </View> */}
                    </ScrollView>
                    <View style={{ padding: 40 }}></View>
                </View>
            )
        } else if (props.OnGoing) {
            return (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        !props.ongoing || !props.ongoing.length ? <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                            <Text style={{ fontSize: 30 }}>No Sites Found</Text>
                        </View> : props.ongoing.map((index, i) => {
                            return (
                                <View>
                                    <View style={[cmstyle.flex_row, cmstyle.flex_wrap, { marginTop: 10 }]}>
                                        <View style={[styles.nextvisitbox]}>
                                            <Text style={[styles.fontSize_20, styles.fontbold, { textAlign: 'left', color: '#FA9A5B' }]}>{index.sName}</Text>
                                            <View style={{ borderWidth: 1, borderColor: '#C3C3C362' }}></View>
                                            <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Enginner Name : </Text>
                                                <Text style={[styles.fontbold, { color: '#FA9A5B', fontSize: 12, }]}>{index.sUsername}</Text>
                                            </View>
                                            <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Date of Created : </Text>
                                                <Text style={[styles.fontbold, { color: '#FA9A5B', fontSize: 12, }]}>{index.dCreatedAt.split('T').[0]}</Text>
                                            </View>
                                            <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Length : </Text>
                                                <Text style={[styles.fontbold, { color: '#FA9A5B', fontSize: 12, }]}>{index.nMinLength}-{index.nMaxLength} Meters </Text>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12, marginLeft: 50 }]}>Dept. :  </Text>
                                                <Text style={[styles.fontbold, { color: '#FA9A5B', fontSize: 12, }]}>{index.sDepartment}</Text>
                                            </View>
                                            <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Type of Work : </Text>
                                                <Text style={[styles.fontbold, { color: '#FA9A5B', fontSize: 12, }]}>{index.sWorktype}</Text>

                                            </View>
                                            <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Address : </Text>
                                                <Text style={[styles.fontbold, { color: '#FA9A5B', fontSize: 12, }]}> {index.sAddress} </Text>
                                            </View>
                                            <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Zone : </Text>
                                                <Text style={[styles.fontbold, { color: '#FA9A5B', fontSize: 12, }]}>{index.sZone}</Text>
                                            </View>
                                            {
                                                
                                                index.aMeasurementBook_status == "reject" ? <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                    <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Reject Reason: </Text>
                                                    <Text style={[styles.fontbold, { color: '#FA9A5B', fontSize: 12, width: 200 }]} >{index.aMeasurementBook_reason}</Text>
                                                </View> : <></>
                                            }
                                        </View>

                                    </View>
                                    <View style={[cmstyle.flex_row, cmstyle.flex_wrap]}>
                                        <TouchableOpacity style={[styles.ongoingbtn, { alignItems: 'center', justifyContent: 'center' }]} onPress={() => props.btn(index._id, index.sName)} activeOpacity={0.7}>
                                            <Text style={[styles.fontSize_20, styles.fontMedium, { textAlign: 'left', color: '#FFFFFF' }]}>CONTINUE TO SITE</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            )
                        })
                    }
                    <View style={{ padding: 40 }}>

                    </View>
                </ScrollView>
            );
        } else if (props.OnGoingSupervisior) {

            return (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        !props.ongoing || !props.ongoing.length ? <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                            <Text style={{ fontSize: 30 }}>No Sites Found</Text>
                        </View> : props.ongoing.map((index, i) => {
                            return (
                                <View>
                                    <View style={[cmstyle.flex_row, cmstyle.flex_wrap, { marginTop: 10 }]}>
                                        <View style={[styles.nextvisitbox]}>
                                            <Text style={[styles.fontSize_20, styles.fontbold, { textAlign: 'left', color: '#FA9A5B' }]}>{index.sName}</Text>
                                            <View style={{ borderWidth: 1, borderColor: '#C3C3C362' }}></View>
                                            <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Enginner Name : </Text>
                                                <Text style={[styles.fontbold, { color: '#FA9A5B', fontSize: 12, }]}>{index.sUsername}</Text>
                                            </View>
                                            <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Date of Created : </Text>
                                                <Text style={[styles.fontbold, { color: '#FA9A5B', fontSize: 12, }]}>{index.dCreatedAt.split('T').[0]}</Text>
                                            </View>
                                            <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Length : </Text>
                                                <Text style={[styles.fontbold, { color: '#FA9A5B', fontSize: 12, }]}>{index.nMinLength}-{index.nMaxLength} Meters </Text>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12, marginLeft: 50 }]}>Dept. :  </Text>
                                                <Text style={[styles.fontbold, { color: '#FA9A5B', fontSize: 12, }]}>{index.sDepartment}</Text>
                                            </View>
                                            <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Type of Work : </Text>
                                                <Text style={[styles.fontbold, { color: '#FA9A5B', fontSize: 12, }]}>{index.sWorktype}</Text>

                                            </View>
                                            <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Address : </Text>
                                                <Text style={[styles.fontbold, { color: '#FA9A5B', fontSize: 12, }]}> {index.sAddress} </Text>
                                            </View>
                                            <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Zone : </Text>
                                                <Text style={[styles.fontbold, { color: '#FA9A5B', fontSize: 12, }]}>{index.sZone}</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={[cmstyle.flex_row, cmstyle.flex_wrap]}>
                                        <TouchableOpacity style={[styles.ongoingbtn, { alignItems: 'center', justifyContent: 'center' }]} onPress={() => {
                                            navigation.navigate('Remark', {
                                                id: index._id,
                                                name: index.sName
                                            })
                                        }} activeOpacity={0.7}>
                                            <Text style={[styles.fontSize_20, styles.fontMedium, { textAlign: 'left', color: '#FFFFFF' }]}>Remark</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            )
                        })
                    }
                    <View style={{ padding: 40 }}>

                    </View>
                </ScrollView>
            );
        } else if (props.visitname) {
            console.log("notvvvv", props)
            return (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        !props.notvisitlist.notvisitedlist || !props.notvisitlist.notvisitedlist.length ? <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                            <Text style={{ fontSize: 30 }}>No Sites Found</Text>
                        </View> : props.notvisitlist.notvisitedlist.map((index, i) => {
                            return (
                                <View style={{ flex: 1 }}>
                                    <View style={[cmstyle.flex_row, styles.sado, { marginTop: 10 }]} key={index._id}>
                                        <View style={[styles.nextvisitbox]}>
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
                                                <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.nMinLength}-{index.nMaxLength} Meters </Text>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12, marginLeft: 50 }]}>Dept. :  </Text>
                                                <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.sDepartment}</Text>
                                            </View>
                                            <View style={[cmstyle.flex_row, { marginTop: 10 }]}>
                                                <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 12 }]}>Type of Work : </Text>
                                                {
                                                    stateauth.userType == 'L' ? <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.sWorktype}</Text> : <TouchableOpacity style={{flexDirection:'row'}}onPress={() => bottomopen(index._id)}>
                                                        <Text style={[styles.fontbold, { color: '#333F54', fontSize: 12 }]}>{index.sWorktype}</Text>
                                                        <Feather
                                                            name="arrow-down"
                                                            size={12}
                                                            color="#000000"
                                                            style={{borderWidth:1,marginLeft:5}}
                                                        />
                                                    </TouchableOpacity>
                                                }

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
                                    <View style={[cmstyle.flex_row, cmstyle.flex_wrap]}>
                                        <TouchableOpacity style={[styles.pendingbtn, { alignItems: 'center', justifyContent: 'center' }]} onPress={() => {
                                            navigation.navigate('SiteLocation', {
                                                id: index._id,
                                                name: index.sName
                                            })
                                        }} activeOpacity={0.7} >
                                            <Text style={[styles.btntext, styles.fontMedium]}>VISIT SITE</Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>
                            )
                        })
                    }


                </ScrollView>
            );
        }
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={cmstyle.items_center, cmstyle.justify_center, { flex: 1 }}>
                {emplogo()}
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    height={400}
                    closeOnPressMask={true}


                >

                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={[styles.nextvisitbox22]}>
                                <View style={{ flex: 1 }}>
                                    <DropDownPicker
                                        open={open}
                                        max={10}
                                        defaultIndex={1}
                                        value={value}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        setItems={setItems}
                                        onChangeItem={item => setValue(item.value)}
                                        itemStyle={{
                                            justifyContent: 'flex-start'
                                        }}



                                    />
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity style={{ width: '90%', height: 40, backgroundColor: 'orange', marginTop: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => updateworktype()}>
                                        <Text>Update Work Type</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>







                            {/* </View> */}
                        </ScrollView>

                    </View>
                </RBSheet>
            </View>

        </SafeAreaView>

    )
}
export default Listbox;


