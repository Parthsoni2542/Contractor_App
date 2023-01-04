import React,{useEffect,useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView ,DrawerItemList,DrawerItem} from '@react-navigation/drawer';
import { DrawerActions, useNavigation} from '@react-navigation/native';
import { View, StyleSheet, Text, Dimensions,Image,Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../Styles/styles'
import AuthNavigator from '../Navigation/AuthNavigator';
import { useDispatch } from 'react-redux';
import { loginmsgclear, logoutBtn } from '../Redux/Actions/auth';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function Sidebar({...props}){

    const navigation = useNavigation();
    const [name, setname] = useState('')
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutBtn())
        dispatch(loginmsgclear())
    }

    useEffect(() => {
        getUser();
    },[]);

    const getUser = async () => {
        try {
            const uname = await AsyncStorage.getItem('uname');
            setname(uname)
            // console.log(user)
           
        } catch (error) { }
    };


    const createTwoButtonAlert = () =>
    Alert.alert(
      "Logout",
      "Are you sure logout ?",
      [
        {
          text: "NO",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "YES", onPress: () => logout() }
      ]
    );
   
    return(
        <View style={{flex:1}}>
            <View style={style.maincontainer}>

                <View style={style.logo}>
                <Image source={require('../Images/logo.png')} style={{ width: 120, height: 120, borderRadius: 10 }} />
                </View>
                <Text style={[styles.fontbold,{ fontSize: 22, color: '#FFFFFF', marginTop: 5 }]}>{name}</Text>
            </View>
            <View >
                <DrawerContentScrollView {...props} />
                <View style={{ height: windowHeight/2}}>
                <DrawerItemList {...props}/>
                </View>
            </View>
            <View style={{ backgroundColor:'#FA9A5B',height:"40%"}}>

            </View>
            <View
                style={{
                    // backgroundColor:'red',
                    marginTop:20,
                    position: 'absolute',//use absolute position to show button on top of the map
                    top: '80%', //for center align
                    alignSelf: 'center', //for align to right

                }}
            >
                <TouchableOpacity style={[styles.loginbtn1]} onPress={()=>{createTwoButtonAlert()}}>
                    <Text style={[styles.btntext1]}>LOGOUT</Text>
                </TouchableOpacity>


            </View>
           
        </View>
       
    );
 
}
const style = StyleSheet.create({

    maincontainer: {
        // flex: 1,
        height:200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FA9A5B',
    },
    logo: {
        width: 130,
        height: 130,
        borderRadius: 100,
        // borderWidth: 7,
        borderColor: '#FA9A5B',
        backgroundColor: '#eee',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 10
    }
})


export default Sidebar;