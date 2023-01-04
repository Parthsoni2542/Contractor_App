import React, { useState, useRef, useEffect } from 'react'
import { View, SafeAreaView, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import cmstyle from '../Styles/commanstyle';
import styles from '../Styles/styles';
import Header from '../components/Header';
import RBSheet from "react-native-raw-bottom-sheet";
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Checklist, ChecklistStore, Checkoutbtn } from '../Redux/Actions/checklist';
import { s3Upload } from '../api/api';
import Toast from 'react-native-toast-message';
import Loader from '../components/Loader';
import { getList } from '../Redux/Actions/SiteListing';
const windowWidth = Dimensions.get('window').width;



const CheckList = () => { 
    const navigation = useNavigation();
    const refRBSheet = useRef();
    const dispatch = useDispatch();

    const state = useSelector(state => state.checklist)


    const getsitedetail = useSelector(state => state.Sitelist)
    const [image, setimg] = useState([])
    const [imagecamera, SetImages] = useState([])
    const [loader, Setloader] = useState(false)
    const [CurSI, setCurSI] = useState(null)
    const id = "61b4575f3d8b1edd3a281322"

    useEffect(() => {
        dispatch(Checklist(getsitedetail.currentsiteid))
    }, [])

const Handleimage = (img) =>{
    return {
        uri :img.path,
        width:img.width,
        height:img.height,
        type:img.mime,
        name:`${state.checklistdata[CurSI].sTitle}__${Date.now()}`,
    }
}

useEffect(() => {
    // console.log("msg",state.message)



}, [state])

    const imagepick = (CurSI) => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            // cropping: true
        }).then(images => {

            SetImages((ar) => {
                ar.push(Handleimage(images))
                return [...ar]
            })
          
            refRBSheet.current.close()
            

        });
    }
    console.log("getsitedetail",imagecamera)

    const pickMultiple = (CurSI) => {
        ImagePicker.openPicker({
            // multiple: true,
            waitAnimationEnd: false,
            sortOrder: 'desc',
            includeExif: true,
            forceJpg: true,
        })
            .then((images) => {
            
            SetImages((ar) => {
                ar[CurSI] = Handleimage(images)
                return [...ar]
            })
            refRBSheet.current.close()
            })
           
            .catch((e) => alert(e));
    }


 
    const startbtn = () => {
       
        console.log("currentsiteid",getsitedetail.currentsiteid)
        console.log("currentsiteid1",getsitedetail.currensitename)
        Setloader(true)
        // const filtred = imagecamera.filter((i) => i.uri)

        var filtered = imagecamera.filter(function(x) {
            return x !== undefined;
       });
       
      
        s3Upload({files:filtered,site:{id:getsitedetail.currentsiteid,name:getsitedetail.currensitename,folderName:'Checklist'}},(urlsArray)=>{
           
            setTimeout(function(){ navigation.navigate('OngoingList'); }, 3000);
            
    
            urlsArray.map((url,i)=>{
                dispatch(ChecklistStore(getsitedetail.currentsiteid,urlsArray))
                Setloader(false)
                 navigation.navigate('OngoingList');
            })
           
           
            
        })

       
    }

const openRbSit =(i) =>{
    console.log(i)
    setCurSI(i)
    refRBSheet.current.open()
}

const cleardata =()=>{
    dispatch(Checkoutbtn(getsitedetail.currentsiteid))
    // dispatch(getList("ON"))
    dispatch(getList("P"))
    navigation.navigate('Home')
}






const renderColorss = currenTab => (currenTab === imagecamera ? 'red' : 'red');

    return (
        <SafeAreaView style={[cmstyle.flex_1]}>
            <StatusBar backgroundColor="#FA9A5B" barStyle="dark-content" />
           
            <Header CheckList name="Check List" btna={startbtn} btnname="START" color={renderColorss} img={imagecamera} clear={cleardata} />
            {loader==true ?<View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}><Loader/></View>:<View></View>}
            <View style={[cmstyle.items_center, cmstyle.justify_center]}>
          
                <ScrollView showsVerticalScrollIndicator={false}>
               
                    {
                        state.checklistdata == '' ? null : state.checklistdata.map((index, i) => {
                           
                            const sousourcerce = imagecamera[i] && imagecamera[i].uri ? { uri: imagecamera[i].uri } : require('../Images/checkList.png')

                            return (
                                <View style={[{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }]}>
                                    <TouchableOpacity style={[styles.nextvisitbox1]} onPress={() => openRbSit(i)} activeOpacity={0.9}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Image source={sousourcerce}
                                                height={26} style={{
                                                    width: windowWidth - 52,
                                                    height: 152,
                                                    borderRadius: 10,
                                                    backgroundColor: '#fbf4e6',
                                                }} resizeMode="cover" />

                                        </View>
                                    </TouchableOpacity>
                                    <Text style={[styles.fontMedium, { fontSize: 20, color: '#333F54' }]}>{index.sTitle}</Text>
                                </View>
                            )

                        })
                    }



                    <View style={{ padding: 30 }}></View>
                </ScrollView>
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
                            onPress={ () => imagepick(CurSI)}   >
                            <Text style={{ color: '#fff', fontSize: 20 }}>Take Picture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#FA9A5B', margin: 10, padding: 10, borderRadius: 10, width: '80%', alignItems: 'center' }}
                            onPress={() => pickMultiple(CurSI)}
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


export default CheckList;