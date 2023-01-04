
import React, { useState} from 'react';
import {StyleSheet, View, Dimensions } from 'react-native';
import Tab from './Tab';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TabBar = ({state,navigation}) => {
    const [selected, setselected] = useState('Pending');
    const {routes} = state;
    const renderColor = currenTab => (currenTab === selected ? '#ffff' : 
    '#FA9A5B');
   
    const renderColorss = currenTab => (currenTab === selected ? '#FA9A5B' :
        'white');

    const handlePrees = (activetab) =>{

        setselected(activetab)
        navigation.navigate(activetab)

    }
    return <View style={styles.wrapper}>
            <View style={styles.container}>
            {routes.map(
                    route => (
                        <Tab tab={route}
                        backgroundColor={renderColorss(route.name)}
                        onPress={() => handlePrees(route.name)} 
                        color={renderColor(route.name)} 
                        key={route.key}
                        />
                        ))}
            </View>
            </View>;
};

const styles = StyleSheet.create({
    wrapper:{
        // borderWidth:1,
        position:'absolute',
        // bottom: 0,
        top:80,
        width:windowWidth,
        alignItems:'center',
        justifyContent:'center',
    },
    container:{
        flexDirection:'row',
        backgroundColor:'#FA9A5B',
        justifyContent:'center',
        alignItems: 'center',
        // width:310,
        borderWidth:1,
        borderColor:'#FA9A5B',

        overflow:'hidden',
        height:56,
        borderRadius:10,
        width: windowWidth - 50,
        // padding: 20,
    
    }
})


export default TabBar;