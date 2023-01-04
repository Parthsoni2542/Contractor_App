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
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from 'react-native-paper';
import { s3Upload } from '../api/api';
import { BeforeSiteStore, clearmsg, Sitephotoss } from '../Redux/Actions/checklist';
import Toast from 'react-native-toast-message';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AnimateLoadingButton from 'react-native-animate-loading-button';
import { getNotvisited } from '../Redux/Actions/SiteListing';
const Sitephotos = (props) => {
    const [checked, setChecked] = React.useState(false);
    const refRBSheet = useRef();
    const [image, setimg] = useState([])
    const [imagesArr, setImagesArr] = useState([])
    const [imagecamera, SetImages] = useState([])
    const [error, Seteror] = useState('')
    const getsitedetail = useSelector(state => state.Sitelist)
    const [CurSI, setCurSI] = useState(0)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const state = useSelector(state => state.checklist)
    console.log("state", state)
    let ldngbtn = null;

    useEffect(() => {

        if (state.message == "Site Photos added successfully.") {
            Toast.show({
                type: 'success',
                text1: state.message,
                topOffset: 30,
                // autoHide: true,
            });
            dispatch(clearmsg())
            ldngbtn.showLoading(false);
            navigation.navigate('Supervisor');
        }


    }, [state])

    const Handleimage = (img) => {
        return {
            uri: img.path,
            width: img.width,
            height: img.height,
            type: img.mime,
            name: `Sitephotos${imagecamera.length + 1}_${Date.now()}`
        }
    }
    const cleanupSingleImage = (i) => {
        SetImages(prev => prev.filter(elem => elem !== prev[i]))
        // setimg(prev=>prev.filter(elem => elem !== prev[i]))
        console.log('will cleanup image', imagesArr);
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
                    <View style={{alignItems:'center',justifyContent:'center'}}>
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
                    </View>



                )
            })
        }
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
            console.log(imagecamera)
            console.log(props.route.params.name)
            console.log(props.route.params.id)
            ldngbtn.showLoading(true);
            s3Upload({ files: imagecamera, site: { id: props.route.params.id, name: props.route.params.name, folderName: 'Sitephotos' } }, (urlsArray) => {
                console.log("urlsArray", urlsArray)
                console.log("getsitedetail", getsitedetail.currentsiteid)
                dispatch(Sitephotoss(props.route.params.id, checked, urlsArray))
                dispatch(getNotvisited("NV"))


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
            .catch((e) => alert(e));
    }

    return (
        <SafeAreaView style={[cmstyle.flex_1]}>
            <StatusBar backgroundColor="#E2BC64" barStyle="dark-content" />
            <Header Icon />
            <Text>{error}</Text>
            <View style={{ width: '80%', height: 50, marginLeft: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 15,fontWeight:'bold' }}>Site Already Completed?</Text>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                    </View>
            <View style={{ height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 25 }}>Site Photos</Text>
                
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

                        style={[styles.loginbtn,]}
                        ref={c => (ldngbtn = (c))}
                        width={300}
                        height={30}
                        title="Submit"
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



export default Sitephotos;