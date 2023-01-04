import { StyleSheet, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

    // ------------ Globel colors & fonts ------------ //

    pbColor: {
        backgroundColor: '#FA9A5B',
    },
    sbColor: {
        backgroundColor: '#fbf4e6'
    },
    tbColor: {
        backgroundColor: '#FFFFFF'
    },
    ptColor: {
        color: '#575651'
    },
    fontSemiBold:{
        fontFamily:'Quicksand-SemiBold'
    },
    fontbold:{
        fontFamily:'Quicksand-Bold'
    },
    fontRegular:{
        fontFamily:'Quicksand-Regular'
    },
    fontLight: {
        fontFamily:'Quicksand-Light'
    },
    fontMedium: {
        fontFamily:'Quicksand-Medium'
    },

    
    fontSize_18: {
        fontSize: 18
    },
    fontSize_20: {
        fontSize: 20
    },
    fontSize_16: {
        fontSize: 16
    },
    fontsize_25: {
        fontSize: 25
    },


// ------------ Header style start ------------ // 

    headerCont: {
        paddingHorizontal: 22,
        marginTop: 20
    },
    empName: {
        fontSize: 20
    },
    empImage: {
        width: 52,
        height: 52,
        borderRadius: 100
    },
    headerTitle: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    screenTitle: {
        fontSize: 19,
        color: '#5d5136',
        marginRight: 40
    },
    backicon: {
        fontSize: 25,
        marginTop: 10,
        color: '#5d5136',
        marginLeft: 10,
    },


    // ------------ Login style start ------------ // 

    loginwrapper: {
        backgroundColor: '#fbf4e6',
        flex: 2,
        marginTop: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    loginTxt: {
        color: '#635f57',
        marginTop: 20,
        fontWeight: 'bold',
    },

    inputbox: {
        height: 35,
        width: windowWidth - 90,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#cfccc8',
        marginTop: 10,
        backgroundColor: "#ffffff",

    },
    loginbtn: {
        width: 310,
        padding: 10,
        backgroundColor: '#FA9A5B',
        borderRadius: 30,
        marginTop: 30,
        // justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 20,
    },
    btntext: {
        color: '#fff',
        // fontWeight: 'bold',
        fontSize: 20
    },
    loginbtn3: {
        width: 310,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 30,
        marginTop: 30,
        // justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 20,
    },
    btntext3: {
        color:  '#FA9A5B',
        // fontWeight: 'bold',
        fontSize: 20
    },
    sbnbtn: {
        width: 310,
        padding: 20,
        backgroundColor: '#FA9A5B',
        borderRadius: 30,
        position:'absolute',
        // bottom:,
        // marginTop: 30,
        // justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 20,
    },
    sbbtntext: {
        color: '#fff',
        // fontWeight: 'bold',
        fontSize: 20
    },
    loginbtn1: {
        width: 200,
        height:50,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 30,
        marginTop: 30,
        // justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 20,
    },
    btntext1: {
        color: '#FA9A5B',
        // fontWeight: 'bold',
        fontSize: 20
    },

    loginsecoundrybox1: {
        backgroundColor: '#fbf4e6',
        flex: 2,
        marginTop: 10,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },



    detailtext: {
        width: "85%",
        marginTop: 10,
        // marginBottom: 10,
        // borderWidth: 1
    },

    // ------------ Dashboard style start ------------ // 

   
    footerContainer: {
        marginTop: 150,
        height: windowHeight ,
        width: windowWidth,
        // borderWidth:1
    },
   
    checkinCont: {
        width: "90%",
        marginTop: 10,
        marginBottom: 10,
        // borderWidth: 1
    },
    manuCont: {
        padding: 5,
        width: "100%",
        // justifyContent: 'space-evenly',
        // borderWidth: 1
        // justifyContent: "space-between"
    },

    manuCont1: {
        padding: 5,
        // width: "90%",
        // justifyContent: 'space-evenly',
        // borderWidth:1
        // justifyContent: "space-between"
    },
    manuBoxSp: {
        marginTop: 25
    },
    iconPlacbox: {
        width: "100%",
        // padding: 40,
        borderRadius: 8,
        margin:6,
        backgroundColor:'red'
    },

    imgview: {

        width: 160,
        height: 160,
        // padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        elevation: 3,
        margin: 10,
        // borderWidth: 1,
        borderColor: '#707070',
    },

    nextvisitbox: {
        width: windowWidth - 50,
        padding: 20,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        
        
        borderWidth:1,
    //    backgroundColor:'red',
        borderBottomWidth:0,
        borderColor:'#707070'
        
    },
    nextvisitbox22: {
        width: windowWidth - 50,
        padding: 20,
        height:'50%',
        
        
    
      
       
        
    },
    nextvisitbox5: {
        width: windowWidth - 50,
        padding: 10,
        borderRadius:10,
        height: 230,
        borderWidth: 1,
        borderColor:'orange'
        //    backgroundColor:'red',
        // borderBottomWidth: 0,
        // borderColor: '#707070'

    },
    sado:{
    // height:80,
    // width:200,
    // backgroundColor:'#fff',
    shadowColor:'#000',
    shadowOffset:{width:0,height:16},
    shadowRadius: 7.49,
    shadowOpacity:0.57,
    elevation:24,
    // flex:1
    },
    nextvisitbox1: {
        width: windowWidth - 50,
        // padding: 20,
        borderRadius:10,
        
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        height: 154,
        borderWidth: 1,
        // borderBottomWidth: 0,
        borderColor: '#FA9A5B'
    },
    nextvisitbox2: {
        width: windowWidth - 65,
        // padding: 20,
        borderRadius: 10,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        height: 154,
        borderWidth: 1,
        // borderBottomWidth: 0,
        borderColor: '#008018'
    },
    yellowborder: {
        width: windowWidth - 65,
        // padding: 20,
        borderRadius: 10,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        height: 154,
        borderWidth: 1,
        // borderBottomWidth: 0,
        borderColor: '#FFA368'
    },
    pendingbtn: {
        width: windowWidth - 50,
        height:48,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor:"#333F54",
        borderColor: '#707070'
    },
    ongoingbtn: {
        width: windowWidth - 50,
        height: 48,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: "#FA9A5B",
        borderColor: '#707070'
    },
    icons: {
        width: 45,
        height: 45,
        marginBottom: 10
    },


  
})


export default styles;
