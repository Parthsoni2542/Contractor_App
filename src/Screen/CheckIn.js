import React, { useState, useRef, useEffect } from 'react';
import { View, SafeAreaView, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import cmstyle from '../Styles/commanstyle';
import styles from '../Styles/styles'
import Header from '../components/Header';
import MapView, { Marker } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
const GOOGLE_MAPS_APIKEY = "AIzaSyCEXY6gU3UqQCBpy2z3MavWn36hAGKbHG8";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { addSite } from '../Redux/Actions/Visitsite';
import { sitecheckin } from '../Redux/Actions/SiteListing';
import Ionicons from 'react-native-vector-icons/FontAwesome';
const CheckIn = (props) => {
    const state = useSelector(state => state.Sitelist)
    const [loading, setloading] = useState(false);
    const [location, setlocation] = useState(null);
    const [latetude, setlatetude] = useState(0);
    const [longitude, setlongitude] = useState(0);
    // const [apilatetude, setapilatetude] = useState(state.sitedata.data[0]);
    // const [apilongitude, setapilongitude] = useState(state.sitedata.data[1]);
    const dispatch = useDispatch();
    const mapRef = useRef()
    console.log("ddddjdjdjdjddddjdjdjdj", state.sitedata)
    // console.log("ddddjdjdjdjddddjdjdjdj", apilongitude)
    const navigation = useNavigation();

    const checkinbtns = () => {

        requestLocation()
        navigation.navigate('SiteCondtion');
    }
    useEffect(() => {
        requestLocation()
    }, [])

    const requestLocation = () => {
        setloading(true)
        setlocation(null)

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
        })
            .then(location => {
                const loti = location.latitude;
                const long = location.longitude
                setloading(false)
                setlatetude(loti)
                setlongitude(long)
                dispatch(sitecheckin(state.currentsiteid, "Point", loti, long))
            })

            .catch(ex => {
                const { code, message } = ex;
                console.warn(code, message);
                if (code === 'CANCELLED') {
                    Alert.alert('Location cancelled by user or by another request');
                    setloading(false)
                }
                if (code === 'UNAVAILABLE') {
                    Alert.alert('Location service is disabled or unavailable');
                    setloading(false)
                }
                if (code === 'TIMEOUT') {
                    Alert.alert('Location request timed out');
                    setloading(false)
                }
                if (code === 'UNAUTHORIZED') {
                    Alert.alert('Authorization denied');
                    setloading(false)
                }

                setloading(false)
                setlocation(null)


            });
    }

    return (
        <SafeAreaView style={[cmstyle.flex_1]}>
            <StatusBar backgroundColor="#FA9A5B" barStyle="dark-content" />
            <Header nextscreen nextname="Check In" />
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <MapView
                    style={{ flex: 1 }}
                    region={{
                        latitude: latetude,
                        longitude: longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    showsUserLocation={true}
                >

                    <Marker
                        coordinate={{ latitude: latetude, longitude: longitude }}
                        // image={require('../Images/a.png')}
                        width={48}
                        height={48}


                    />


                </MapView>
                {loading ? <ActivityIndicator size="large" color="#FA9A5B" /> : null}
                <View
                    style={{
                        position: 'absolute',//use absolute position to show button on top of the map
                        top: '75%', //for center align
                        alignSelf: 'center' //for align to right
                    }}

                >
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={requestLocation} style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#FA9A5B' }}>
                            <Ionicons
                                name="location-arrow"
                                size={40}
                                color="black"

                            />
                        </TouchableOpacity>
                    </View>
                    {
                        state.sitedata == "" ? <View></View> : state.sitedata.data.is_raduis == false ? <TouchableOpacity style={[styles.loginbtn, { backgroundColor: '#cccccc' }]} activeOpacity={0.9} disabled={loading}>
                            <Text style={[styles.btntext]}>CHECK IN</Text>
                        </TouchableOpacity> :
                            <TouchableOpacity style={[styles.loginbtn, { backgroundColor: '#FA9A5B' }]} onPress={checkinbtns} activeOpacity={0.9} disabled={loading}>
                                <Text style={[styles.btntext]}>CHECK IN</Text>
                            </TouchableOpacity>
                    }



                </View>

            </View>


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


export default CheckIn;