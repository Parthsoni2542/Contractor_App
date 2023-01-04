import {Addsite, updateWorktype } from "../../../api/api";
import axios from '../../../helpers/axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
export const addSite = (iSiteId, type,latutude,logutude) => async (dispatch) => {

const token = await AsyncStorage.getItem('token');
console.log(token)  
    fetch(`${Addsite}`,{
        "method":"POST",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            iSiteId: iSiteId,
            oLocation:{
                type:type,
                coordinates:[latutude,logutude]
            }
        })
    }).then(resp => {
        console.log('resp', resp)
        return resp.json()
    }).then(respJson => {
        console.log("devicetoken",respJson.message)
        if(respJson.status =="200"){
            dispatch({ type: "SITEADD", payload: { data:respJson.message ,status:respJson.status , added:true}})
        }else{
            dispatch({ type: "SITEADD", payload: { data:respJson.message ,status:respJson.status , added:false}})
        }
    })

}

export const updateWorktypeData = (iSiteId,iWorkTypeId) => async (dispatch) => {

    const token = await AsyncStorage.getItem('token');

        fetch(`${updateWorktype}`,{
            "method":"POST",
            "headers": {
                "Authorization": token,
                "Content-Type": "application/json"
    
            },
            body: JSON.stringify({
                iSiteId: iSiteId,
                iWorkTypeId:[iWorkTypeId]
            })
        }).then(resp => {
            console.log('resp', resp)
            return resp.json()
        }).then(respJson => {
            console.log("devicetoken",respJson.message)
            if(respJson.status =="200"){
                dispatch({ type: "SITEADD", payload: { data:respJson.message ,status:respJson.status , added:true}})
            }else{
                dispatch({ type: "SITEADD", payload: { data:respJson.message ,status:respJson.status , added:false}})
            }
        })
    
    }