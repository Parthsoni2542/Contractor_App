import { beforeSiteCondtion, checklist, checklistSubmit, sitesteps } from "../../../api/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../../combineReducers'

export const Ongoing = (iSiteId) => async (dispatch) => {
    
    let queryprms = `?iSiteId=${iSiteId}`
    const token = await AsyncStorage.getItem('token')
 
        fetch(`${sitesteps}${queryprms}`, {
            "method": "GET",
            "headers": {
                "Authorization":token,
                "Content-Type": "application/json"
    
            },
        }).then(Response => Response.json())
            .then(data => {
                console.log("ddbddddhdgddgdjd",data)
                dispatch({ type: "ONGOINGLIST", payload: {data:data.data.aSiteSteps, loader:true} })
                // props.storedata(list)
                // console.log('datassdddd', data.data.results)
            })
    
}



export const SitestepStore = (isiteid,stepid,urls) => async (dispatch) => {

    console.log("__id",isiteid)
    console.log("iSiteStepId",stepid)
    console.log("parash2",urls)
    // const cheklist = store.getState().checklist.checklistdata;

    console.log("shsgdsgdhdgsgsdhdhdhd",isiteid,stepid,urls)
    const url = urls.map((x) => {return {sUrl:x}} );

    // console.log("isiteid",cheklist)
 
    console.log("urls",url)
    const token = await AsyncStorage.getItem('token')
    console.log(token)
        fetch(`${sitesteps}`, {
            "method": "POST",
            "headers": {
                "Authorization":token,
                "Content-Type": "application/json"
    
            },
            body: JSON.stringify({
                iSiteId:isiteid,
                iSiteStepId:stepid,
                aMediaUrls:url
            })
        }).then(Response => Response.json())
            .then(data => {
                // console.log("shsgdsgdhdgsgsdhdhdhd",data)
                dispatch({ type: "SITESTEPSTORE",payload:{msg:data.message } })
                
            })
    
    }




export const cleanmsgsiteclean = ()=> async (dispatch) =>{
    dispatch({ type: "SITESTEPSTORE", payload:{msg:'' } })
}