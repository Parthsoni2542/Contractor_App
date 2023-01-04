import React, { useState, useRef, useEffect } from 'react'
import { View, SafeAreaView, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native';
import cmstyle from '../Styles/commanstyle';
import styles from '../Styles/styles'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import loginApi from '../api/api'
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
import { loginmsgclear, loginUser } from '../Redux/Actions/auth'
import Toast from 'react-native-toast-message';

import AnimateLoadingButton from 'react-native-animate-loading-button';
const Login = () => {

    // const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    let ldngbtn = null;
    //const userData = useSelector(state=>state.userAuth)

    const state = useSelector(state => state.auth)
    console.log("login", state.resMessage)
    const [form, setForm] = useState({});
    const navigation = useNavigation();
    const [gotError, setimg] = useState('')
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [cont, setCont] = useState('')
    const [show, setShow] = useState(false)


    useEffect(() => {
        console.log(state.msg)
        if (state.msg == 'Invalid UserName and Password') {
            // console.log("called")
            dispatch(loginmsgclear())
            ldngbtn.showLoading(false);
            Toast.show({
                type:  'error',
                text1: state.msg,
              });
              dispatch(loginmsgclear())
            // setimg("Invalid username and Password")
        }else{
            ldngbtn.showLoading(false);

        }


    }, [state.msg]);


    const login = () => {

        console.log("called", gotError)
        if (form.sLogin == undefined && form.sPassword == undefined) {
            console.log("called111")
            setimg("Please Enter Username and Password")
        } else if (form.sLogin && form.sPassword) {
            if (ldngbtn) {
                ldngbtn.showLoading(true);
            }
            ldngbtn.showLoading(false);
          
            dispatch(loginUser(form.sLogin, form.sPassword))

        } else {

            Toast.show({
                type:  'error',
                text1: 'Invalid username and Password',
              });
            setimg("Invalid username and Password")
        }

    }

    // const login = () => {
    //     if(ldngbtn){
    //         ldngbtn.showLoading(true);
    //     }
    //     if (form.sLogin && form.sPassword) {
    //       
    //     }else



const msg = ()=>{
    Toast.show({
        type:  'success',
        text1: 'Login Sucees',
      });
}
    
    
    

    const onChange = ({ name, value }) => {
        setForm({ ...form, [name]: value });
    };



    const validationError = () => {
        if (gotError == '') {
            return <View></View>
        } else {
            {/*this.removeError()*/ }
            if (gotError == 'Logged in successfully') {
                var bgColor = "#3c3"
            } else {
                var bgColor = "#f33"
                setTimeout(() => {
                    // console.log("sdf")
                    setimg('')
                    // this.setState({ gotError: '' })
                    validationError();
                }, 4000)
            }
            return (
                <View style={{ backgroundColor: bgColor, paddingHorizontal: 25, paddingVertical: 10, borderRadius: 4, position: 'absolute', top: 40 }}>
                    <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', marginBottom: -4 }}>{gotError}..!!</Text>
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={[cmstyle.flex_1]}>
            <StatusBar backgroundColor="#E2BC64" barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView style={[cmstyle.flex_1,]}>
                    <View style={[cmstyle.items_center, cmstyle.justify_center]}>
                        {validationError()}
                        <Toast ref={(ref) => Toast.setRef(ref)} />
                    </View>
                    <View style={[styles.footerContainer, cmstyle.items_center, cmstyle.flex_1]}>
                        <View style={[styles.checkinCont]}>
                            <Text style={[styles.fontbold, { fontSize: 30, color: '#333F54', }]} >Log In </Text>
                        </View>
                        <View style={[cmstyle.items_center]}>
                            <View style={[styles.iconPlacbox, styles.tbColor, cmstyle.items_center, cmstyle.justify_center, { backgroundColor: '#0000000D', marginTop: 10, }]}>
                                <View style={{ width: windowWidth - 60 }}>

                                    <TextInput
                                        style={[style.fontRegular, { fontSize: 18 }]}
                                        label="Phone or Email"
                                        onChangeText={(value) => {
                                            onChange({ name: 'sLogin', value });
                                        }}

                                        
                                        value={form.sLogin || null}
                                        selectionColor={"#FA9A5B"}
                                        underlineColor={"#0000000D"}
                                        underlineColorAndroid="transparent"
                                        theme={{ colors: { primary: '#FA9A5B' } }}

                                    />
                                    {/* <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 20 }]}>User ID</Text>
                                    <TextInput style={[style.fontRegular]}
                                        onChangeText={text => setUsername(text)}
                                        maxLength={25}
                                        value={username} /> */}
                                </View>
                            </View>
                            <View style={[styles.iconPlacbox, styles.tbColor, cmstyle.items_center, cmstyle.justify_center, { backgroundColor: '#0000000D', marginTop: 10, }]}>
                                <View style={{ width: windowWidth - 60 }}>

                                    <TextInput
                                        style={[style.fontRegular, { fontSize: 18 }]}
                                        label="Password"

                                        onChangeText={(value) => {
                                            onChange({ name: 'sPassword', value });
                                        }}
                                        // onChangeText={text => setPassword(text)}
                                        
                                        value={form.sPassword || null}
                                        secureTextEntry={true}
                                        underlineColor={"#0000000D"}
                                        theme={{ colors: { primary: '#FA9A5B' } }}

                                    />
                                    {/* <Text style={[styles.fontRegular, { color: '#9FA2AA', fontSize: 20, }]}>Password</Text>
                                    <TextInput secureTextEntry={true}
                                        onChangeText={text => setPassword(text)}
                                        maxLength={25}
                                        value={password} /> */}
                                </View>
                            </View>

                        </View>


                        <View style={cmstyle.items_center}>
                            <View style={[styles.loginbtn,]}>
                                <AnimateLoadingButton
                                    useNativeDriver={true}
                                    style={[styles.loginbtn,]}
                                    ref={c => (ldngbtn = (c))}
                                    width={300}
                                    height={50}
                                    title="LOG IN"
                                    titleFontSize={16}
                                    titleColor="rgb(255,255,255)"
                                    backgroundColor="#FA9A5B"
                                    borderRadius={30}
                                    onPress={() => login()}


                                />

                            </View>


                        </View>

                        {/* <View style={{ padding: 10,width:"90%" }}>
                            <FloatingLabelInput
                                label={'User Id'}
                               style={{backgroundColor:'red'}}
                                value={cont}
                                onChangeText={(value) => setCont(value)}
                              
                            />
                        </View> */}
                    </View>


                </KeyboardAvoidingView>
            </ScrollView>
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


export default Login;