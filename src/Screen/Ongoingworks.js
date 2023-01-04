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
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import { aws, s3Upload } from '../api/api';
import { Checklist } from '../Redux/Actions/checklist';
import { useDispatch, useSelector } from 'react-redux';
import { cleanmsgsiteclean, Ongoing, SitestepStore } from '../Redux/Actions/ongoing';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AnimateLoadingButton from 'react-native-animate-loading-button';
import Toast from 'react-native-toast-message';
const Ongoingworks = (props) => {
    console.log("propsprops", props)
    const refRBSheet = useRef();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const state = useSelector(state => state.ongoinglist)
    const [istepid, setiistepid] = useState(props.route.params.id)
    const [currentsiteid, setcurrentsiteid] = useState(props.route.params.currentsite)
    const [imagecamera, SetImages] = useState([])
    const [imgeurl, Setimgeurl] = useState(props.route.params.url)
    const [CurSI, setCurSI] = useState(null)
    let ldngbtn = null;
    console.log("statedddddssss,", props.route.params.id)
    console.log(imgeurl)
    useEffect(() => {
        // dispatch(Checklist(getsitedetail.currentsiteid))
        if (imgeurl && imgeurl.length) {
            SetImages([...imagecamera, ...imgeurl])
        }



    }, [imgeurl && imgeurl.length])




    useEffect(() => {

        if (state.msg == "Site Steps Media added successfully.") {
            // Seteror("uploaded Success")
            Toast.show({
                type: 'success',
                text1: state.msg,
                topOffset: 30,
                // autoHide: true,
            });
            ldngbtn.showLoading(false);
            dispatch(cleanmsgsiteclean())
            setTimeout(function () { navigation.navigate('OngoingList'); }, 3000);
            // navigation.navigate('CheckList');
        }


    }, [state])

    const cleanupSingleImage = (i) => {
        SetImages(prev => prev.filter(elem => elem !== prev[i]))
        console.log('will cleanup image', imagecamera);
    }
    const submittn = () => {


        if (imagecamera.length == 0) {
            Toast.show({
                type: 'error',
                text1: 'Please Upload Photos',
                topOffset: 30,
                autoHide: true,
            });

        } else {
            console.log("imagecamera", imagecamera)
            const filtred = imagecamera.filter((i) => !i._id)
            console.log("imhf", filtred)

            ldngbtn.showLoading(true);
            s3Upload({ files: filtred, site: { id: currentsiteid, name: props.route.params.name, folderName: 'SiteSteps' } }, (urlsArray) => {
                console.log("urlsArray", urlsArray)
                console.log("currentsiteid", currentsiteid)
                console.log("istepid", istepid)
                dispatch(SitestepStore(currentsiteid, istepid, urlsArray))
                setTimeout(function () { dispatch(Ongoing(currentsiteid)) }, 2000);
                // navigation.navigate('OngoingList');


            })
        }


    }
    const Handleimage = (img) => {
        return {
            uri: img.path,
            width: img.width,
            height: img.height,
            type: img.mime,
            name: `SiteSteps${imagecamera.length + 1}_${Date.now()}`
        }
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
                    <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#FA9A5B', marginLeft: 50 }}>No Photos </Text>
                </View>


            )
        } else {

            return imagecamera.map((img, i) => {
                return (
                    <View style={{ width: '50%' }}>
                        <View style={[cmstyle.flex_row, styles.manuboxcontainer, cmstyle.items_center, cmstyle.justify_center]}>
                            <View style={[styles.imgview, styles.tbColor, cmstyle.items_center, cmstyle.justify_center,]}>
                                <Image source={{
                                    uri: img.sUrl ? (aws + img.sUrl) : img.uri
                                }} style={{ width: 150, height: 150, borderRadius: 10 }} />
                                <View style={{ position: 'absolute', top: 60 }}>
                                    {
                                        img._id ? null : <TouchableOpacity
                                            onPress={() => cleanupSingleImage(i)}

                                        >
                                            <Ionicons
                                                name="close-circle-outline"
                                                size={47}
                                                color="black"

                                            />

                                        </TouchableOpacity>
                                    }


                                </View>
                            </View>

                        </View>
                    </View>



                )
            })
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

    }

    return (
        <SafeAreaView style={[cmstyle.flex_1]}>
            <StatusBar backgroundColor="#E2BC64" barStyle="dark-content" />
            <Header Icon />

            <View style={{ height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', borderWidth: 1, borderColor: '#f2f2f2' }}>
                <Text style={{ fontSize: 20, }}>{props.route.params.name}</Text>
                <View style={{ width: 60, height: 60, backgroundColor: "#FA9A5B", borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
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
                        onPress={() => submittn()}


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
                            onPress={() => imagepick()}   >
                            <Text style={{ color: '#fff', fontSize: 20 }}>Take Picture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#FA9A5B', margin: 10, padding: 10, borderRadius: 10, width: '80%', alignItems: 'center' }}
                            onPress={() => pickMultiple()}
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


export default Ongoingworks;