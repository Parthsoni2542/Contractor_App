import { RNS3 } from 'react-native-upload-aws-s3';

const options = {
    keyPrefix: "sites/",
    bucket: "contractors-storage",
    region: "ap-south-1",
    accessKey: "AKIAQPYHFPI7PPCBLFH4",
    secretKey: "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",
    successActionStatus: 201
}



export const baseUrl = "http://18.117.245.10:4000/api/v1/";
export const Login = baseUrl + "users/auth/login";
export const validateLogin = baseUrl + "users/auth/validate";
export const Getsitelist = baseUrl + "sites/list";
export const Addsite = baseUrl + "sites/location";
export const usersite = baseUrl + "sites/get_location";
export const usercheckin = baseUrl + "sites/check-in";
export const alldept = baseUrl + "departments/list";
export const allworktype = baseUrl + "worktypes/list";
export const allzone = baseUrl + "zones/list";
export const checklist = baseUrl + "sites/checklist";
export const beforeSiteCondtion = baseUrl + "sites/before-site-condition";
export const checklistSubmit = baseUrl + "sites/checklist-items";
export const sitesteps = baseUrl + "sites/sitesteps";
export const userchekin = baseUrl + "sites/check-in";
export const addSitephotos = baseUrl + "sites/site-photos";
export const addRemark = baseUrl + "sites/remarks";
export const addmeasurement = baseUrl + "sites/measurement-book";
export const checkoutbtn = baseUrl + "sites/checkout";
export const updateWorktype = baseUrl + "sites/update_worktype";
export const aws = "https://s3-ap-south-1.amazonaws.com/contractors-storage/";







export const s3Upload = ({files,site}, cb) => {
   
 const urlsArray = []
    files.forEach((item, i) => {
        console.log("itemdddd",item.name)
        options.keyPrefix= 'sites/'
        const key = options.keyPrefix + `${site.name}_${site.id}/${site.folderName}/${item.name}`

        // console.log("keys",key)
        options.keyPrefix = key
        if(item){
            RNS3.put(item, options).then((res) => {
                const data = res.body.postResponse.key
                urlsArray.push(data)
                if(urlsArray.length === files.length){
                    cb(urlsArray)
                }
                // console.log("ddddddddddddddd",res)
            }).catch((error) => {
                // console.log(error)
            })
        }
       
    })
}