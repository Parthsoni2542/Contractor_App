import React, { useState, useRef, useEffect } from 'react'
import { View, SafeAreaView, Text, StyleSheet, StatusBar, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
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
import { s3Upload } from '../api/api';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import { AddMesurmentbook, clearmesurmentmsg } from '../Redux/Actions/checklist';
import { useSelector, useDispatch } from 'react-redux';
import { getComplitedsite, getOngoig } from '../Redux/Actions/SiteListing';
import Toast from 'react-native-toast-message';

// const arr = []
const UploadMeasurement = (props) => {
    const refRBSheet = useRef();
    const [image, setimg] = useState([])
    const [arr, setarr] = useState([])
    const [imagecamera, SetImages] = useState([])
    const [istepid, setiistepid] = useState(props.route.params.id)
    const [sitenames, setsitenames] = useState(props.route.params.name)
    const state = useSelector(state => state.checklist)
    const dispatch = useDispatch();
    let ldngbtn = null;
    const navigation = useNavigation();
    useEffect(() => {
        console.log(state.message)
        if (state.message == "Measurement Book Media added successfully.") {
            //     // Seteror("uploaded Success")
            Toast.show({
                type: 'success',
                text1: state.message,
                topOffset: 30,
                // autoHide: true,
            });
            ldngbtn.showLoading(false);
            dispatch(getOngoig("ON"))
            dispatch(clearmesurmentmsg())
            setTimeout(function () { navigation.navigate('Thanks'); }, 3000);

        }


    }, [state])


    const cleanupSingleImage = (i) => {
        SetImages(prev => prev.filter(elem => elem !== prev[i]))

    }
    const renderdata = () => {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                {renderSection()}
            </View>
        )
    }

    const renderSection = () => {

        if (imagecamera && imagecamera.length == 0) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#FA9A5B', marginLeft: 50 }}>No Photos </Text>
                    </View>

                </View>

            )
        } else {
            return imagecamera.map((img, i) => {
                // console.log("imgimgimgimg",img)
                return (
                    <View style={{width:'50%'}}>
                        <View style={[cmstyle.flex_row, cmstyle.flex_wrap, styles.manuboxcontainer, cmstyle.items_center, cmstyle.justify_center]}>
                            <View style={[styles.imgview, styles.tbColor, cmstyle.items_center, cmstyle.justify_center]}>
                                <Image source={{
                                    uri: img.uri
                                }} style={{ width: 150, height: 150, borderRadius: 10 }} />
                                <View style={{ position: 'absolute', top: 60 }}>
                                    <TouchableOpacity onPress={() => cleanupSingleImage(i)}

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
                    </View>


                )
            })
        }
    }


    const Handleimage = (img) => {
        return {
            uri: img.path,
            width: img.width,
            height: img.height,
            type: img.mime,
            name: `UploadMeasurment${imagecamera.length + 1}_${Date.now()}`
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

    const submitbtn = () => {


        if (imagecamera.length == 0) {
            Toast.show({
                type: 'error',
                text1: 'Please Upload Photos',
                topOffset: 30,
                autoHide: true,
            });

        } else {
            ldngbtn.showLoading(true);
            s3Upload({ files: imagecamera, site: { id: istepid, name: sitenames, folderName: 'UploadMeasurment' } }, (urlsArray) => {
                console.log("urlsArray", urlsArray)
                console.log("getsitedetail", istepid)
                console.log("sitenames", sitenames)
                dispatch(AddMesurmentbook(istepid, urlsArray))
                dispatch(getComplitedsite("CMP"))
                dispatch(getOngoig("ON"))
                // navigation.navigate('Thanks');



            })

        }

        // console.log(imagecamera)


    }


    return (
        <SafeAreaView style={[cmstyle.flex_1]}>
            <StatusBar backgroundColor="#FA9A5B" barStyle="dark-content" />
            <Header outgoinglist name="CheckOut" />

            <View style={{ height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.fontRegular, { fontSize: 22 }]}>Upload Measurement
                    {"\n"}Book</Text>
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
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {
                        renderdata()

                    }

                    <View style={{ padding: 50 }}>

                    </View>
                </ScrollView>





            </View>


            <View
                style={{
                    position: 'absolute',//use absolute position to show button on top of the map
                    top: '80%', //for center align
                    alignSelf: 'center' //for align to right
                }}
            >
                <View style={[styles.loginbtn,]}>
                    <AnimateLoadingButton
                        ref={c => (ldngbtn = (c))}
                        width={300}
                        height={20}
                        title="SUBMIT"
                        titleFontSize={16}
                        titleColor="rgb(255,255,255)"
                        backgroundColor="#FA9A5B"
                        borderRadius={30}
                        onPress={() => submitbtn()}


                    />

                </View>


            </View>


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


export default UploadMeasurement;