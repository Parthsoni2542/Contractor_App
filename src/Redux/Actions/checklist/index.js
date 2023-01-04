import { addmeasurement, addRemark, addSitephotos, beforeSiteCondtion, checklist, checklistSubmit, checkoutbtn } from "../../../api/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../../combineReducers'
console.log("ddddd", store)
export const Checklist = (iSiteId) => async (dispatch) => {
    console.log("checklist", iSiteId)
    let queryprms = `?iSiteId=${iSiteId}`
    const token = await AsyncStorage.getItem('token')
    // console.log(token)

    fetch(`${checklist}${queryprms}`, {
        "method": "GET",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
    }).then(Response => Response.json())
        .then(data => {
            console.log("ddddjdddggdddjdgdjhd", data.data.aChecklist)
            dispatch({ type: "CHECKLISTDATA", payload: { data: data.data.aChecklist } })
            // props.storedata(list)
            // console.log('datassdddd', data.data.results)
        })

}



export const ChecklistStore = (isiteid, urls) => async (dispatch) => {
    const cheklist = store.getState().checklist.checklistdata;
    const url = urls.map((x, i) => { return { sUrl: x, iCheckListId: cheklist[i]._id } });

   

    console.log("isiteidisiteid",isiteid)
    const token = await AsyncStorage.getItem('token')
  
    fetch(`${checklistSubmit}`, {
        "method": "POST",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            iSiteId: isiteid,
            aMediaUrls: url
        })
    }).then(Response => Response.json())
        .then(data => {
            dispatch({ type: "CHECKLISTMSG", payload: { data: data.message } })
        })

}



export const BeforeSiteStore = (isiteid, urls) => async (dispatch) => {
    const url = urls.map((x) => { return { sUrl: x } });

    const token = await AsyncStorage.getItem('token')
    fetch(`${beforeSiteCondtion}`, {
        "method": "POST",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            iSiteId: isiteid,
            aMediaUrls: url
        })
    }).then(Response => Response.json())
        .then(data => {

            console.log(data.message)
            // console.log("ddddjdddggdddjdgdjhd",data.data.results)
            dispatch({ type: "BSCMSG", payload: { data: data.message } })
            // props.storedata(list)
            // console.log('datassdddd', data.data.results)
        })

}


export const Sitephotoss = (isiteid, check, urls) => async (dispatch) => {
    const url = urls.map((x) => { return { sUrl: x } });
    console.log("urls", isiteid)
    console.log("urls", urls)
    const token = await AsyncStorage.getItem('token')
    fetch(`${addSitephotos}`, {
        "method": "POST",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            iSiteId: isiteid,
            bIsSiteCompleted: check,
            aMediaUrls: url
        })
    }).then(Response => Response.json())
        .then(data => {
            console.log("dndndnddmndmdnmdn", data.message)
            // console.log("ddddjdddggdddjdgdjhd",data.data.results)
            dispatch({ type: "SITEPHOTOS", payload: { data: data.message } })
            // props.storedata(list)
            // console.log('datassdddd', data.data.results)
        })

}




export const AddRemark = (isiteid, remark, urls) => async (dispatch) => {
    const url = urls.map((x) => { return { sUrl: x } });
    const token = await AsyncStorage.getItem('token')
    fetch(`${addRemark}`, {
        "method": "POST",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            iSiteId: isiteid,
            sRemark: remark,
            eStatus: "CMP",
            sComment: remark,
            aMediaUrls: url
        })
    }).then(Response => Response.json())
        .then(data => {

            console.log(data)
            // console.log("ddddjdddggdddjdgdjhd",data.data.results)
            dispatch({ type: "REMARK", payload: { data: data.message } })
            // props.storedata(list)
            // console.log('datassdddd', data.data.results)
        })

}


export const AddMesurmentbook = (isiteid, urls) => async (dispatch) => {
    const url = urls.map((x) => { return { sUrl: x } });
    console.log("isiteid",isiteid)

    const token = await AsyncStorage.getItem('token')
    fetch(`${addmeasurement}`, {
        "method": "POST",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            iSiteId: isiteid,
            aMediaUrls: url
        })
    }).then(Response => Response.json())
        .then(data => {

            console.log("habhsahahssbhsbhshsahsahsbhbh",data)
            // console.log("ddddjdddggdddjdgdjhd",data.data.results)
            dispatch({ type: "BOOK", payload: { data: data.message } })
            // props.storedata(list)
            // console.log('datassdddd', data.data.results)
        })

}




export const Checkoutbtn = (isiteid) => async (dispatch) => {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    fetch(`${checkoutbtn}`, {
        "method": "POST",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            iSiteId: isiteid,
        })
    }).then(Response => Response.json())
        .then(data => {

            console.log("dhdddjjdjd", data)
            // console.log("ddddjdddggdddjdgdjhd",data.data.results)
            // dispatch({ type: "CHECKLISTDATA", payload: { data:data.data.results } })
            // props.storedata(list)
            // console.log('datassdddd', data.data.results)
        })

}


export const clearmsg = () => async (dispatch) => {
    dispatch({ type: "SITEPHOTOS", payload: { data: '' } })
}

export const clearmesurmentmsg = () => async (dispatch) => {
    dispatch({ type: "BOOK", payload: { data: '' } })
}
export const clearRemark = () => async (dispatch) => {
    dispatch({ type: "REMARK", payload: { data: '' } })
}