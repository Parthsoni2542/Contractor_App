import React, { useState, useRef, useEffect } from 'react';
import { View, SafeAreaView, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import cmstyle from '../Styles/commanstyle';
import styles from '../Styles/styles'
import Header from '../components/Header';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
const GOOGLE_MAPS_APIKEY = "AIzaSyCEXY6gU3UqQCBpy2z3MavWn36hAGKbHG8";
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import { addSite } from '../Redux/Actions/Visitsite';


const SiteLocation = (props) => {
    // console.log("id",props.route.params.id)
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const [location, setlocation] = useState(null);
    const [latetude, setlatetude] = useState(0);
    const [longitude, setlongitude] = useState(0);
    const mapRef = useRef()

    const state = useSelector(state => state.visited)
    const navigation = useNavigation();

    const checkinbtns = () => {
        dispatch(addSite(props.route.params.id, "Point", latetude, longitude))
        navigation.navigate('Sitephotos', {
            id: props.route.params.id,
            name: props.route.params.name
        });
    }
    useEffect(() => {
        requestLocation();
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
                console.log(loti);
                console.log(long);
                setloading(false)
                setlatetude(loti)
                setlongitude(long)
            })
            .catch(ex => {
                const { code, message } = ex;
                console.warn(code, message);
                if (code === 'CANCELLED') {
                    Alert.alert('Location cancelled by user or by another request');
                    setloading(false)
                }
                if (code === 'UNAVAILABLE') {
                    Alert.alert('Location service is disabled or unavailable Please enable service');
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
            <Header nextscreen nextname="Site Location" />

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
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={requestLocation} style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: loading ? '#cccccc' : '#FA9A5B' }}>
                            <Ionicons
                                name="location-arrow"
                                size={40}
                                color="black"

                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.loginbtn, { backgroundColor:'#FA9A5B' }]} onPress={checkinbtns} activeOpacity={0.9}  >
                        <Text style={[styles.btntext]}>Update</Text>
                    </TouchableOpacity>


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


export default SiteLocation;