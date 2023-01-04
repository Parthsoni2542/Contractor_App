import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, SafeAreaView, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import style from '../Styles/styles';
import cmstyle from '../Styles/commanstyle'
import { useSelector, useDispatch } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';

import { getComplitedsiteFilter, getList, getNotList, getOngoigfiter } from '../Redux/Actions/SiteListing';
const Header = (props) => {
  console.log("otherParam: 'anything you want here'",props.Estatus)
  const navigation = useNavigation();
  const state = useSelector(state => state.filter)
  const [isState, SetisState] = useState(false)
  const dispatch = useDispatch();

  const resetFilters = (setDept, setZone, setWorkType) => {
    setDept(0)
    setZone(0)
    setWorkType(0)
    SetisState(true)
  }
  const applysitefilters = (dep, work, zone) => {

    const idepertmentid = state.alldept[dep]._id
    const iwork = state.allwork[work]._id
    const izone = state.allzone[zone]._id
    const estatus = props.status

    console.log("idepertmentid",idepertmentid)
    console.log("estatus",estatus)
    console.log("iwork",iwork)
    console.log("izone",izone)
    if(props.status == "NV"){
    dispatch(getNotList(estatus, idepertmentid, iwork, izone))
    navigation.navigate('Supervisor')
    }else if(props.status == "ON"){
      dispatch(getOngoigfiter(estatus, idepertmentid, iwork, izone))
      navigation.navigate('Supervisor')
    }else if(props.status == "CMP"){
      dispatch(getComplitedsiteFilter(estatus, idepertmentid, iwork, izone))
      navigation.navigate('Supervisor')
    }else if(props.status == "P"){
      dispatch(getList(estatus, idepertmentid, iwork, izone))
      navigation.navigate('Home')
    }else if(props.Estatus == "ON") {
      dispatch(getOngoigfiter(props.Estatus, idepertmentid, iwork, izone))
      navigation.navigate('Home')
    } 
  }

  useEffect(() => {
    console.log('isState updated', isState);
    props.isReset && typeof props.reset=="function" && props.isReset(isState)


  }, [isState])



  const startbtn = () => {
    if (props.img == ''||props.startbtn) {
      return (
        <TouchableOpacity style={{ width: 70, height: 30, borderRadius: 20, marginHorizontal: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: '#938F8D' }} activeOpacity={1}>
          <Text style={[style.fontRegular, { fontSize: 13, color: '#ffff' }]}>{props.btnname}</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={{ width: 70, height: 30, borderRadius: 20, marginHorizontal: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FA9A5B' }} onPress={props.btna}>
          <Text style={[style.fontRegular, { fontSize: 13, color: '#ffff' }]}>{props.btnname}</Text>
        </TouchableOpacity>
      )
    }

  }
  const emplogo = () => {
    if (props.home) {
      return (
        <SafeAreaView>
          <View style={styles.menuWrapper}>
            <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()} activeOpacity={0.7} >
                <Feather
                  name="menu"
                  size={38}
                  color="#000000"
                  style={styles.menuIcon}
                />
              </TouchableOpacity>

            </View>

            <View style={{ width: 50, height: 50, backgroundColor: "#000000", borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => props.filterdata()} activeOpacity={0.7} >
                <SimpleLineIcons
                  name="equalizer"
                  size={32}
                  color="#fff"
                  style={styles.menuIcon}
                />
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      )
    } else if (props.nextscreen) {
      return (
        <SafeAreaView>
          <View style={styles.menuWrapper1}>
            <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} >
                <Icon
                  name="chevron-back"
                  size={38}
                  color="#000000"
                  style={styles.menuIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 60 }}>
              <Text style={[style.fontMedium, { fontSize: 25 }]}>
                {props.nextname}
              </Text>
            </View>


          </View>
        </SafeAreaView>
      );
    }
    else if (props.Icon) {
      return (
        <SafeAreaView>
          <View style={styles.menuWrapper1}>
            <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} >
                <Icon
                  name="chevron-back"
                  size={38}
                  color="#000000"
                  style={styles.menuIcon}
                />
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      );
    }
    else if (props.CheckList) {
      console.log("clear",props.clear)
      return (
        <SafeAreaView>
          <View style={styles.menuWrapper1}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} >
                <Icon
                  name="chevron-back"
                  size={38}
                  color="#000000"
                  style={styles.menuIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={props.clear}>
              <View><Text style={[style.fontRegular, { fontSize: 18, color: '#333F54' }]}>CheckOut</Text></View>
              </TouchableOpacity>
            
              <View><Text style={[style.fontMedium, { fontSize: 20, marginHorizontal: 20, color: '#333F54' }]}>{props.name}</Text></View>
              <View>
                {startbtn()}
              </View>
            </View>

          </View>
        </SafeAreaView>
      );
    }
    else if(props.outgoinglist) {
      return (
        <SafeAreaView>
          <View style={styles.menuWrapper1}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
                <Icon
                  name="chevron-back"
                  size={38}
                  color="#000000"
                  style={styles.menuIcon}
                />
              </TouchableOpacity>
              <View><Text style={{ fontSize: 18, color: '#333F54' }}>{props.name}</Text></View>



            </View>

          </View>
        </SafeAreaView>
      );
    } else if(props.mysite) {
      return (
        <SafeAreaView>
          <View style={styles.menuWrapper}>
            <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()} activeOpacity={0.7} >
                <Feather
                  name="menu"
                  size={38}
                  color="#000000"
                  style={styles.menuIcon}
                />
              </TouchableOpacity>

            </View>
            <Text style={[style.fontMedium, { fontSize: 25 }]}>{props.sitename}</Text>
            <View style={{ width: 50, height: 50, backgroundColor: "#000000", borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={props.modelddd} activeOpacity={0.7} >
                <SimpleLineIcons
                  name="equalizer"
                  size={32}
                  color="#fff"
                  style={styles.menuIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )
    } else if (props.filter) {
      const { active, active1, active2 } = props.filter;
     
      const { setactive, setactive1, setactive2 } = props.reset;
      return (
        <SafeAreaView>
          <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: '#C3C3C399' }}>
            <TouchableOpacity style={{ width: 60, height: 30, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }} onPress={() => {
              resetFilters(setactive, setactive1, setactive2)
              SetisState(true)
            }} >
              <Text style={[style.fontRegular, { fontSize: 20, color: '#333F54' }]}>Reset</Text>
            </TouchableOpacity>

            <Text style={[style.fontMedium, { fontSize: 22, color: '#333F54' }]}>Filter</Text>
            <TouchableOpacity style={{ width: 60, height: 30, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FA9A5B' }} onPress={() => applysitefilters(active, active1, active2)} >
              <Text style={[style.fontRegular, { fontSize: 14, color: '#ffff' }]}>APPLY</Text>
            </TouchableOpacity>

          </View>
        </SafeAreaView>
      )
    }else if (props.filter1) {
      return (
        <SafeAreaView>
          <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: '#C3C3C399' }}>
            <TouchableOpacity style={{ width: 60, height: 30, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }} onPress={() => {
             
            }} >
              <Text style={[style.fontRegular, { fontSize: 20, color: '#333F54' }]}>Reset</Text>
            </TouchableOpacity>

            <Text style={[style.fontMedium, { fontSize: 22, color: '#333F54' }]}>Filter</Text>
            <TouchableOpacity style={{ width: 60, height: 30, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FA9A5B' }} onPress={props.filterdata} >
              <Text style={[style.fontRegular, { fontSize: 14, color: '#ffff' }]}>APPLY</Text>
            </TouchableOpacity>

          </View>
        </SafeAreaView>
      )
    }
  }
  
  return (
    <SafeAreaView style={cmstyle.flex_1, styles.pbcolor}>
      <View style={cmstyle.items_center, cmstyle.justify_center}>
        {emplogo()}
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#fff',
  },
  menuWrapper: {
    marginHorizontal: 10,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth:1
  },
  menuWrapper1: {
    marginHorizontal: 10,
    marginTop: 7,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // borderWidth:1
  },

});

export default Header;
