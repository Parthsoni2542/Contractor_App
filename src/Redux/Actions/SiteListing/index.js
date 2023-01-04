import { Getsitelist, usersite } from '../../../api/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../helpers/axios'

export const getList = (eStatus, iDepartmentId = '', iWorkTypeId = '', iZoneId = '') => async (dispatch) => {
    const token = await AsyncStorage.getItem('token')
    let queryprms = `?eStatus=${eStatus}`
    queryprms += iDepartmentId ? `&iDepartmentId=${iDepartmentId}` : ''
    queryprms += iWorkTypeId ? `&iWorkTypeId=${iWorkTypeId}` : ''
    queryprms += iZoneId ? `&iZoneId=${iZoneId}` : ''
    fetch(`${Getsitelist}${queryprms}`, {
        "method": "GET",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"
        },
    }).then(Response => Response.json())
        .then(data => {
            console.log("data", data)
            dispatch({ type: "GETPENDING", payload: { data: data.data.results, getsitename: true } })
            console.log('datassdddd', data.data.results)
        })

}


export const getNotvisited = (eStatus) => async (dispatch) => {
    const token = await AsyncStorage.getItem('token')
    console.log(token)

    fetch(`${Getsitelist}?eStatus=${eStatus}`, {
        "method": "GET",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
    }).then(Response => Response.json())
        .then(data => {
            console.log("ddddjdddggdddjdgdjhd",)
            if (data.status == 200) {
                dispatch({ type: "GETNOTVISIED", payload: { data: data.data.results, notvisitedloading: true } })
            } else {
                dispatch({ type: "GETNOTVISIED", payload: { notvisitedloading: true, error: "Something Want to Wrong" } })
            }

            // props.storedata(list)
            // console.log('datassdddd', data.data.results)
        })

}

export const getOngoig = (eStatus) => async (dispatch) => {

    console.log("eStatus", eStatus)
    const token = await AsyncStorage.getItem('token')
    // console.log(token)
    fetch(`${Getsitelist}?eStatus=${eStatus}`, {
        "method": "GET",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
    }).then(Response => Response.json())
        .then(data => {
            console.log(data)
            dispatch({ type: "GETNOGOING", payload: { data: data.data.results, loadings: true } })
            // props.storedata(list)
            // console.log('datassdddd', data.data.results)
        })

}



export const getComplitedsite = (eStatus) => async (dispatch) => {

    const token = await AsyncStorage.getItem('token')
    // console.log(token)
    fetch(`${Getsitelist}?eStatus=${eStatus}`, {
        "method": "GET",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
    }).then(Response => Response.json())
        .then(data => {
            console.log(data)
            dispatch({ type: "GETCOMPLITED", payload: { data: data.data.results, cmploading: true } })
            // props.storedata(list)
            // console.log('datassdddd', data.data.results)
        })

}



export const currentsitedetail = (id, name) => {

    console.log("sddddd", id, "ddddd", name)
    const data = {
        id, name
    }
    console.log("sddddd", id, "ddddd", name)
    return { type: "GETSITEDETAIL", payload: data }

}


export const getNotList = (eStatus, iDepartmentId = '', iWorkTypeId = '', iZoneId = '') => async (dispatch) => {
    const token = await AsyncStorage.getItem('token')
    let queryprms = `?eStatus=${eStatus}`
    queryprms += iDepartmentId ? `&iDepartmentId=${iDepartmentId}` : ''
    queryprms += iWorkTypeId ? `&iWorkTypeId=${iWorkTypeId}` : ''
    queryprms += iZoneId ? `&iZoneId=${iZoneId}` : ''
    fetch(`${Getsitelist}${queryprms}`, {
        "method": "GET",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"
        },
    }).then(Response => Response.json())
        .then(data => {
            console.log("data", data)
            dispatch({ type: "GETNOTVISIED", payload: { data: data.data.results, notvisitedloading: true } })
            // console.log('datassdddd', data.data.results)
        })

}


export const getOngoigfiter = (eStatus, iDepartmentId = '', iWorkTypeId = '', iZoneId = '') => async (dispatch) => {
    const token = await AsyncStorage.getItem('token')
    let queryprms = `?eStatus=${eStatus}`
    queryprms += iDepartmentId ? `&iDepartmentId=${iDepartmentId}` : ''
    queryprms += iWorkTypeId ? `&iWorkTypeId=${iWorkTypeId}` : ''
    queryprms += iZoneId ? `&iZoneId=${iZoneId}` : ''
    fetch(`${Getsitelist}${queryprms}`, {
        "method": "GET",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
    }).then(Response => Response.json())
        .then(data => {
            console.log("filterdata", data)
            dispatch({ type: "GETNOGOING", payload: { data: data.data.results, loadings: true } })
            // props.storedata(list)
            // console.log('datassdddd', data.data.results)
        })

}

export const getComplitedsiteFilter = (eStatus, iDepartmentId = '', iWorkTypeId = '', iZoneId = '') => async (dispatch) => {
    const token = await AsyncStorage.getItem('token')
    let queryprms = `?eStatus=${eStatus}`
    queryprms += iDepartmentId ? `&iDepartmentId=${iDepartmentId}` : ''
    queryprms += iWorkTypeId ? `&iWorkTypeId=${iWorkTypeId}` : ''
    queryprms += iZoneId ? `&iZoneId=${iZoneId}` : ''
    fetch(`${Getsitelist}${queryprms}`, {
        "method": "GET",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
    }).then(Response => Response.json())
        .then(data => {
            console.log("filterdata", data)
            dispatch({ type: "GETCOMPLITED", payload: { data: data.data.results, cmploading: true } })
            // props.storedata(list)
            // console.log('datassdddd', data.data.results)
        })

}


export const sitecheckin = (iSiteId, type, latutude, logutude) => async (dispatch) => {
    console.log("datadatadatadaassaashashashuashtadatadatadata",iSiteId, type, latutude, logutude)
    const token = await AsyncStorage.getItem('token')
    fetch(`${usersite}`, {
        "method": "POST",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            iSiteId: iSiteId,
            oLocation: {
                type: type,
                coordinates: [latutude, logutude]
            }
        })
    }).then(Response => Response.json())
        .then(data => {
            console.log("datadatadatadatadatadatadata", data)
            dispatch({ type: "GETSITEDATA", payload: { data: data.data} })
            // props.storedata(list)
            // console.log('datassdddd', data.data.results)
        })

}


