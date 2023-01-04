import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabBar from '../components/Tabbar';
import Pending from '../Screen/Pending';
import OnGoing from '../Screen/OnGoing';
import Sidebar from '../components/CustomDrawer';
import Mysite from '../Screen/Mysite';
import About from '../Screen/About';
import Faq from '../Screen/Faq';
import Terms from '../Screen/Terms';
import Ongoingworks from '../Screen/Ongoingworks';
import CheckIn from '../Screen/CheckIn';
import SiteCondtion from '../Screen/SiteCondtion';
import CheckList from '../Screen/CheckList';
import OngoingList from '../Screen/OngoingList';
import VideoList from '../Screen/VideoList';
import UploadMeasurement from '../Screen/UploadMeasurement';
import Thanks from '../Screen/Thanks';
import Filter from '../Screen/Filter';
import styles from '../Styles/styles';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/AntDesign';
import SplashScreen from '../Screen/SplashScreen';
import Login from '../Screen/Login';

const LabourNavigator = () => {


    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();
    const Drawer = createDrawerNavigator();

    function Labortabbar() {
        
        return (
            <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
                <Tab.Screen name='Pending' component={Pending} initialParams={{ icon: 'home' }} />
                <Tab.Screen name='Ongoing' component={OnGoing} initialParams={{ icon: 'sticky-note' }} />
            </Tab.Navigator>
        );
    }


function laborSidebar() {
    return (
        <Drawer.Navigator drawerContentOptions={{ activeBackgroundColor: '#FA9A5B', activeTintColor: '#ffffff', itemStyle: [styles.fontMedium, { borderTopLeftRadius: 50, borderBottomLeftRadius: 50 }] }} initialRouteName="Home" drawerContent={(props) => <Sidebar {...props} />}>
            <Drawer.Screen name="HOME" component={Labortabbar} options={{
                drawerIcon: ({ color }) => (
                    <Icon name={"home"} size={30} color={color} />
                ),
            }} />
            <Drawer.Screen name="COMPLTED SITE" component={Mysite} options={{
                drawerIcon: ({ color }) => (
                    <Icon1 name={"checkmark-done-circle"} size={30} color={color} />
                ),
            }} />
            <Drawer.Screen name="ABOUT US" component={About} options={{
                drawerIcon: ({ color }) => (
                    <Icon2 name={"info-circle"} size={30} color={color} />
                ),
            }} />
            <Drawer.Screen name="FAQ" component={Faq} options={{
                drawerIcon: ({ color }) => (
                    <Icon3 name={"chat-alert"} size={30} color={color} />
                ),
            }} />
            <Drawer.Screen name="TERMS & CONDITION" component={Terms} options={{
                drawerIcon: ({ color }) => (
                    <Icon4 name={"copy1"} size={30} color={color} />
                ),
            }} />
        </Drawer.Navigator>
    )
}



        return (
            <Stack.Navigator>
            
                <Stack.Screen name="Home" component={Labortabbar, laborSidebar} options={{ headerShown: false, }} />
                <Stack.Screen name="Pending" component={Pending} options={{ headerShown: false, }} />
                <Stack.Screen name="OnGoing" component={OnGoing} options={{ headerShown: false, }} />
                <Stack.Screen name="Ongoingworks" component={Ongoingworks} options={{ headerShown: false, }} />
                <Stack.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false, }} />
                <Stack.Screen name="SiteCondtion" component={SiteCondtion} options={{ headerShown: false, }} />
                <Stack.Screen name="CheckList" component={CheckList} options={{ headerShown: false, }} />
                <Stack.Screen name="OngoingList" component={OngoingList} options={{ headerShown: false, }} />
                <Stack.Screen name="VideoList" component={VideoList} options={{ headerShown: false, }} />
                <Stack.Screen name="UploadMeasurement" component={UploadMeasurement} options={{ headerShown: false, }} />
                <Stack.Screen name="Thanks" component={Thanks} options={{ headerShown: false, }} />
                <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false, }} />
               
            </Stack.Navigator>
        )

}

export default LabourNavigator;