import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import cmstyle from '../Styles/commanstyle';
import Header from '../components/Header';
import style from '../Styles/styles'
import { getAllDept, getAllworktype, getAllZone } from '../Redux/Actions/filter';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
const Filter = (props) => {
  // console.log("ffsssdsdhjs",props.route.params.EEStatus)
  const [active, setactive] = useState(0)
  const [active1, setactive1] = useState(0)
  const [active2, setactive2] = useState(0)
  const [bReset, setReset] = useState(false)

  const dispatch = useDispatch();

  const state = useSelector(state => state.filter)

  useEffect(() => {
      console.log(`bReset`, bReset)
      if (!bReset) {
      dispatch(getAllDept())
      dispatch(getAllworktype())
      dispatch(getAllZone())
    }

  }, [bReset])



  return (
    <View>
      <StatusBar backgroundColor="#FA9A5B" barStyle="dark-content" />
      <Header filter={{ active, active1, active2 }} reset={{ setactive, setactive1, setactive2 }} status={props.route.params.eStatus} isReset={(x) =>setReset(x)} Estatus={props.route.params.EEStatus} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '90%' }}>
            <Text style={[style.fontMedium, { color: '#000000', fontSize: 16 }]}>Department</Text>
          </View>
          {
            state.alldept == ''  ?  <Loader /> : state.alldept.map((index, i) => {
              return (
                <TouchableOpacity onPress={() => { setactive(i) }}
                  style={(active === i && !bReset) ? styles.Active : styles.inactive} activeOpacity={0.5}>
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={(active === i && !bReset)? [style.fontMedium, { fontSize: 20, color: '#fff', textAlign: 'center' }] : [style.fontMedium, { fontSize: 20, color: '#938F8D', textAlign: 'center' }]}> {index.sName} </Text>
                  </View>

                </TouchableOpacity>
              )
            })
          }





          <View style={{ width: '90%', marginTop: 10 }}>
            <Text style={[style.fontMedium, { color: '#000000', fontSize: 16 }]}>Type of Work</Text>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', margin: 5 }}>
            {
              state.allwork == '' ? null : state.allwork.map((index, i) => {
                return (
                  <TouchableOpacity onPress={() => { setactive1(i) }}
                    style={(active1 === i && !bReset)? styles.Active1 : styles.inactive1} activeOpacity={0.5}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={(active1 === i && !bReset)? [style.fontMedium, { fontSize: 17, color: '#fff', textAlign: 'center' }] : [style.fontMedium, { fontSize: 17, color: '#938F8D', textAlign: 'center' }]}>{index.sName}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }


            <View style={{ width: '90%', marginTop: 5, padding: 5 }}>
              <Text style={[style.fontMedium, { color: '#000000', fontSize: 16 }]}>Zone List</Text>
            </View>
            {
              state.allzone == '' ? null : state.allzone.map((index, i) => {
                return (
                  <TouchableOpacity onPress={() => { setactive2(i) }}
                    style={(active2 === i && !bReset) ? styles.Active : styles.inactive} activeOpacity={0.5}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={(active2 === i && !bReset)? [style.fontMedium, { fontSize: 17, color: '#fff', textAlign: 'center' }] : [style.fontMedium, { fontSize: 17, color: '#938F8D', textAlign: 'center' }]}>{index.sName} </Text>
                    </View>

                  </TouchableOpacity>
                )

              })
            }


          </View>
        </View>
      </ScrollView>









    </View>

  )
}

const styles = StyleSheet.create({
  inactive: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#938F8D',
    width: 330,
    height: 50,
    marginLeft: 5,
    marginTop: 10,
    borderRadius: 50
  },
  Active: {
    alignItems: 'center',
    backgroundColor: '#FA9A5B',
    borderColor: 'orange',
    width: 330,
    height: 50,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 50,
    color: 'blue',
    justifyContent: 'center',
  },

  inactive1: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#938F8D',
    width: 170,
    height: 50,
    marginLeft: 5,
    marginTop: 10,
    borderRadius: 50
  },
  Active1: {
    alignItems: 'center',
    backgroundColor: '#FA9A5B',
    borderColor: 'orange',
    width: 170,
    height: 50,
    marginTop: 10,
    borderWidth: 1,
    marginLeft: 5,
    borderRadius: 50,
    justifyContent: 'center',
  },

  activetext: {
    fontSize: 20,
    color: '#fff'
  },
  inactivetext: {
    fontSize: 20,
    color: '#938F8D'
  }
});

export default Filter;