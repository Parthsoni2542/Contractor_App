
import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity,Text } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/Ionicons';
import style from '../Styles/styles';
const { width } = Dimensions.get('screen');

const Tab = ({ color, tab, onPress, icon, backgroundColor}) => {
    // console.log(tab.name)
    return <TouchableOpacity style={[styles.container, { backgroundColor: backgroundColor }]} onPress={onPress} activeOpacity={1}>
        <Text style={[style.fontbold, { color: color, fontSize: 22 }]}>{tab.name}</Text>
           </TouchableOpacity>
    ;
};

const styles = StyleSheet.create({
    container: {
       flex:1,
       alignItems:'center',
     
       overflow:"hidden",
    //    justifyContent:'center',
       padding:12,
    //    borderWidth:1
    //    backgroundColor:'red'
    }
})


export default Tab;