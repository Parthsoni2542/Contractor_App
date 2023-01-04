import { alldept,allworktype,allzone } from '../../../api/api'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getAllDept = () => async (dispatch) => {
const token = await AsyncStorage.getItem('token')
    fetch(`${alldept}`, {
        "method": "GET",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
    }).then(Response => Response.json())
        .then(data => {
            console.log(data)
            dispatch({ type: "GETALLDEPT", payload: { data:data.data.results } })
 
        })

}


export const getAllworktype = () => async (dispatch) => {
    const token = await AsyncStorage.getItem('token')
    // console.log(token)
    
        fetch(`${allworktype}`, {
            "method": "GET",
            "headers": {
                "Authorization":token,
                "Content-Type": "application/json"
    
            },
        }).then(Response => Response.json())
            .then(data => {
                console.log(data)
                dispatch({ type: "GETALLWORK", payload: { data:data.data.results } })
                // props.storedata(list)
                // console.log('datassdddd', data.data.results)
            })
    
    }

    export const getAllZone = () => async (dispatch) => {

        const token = await AsyncStorage.getItem('token')
        // console.log(token)
            fetch(`${allzone}`, {
                "method": "GET",
                "headers": {
                    "Authorization":token,
                    "Content-Type": "application/json"

                },
            }).then(Response => Response.json())
                .then(data => {
                    console.log(data)
                    dispatch({ type: "GETALLZONE", payload: { data:data.data.results } })
                    // props.storedata(list)
                    // console.log('datassdddd', data.data.results)
                })
        
        }  