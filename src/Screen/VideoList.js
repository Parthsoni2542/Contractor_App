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
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import { cleanmsgsiteclean, Ongoing, SitestepStore } from '../Redux/Actions/ongoing';
import { aws, s3Upload } from '../api/api';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useSelector, useDispatch } from 'react-redux';
import { getOngoig } from '../Redux/Actions/SiteListing';
import Toast from 'react-native-toast-message';
import AnimateLoadingButton from 'react-native-animate-loading-button';
const VideoList = (props) => {
    const refRBSheet = useRef();
    const [image, setimg] = useState([])
    const [arr, setarray] = useState([])
    const [imagecamera, SetImages] = useState([])
    const [pause, setpause] = useState(false);
    const [currentindex, setcurrentindex] = useState();
    const navigation = useNavigation();
    const [istepid, setiistepid] = useState(props.route.params.id)
    const [imgeurl, Setimgeurl] = useState(props.route.params.url)
    const state = useSelector(state => state.ongoinglist)
    const [currentsiteid, setcurrentsiteid] = useState(props.route.params.currentsite)
    const dispatch = useDispatch();
    let ldngbtn = null;



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
                type:  'success',
                text1: state.msg,
                topOffset: 30,
                // autoHide: true,
              });
            ldngbtn.showLoading(false);
            dispatch(Ongoing(currentsiteid))
            dispatch(getOngoig("ON"))
            dispatch(cleanmsgsiteclean())
            setTimeout(function(){ navigation.navigate('OngoingList'); }, 3000);
        
        }


    }, [state])



    const submittn = () => {


        if (imagecamera.length == 0) {
            Toast.show({
                type:'error',
                text1:'Please Upload Videos',
                topOffset: 30,
                autoHide: true,
            });

        } else {
            const filtred = imagecamera.filter((i) => !i._id)
            ldngbtn.showLoading(true);
            s3Upload({ files: filtred, site: { id: currentsiteid, name: props.route.params.name, folderName: 'SiteSteps' } }, (urlsArray) => {
                dispatch(SitestepStore(currentsiteid, istepid, urlsArray))
                dispatch(getOngoig("ON"))
                dispatch(Ongoing(currentsiteid))
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
    const cleanupSingleImage = (i) => {
        SetImages(prev => prev.filter(elem => elem !== prev[i]))
        setarray(prev => prev.filter(elem => elem !== prev[i]))

    }


    const functions = (i) => {
       
        setcurrentindex(i)

        if (pause == false) {
            setpause(true)
        }
        else {
            setpause(false)
        }
    }


    const renderSection = () => {

        if (image == "" && imagecamera == "") {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                    <Text style={{ fontSize: 50, color: '#FA9A5B' }}>No Video </Text>
                </View>

            )
        } else {
            return imagecamera.map((img, i) => {
              
                return (
                    <View style={[cmstyle.flex_wrap, styles.manuboxcontainer, cmstyle.items_center, cmstyle.justify_center]}>
                        <View style={{ height: 180, width: 320, marginTop: 15 }}>
                            <Video
                                source={{ uri: img.sUrl ? (aws + img.sUrl) : img.uri }}
                                style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, borderRadius: 10 }}
                                rate={1}
                                paused={currentindex == i ?pause:true}
                                volume={1}
                                muted={false}
                                resizeMode={'cover'}
                                onError={(e) => console.log(e)}
                                onLoad={(load) => console.log(load)}

                            />
                            {
                                img._id ? null : <TouchableOpacity
                                onPress={() => cleanupSingleImage(i)}

                            >
                                <Ionicons
                                    name="close-circle-outline"
                                    size={47}
                                    color="black"
                                    style={{ textAlign: 'right' }}
                                // style={{marginLeft: 260}}


                                />
                            </TouchableOpacity>
                            }
                           

                            <Icon name={currentindex == i ? pause ? 'play-circle-outline':'pause-circle-outline' :'play-circle-outline'} style={{
                                color: 'black',
                                flex: 1,
                                textAlign: 'center',
                                marginTop:50,
                                fontSize: 80,
                            }} onPress={() => functions(i)} />

                        </View>

                    </View>



                )
            })
        }
    }


    const renderdata = () => {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                {renderSection()}
            </View>
        )
    }


    const imagepick = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            mediaType: "video",
            // cropping: true
        }).then(images => {
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
        })
            .then((images) => {
                setimg(images)

                images.map((img, i) => {
                    SetImages((ar) => {
                        ar.push(Handleimage(img))
                        return [...ar]
                    })
                })

                // console.log("dddddddgggggggd",images)

                refRBSheet.current.close()
            
            })
            .catch((e) => alert(e));
    }

    return (
        <SafeAreaView style={[cmstyle.flex_1]}>
            <StatusBar backgroundColor="#FA9A5B" barStyle="dark-content" />
            <Header Icon />

            <View style={{ height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', }}>
                <Text style={[styles.fontRegular, { fontSize: 25 }]}>WMM</Text>
                <View style={{ marginLeft: 70, width: 60, height: 60, backgroundColor: "#FA9A5B", borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                        <Entypo
                            name="video"
                            size={32}
                            color="#fff"
                            style={styles.menuIcon}
                        />
                    </TouchableOpacity>

                </View>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
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
                            onPress={imagepick} activeOpacity={0.9} >
                            <Text style={{ color: '#fff', fontSize: 20 }}>Take Video</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#FA9A5B', margin: 10, padding: 10, borderRadius: 10, width: '80%', alignItems: 'center' }}
                            onPress={pickMultiple} activeOpacity={0.9}
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


export default VideoList;