import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';



const token = ()=>async ()=>{
	return await AsyncStorage.getItem('token')
}
axios.defaults.baseURL = 'http://100.25.139.207:3000/api/v1'
axios.defaults.headers.common = {'Authorization': `Bearer ${token()}`}


export default axios
