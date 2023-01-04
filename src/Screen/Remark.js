import React, { useState, useRef, useEffect } from 'react'
import { View, SafeAreaView, Text, StyleSheet, StatusBar, TouchableOpacity, Dimensions, Image, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import cmstyle from '../Styles/commanstyle';
import styles from '../Styles/styles'
import Header from '../components/Header';
import Entypo from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AnimateLoadingButton from 'react-native-animate-loading-button';
import { s3Upload } from '../api/api';
import { AddRemark, clearRemark } from '../Redux/Actions/checklist';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { getComplitedsite } from '../Redux/Actions/SiteListing';
const Remark = (props) => {
    const refRBSheet = useRef();
    const [image, setimg] = useState([])
    const [imagecamera, SetImages] = useState([])
    const [desc, setdesc] = useState("")
    const [istepid, setiistepid] = useState(props.route.params.id)
    const [sitenames, setsitename] = useState(props.route.params.name)
    const [imagesArr, setImagesArr] = useState([])
    const navigation = useNavigation();
    const state = useSelector(state => state.checklist)

    console.log("Remark", state)
    let ldngbtn = null;
    const dispatch = useDispatch();


    useEffect(() => {
        if (state.message == "Remark added successfully.") {
            Toast.show({
                type: 'success',
                text1: state.message,
                topOffset: 30,
                // autoHide: true,
            });
            ldngbtn.showLoading(false);
            dispatch(getComplitedsite("CMP"))
            dispatch(clearRemark())
            setTimeout(function () { navigation.navigate('Supervisor'); }, 3000);

        }
    }, [state.message])



    const renderSection = () => {

        if (imagecamera == "" && imagecamera == "") {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#FA9A5B', marginLeft: 50 }}>No Photos </Text>
                    </View>

                </View>

            )
        } else {
            return imagecamera.map((img, i) => {

                return (

                    <View style={[cmstyle.flex_row, cmstyle.flex_wrap, styles.manuboxcontainer, cmstyle.items_center, cmstyle.justify_center]}>
                        <View style={[styles.imgview, styles.tbColor, cmstyle.items_center, cmstyle.justify_center]}>

                            <Image source={{
                                uri: img.uri
                            }} style={{ width: 150, height: 150, borderRadius: 10 }} />

                            <View style={{ position: 'absolute', top: 60 }}>
                                <TouchableOpacity
                                    onPress={() => cleanupSingleImage(i)}

                                >
                                    <Ionicons
                                        name="close-circle-outline"
                                        size={47}
                                        color="#fff"

                                    />

                                </TouchableOpacity>

                            </View>

                        </View>

                    </View>



                )
            })
        }
    }

    const cleanupSingleImage = (i) => {
        SetImages(prev => prev.filter(elem => elem !== prev[i]))
        console.log('will cleanup image', imagesArr);
    }
    const submitbtn = () => {

        if (imagecamera.length == 0 && desc == '') {
            Toast.show({
                type: 'error',
                text1: 'Please Add Remark',
                topOffset: 30,
                autoHide: true,
            });

        } else {
            ldngbtn.showLoading(true);
            s3Upload({ files: imagecamera, site: { id: istepid, name: sitenames, folderName: 'Remark' } }, (urlsArray) => {
                console.log("urlsArray", urlsArray)
                console.log("istepid", istepid)
                console.log("sitenames", sitenames)
                // console.log("getsitedetail", getsitedetail.currentsiteid)
                dispatch(AddRemark(istepid, desc, urlsArray))


                // navigation.navigate('Supervisor');
                // ldngbtn.showLoading(true);


            })
        }


    }

    const renderdata = () => {
        return (

            <View style={{ flexDirection: 'row', lexWrap: 'wrap', }}>
                <ScrollView horizontal={true} >
                    {renderSection()}
                </ScrollView>

            </View>

        )
    }

    const Handleimage = (img) => {
        return {
            uri: img.path,
            width: img.width,
            height: img.height,
            type: img.mime,
            name: `Remarks${imagecamera.length + 1}_${Date.now()}`
        }
    }


    const imagepick = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            multiple: true,
            // cropping: true
        }).then(images => {
            console.log("take picture", images)
            SetImages((ar) => {
                ar.push(Handleimage(images))
                return [...ar]
            })
            refRBSheet.current.close()
        });
    }


    const pickMultiple = () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            sortOrder: 'desc',
            includeExif: true,
            forceJpg: true,
        }).then((images) => {
            console.log(images)
            images.map((img, i) => {
                SetImages((ar) => {
                    ar.push(Handleimage(img))
                    return [...ar]
                })
            })
            refRBSheet.current.close()
        })
            .catch((e) => alert(e));
    }


    return (
        <SafeAreaView style={[cmstyle.flex_1]}>
            <StatusBar backgroundColor="#E2BC64" barStyle="dark-content" />
            <KeyboardAvoidingView style={[cmstyle.flex_1,]}>
                <ScrollView style={{ flexGrow: 1 }}>
                    <View style={{ flex: 1 }}>

                        <Header Icon />
                        <Toast ref={(ref) => Toast.setRef(ref)} />
                        <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 25 }}>Remarks</Text>

                            <View style={{ marginLeft: 20, width: 60, height: 60, backgroundColor: "#FA9A5B", borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                                    <Entypo
                                        name="camera"
                                        size={32}
                                        color="#fff"
                                        style={styles.menuIcon}
                                    />
                                </TouchableOpacity>

                            </View>

                        </View>

                        <View style={{ width: "100%" }}>

                            {
                                renderdata()

                            }


                            <View style={{ padding: 20 }}>

                            </View>



                            <View style={{ width: "90%", marginLeft: 20 }}>

                                <View style={[cmstyle.items_center, cmstyle.justify_center]}>

                                    <View style={[styles.iconPlacbox, styles.tbColor, cmstyle.items_center, cmstyle.justify_center, { backgroundColor: '#0000000D', marginTop: 10, padding: 10, height: 100 }]}>

                                        <View style={{ width: "90%" }}>

                                            <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 20 }]}>Description</Text>
                                            <TextInput style={[style.fontRegular,{color:'black'}]}
                                                onChangeText={text => setdesc(text)}
                                                maxLength={200}
                                            />
                                        </View>
                                    </View>

                                </View>

                            </View>


                        </View>



                        <View
                            style={{
                                // position: 'relative',//use absolute position to show button on top of the map
                                // top: '80%', //for center align
                                alignSelf: 'center' //for align to right
                            }}
                        >
                            <View style={[styles.loginbtn,]}>
                                <AnimateLoadingButton

                                    style={[styles.loginbtn,]}
                                    ref={c => (ldngbtn = (c))}
                                    width={300}
                                    height={50}
                                    title="Submit"
                                    titleFontSize={16}
                                    titleColor="rgb(255,255,255)"
                                    backgroundColor="#FA9A5B"
                                    borderRadius={30}
                                    onPress={() => submitbtn()}


                                />

                            </View>


                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={180}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {

                        backgroundColor: "transparent",
                    },
                    draggableIcon: {
                        backgroundColor: "#FA9A5B",

                    }
                }}
            >
                <View style={styles.container}>
                    <View style={{ alignItems: 'center' }}>

                        <TouchableOpacity style={{ backgroundColor: '#FA9A5B', margin: 10, padding: 10, borderRadius: 10, width: '80%', alignItems: 'center' }}
                            onPress={() => imagepick()} activeOpacity={0.9}  >
                            <Text style={{ color: '#fff', fontSize: 20 }}>Take Picture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#FA9A5B', margin: 10, padding: 10, borderRadius: 10, width: '80%', alignItems: 'center' }}
                            onPress={() => pickMultiple()} activeOpacity={0.9}
                        >
                            <Text style={{ color: '#fff', fontSize: 20 }}>Choice Here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </RBSheet>


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


export default Remark;