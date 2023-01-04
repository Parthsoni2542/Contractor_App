import React,{useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screen/Login';
import NonVisted from '../Screen/NonVisted';
import SuperOngoing from '../Screen/SuperOngoing';
import SuperTabbar from '../components/SuperTabbar';
import SiteLocation from '../Screen/SiteLocation';
import Sitephotos from '../Screen/Sitephotos';
import SiteUpdated from '../Screen/SiteUpdated';
import Remark from '../Screen/Remark';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import styles from '../Styles/styles';
import ComplitedSite from '../Screen/ComplitedSite';
import PendingSite from '../Screen/PendingSite';
import SuperSidebar from '../components/SupervisorDrawer';
import Icon from 'react-native-vector-icons/AntDesign';
import Filter from '../Screen/Filter';
import Icon1 from 'react-native-vector-icons/Ionicons';
import { getAllworktype } from '../Redux/Actions/filter';
import { useDispatch } from 'react-redux';
const SuperVisorNavigator = () => {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();
    const Drawer = createDrawerNavigator();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllworktype())
    }, [])

    function supervisor() {
        
        return (
            <Tab.Navigator tabBar={(props) => <SuperTabbar {...props} />}>
                <Tab.Screen name='Non-Visted' component={NonVisted} initialParams={{ icon: 'home' }} />
                <Tab.Screen name='Ongoing' component={SuperOngoing} initialParams={{ icon: 'sticky-note' }} />
            </Tab.Navigator>
        );
    }


    function supervisorsidemenu() {
        return (
            <Drawer.Navigator drawerContentOptions={{ activeBackgroundColor: '#FA9A5B', activeTintColor: '#ffffff', itemStyle: [styles.fontMedium, { borderTopLeftRadius: 50, borderBottomLeftRadius: 50 }] }} initialRouteName="Home" drawerContent={(props) => <SuperSidebar {...props} />}>
                <Drawer.Screen name="HOME" component={supervisor} options={{
                    drawerIcon: ({ color }) => (
                        <Icon name={"home"} size={30} color={color} />
                    ),
                }} />
                <Drawer.Screen name="COMPLTED SITE" component={ComplitedSite} options={{
                    drawerIcon: ({ color }) => (
                        <Icon1 name={"checkmark-done-circle"} size={30} color={color} />
                    ),
                }} />
                <Drawer.Screen name="PENDING SITE" component={PendingSite} options={{
                    drawerIcon: ({ color }) => (
                        <Icon1 name={"add-circle-outline"} size={30} color={color} />
                    ),
                }} />

            </Drawer.Navigator>

        )
    }


    return (
        <Stack.Navigator>
            <Stack.Screen name="Supervisor" component={supervisor, supervisorsidemenu} options={{ headerShown: false, }} />
            <Stack.Screen name="SiteLocation" component={SiteLocation} options={{ headerShown: false, }} />
            <Stack.Screen name="Sitephotos" component={Sitephotos} options={{ headerShown: false, }} />
            <Stack.Screen name="SiteUpdated" component={SiteUpdated} options={{ headerShown: false, }} />
            <Stack.Screen name="Remark" component={Remark} options={{ headerShown: false, }} />
            <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false, }} />
        </Stack.Navigator>
    );
}

export default SuperVisorNavigator;