import React from 'react'
import { View, TouchableOpacity, Text, Button, StyleSheet } from 'react-native'

import { createStackNavigator, CardStyleInterpolators, HeaderBackButton} from '@react-navigation/stack' 
import { DrawerActions, useNavigation, CommonActions } from '@react-navigation/native'
import { connect } from 'react-redux'

import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/account/Login';
import HomeScreen from './screens/Home';
import OnTravelMain from './screens/onTravel/OnTravelMain';
import SettingsMain from './screens/settingss/SettingsMain';
import SingleTravelHistory from './screens/travelHistory/SingleTravelHistory';
import SavePictures from './screens/common/SavePictures';
import SinglePicture from './screens/common/SinglePicture';
import ShowPictures from './screens/common/ShowPictures';
import SlideShow from './screens/common/SlideShow';
import EndTravelMain from './screens/endTravel/EndTravelMain';


import ActionCreator from './store/actions'
import SettingsNotice from './screens/settingss/SettingsNotice';
import SettingsContact from './screens/settingss/SettingsContact';
import SettingsLicense from './screens/settingss/SettingsLicense';
import SettingsTou from './screens/settingss/SettingsTou';
import SettingsTutorial from './screens/settingss/SettingsTutorial';
import SettingsProfile from './screens/settingss/SettingsProfile';

const Stack = createStackNavigator();

const MenuBar = () => {
  const navigation = useNavigation();

  return(
    <View style={{flexDirection: 'row', paddingRight: 15}}>
      <TouchableOpacity 
        onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}
      >
        <Ionicons name={'menu'} size={20} style={{ color: "black"}}/>
      </TouchableOpacity>
    </View>

  )
}

const SavePicture = (props) => {

  const navigation = useNavigation();
  // const amount = 3
  const amount = props.selectedPictures.length
  const mode = props.mode
  const status = props.travelStatus
  const dr_id = props.dr_id
  const uploadPicture = async () => {
    if (status === "dayEndd") {
      await props.changeStatus('dayEnd')
    } else if (status === "travelEndd") {
      await props.changeStatus('travelEnd')
    }
    
    await props.endDay({ "dr_id": dr_id, "count": props.pictureCount })
    await props.savePictures(props.selectedPictures)
    await props.getRecordListReq()
    await navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home' },
          { name: 'EndTravelMain'},
        ]
      })
    )

  }

  if ( mode === "save" ) {
    return(
      <View style={{flexDirection: 'row', paddingRight: 15}}>
        <TouchableOpacity 
          onPress={()=> uploadPicture() }
        >
          <Text>{amount} ??????</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return(
      null
      // <View style={{flexDirection: 'row', paddingRight: 15}}>
      //   { mode === "look" ? 
      //     <TouchableOpacity
      //       onPress={()=> {
      //         props.modePicture('share')
      //       }}
      //     >
      //       <Text>????????????</Text>
      //     </TouchableOpacity> :
      //     <TouchableOpacity
      //       onPress={()=> {
      //         props.modePicture('look')
      //       }}
      //     >
      //       <Text>{amount} ??????</Text>
      //     </TouchableOpacity>  
      //   }
      // </View>
    )
  }
}

const initialRouteName = (isLogin) => {

  if (isLogin) {
    return "Home"
  } else {
    return "Login"
  }
}

const StackComponent = (props) => {

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName(props.isLogin)}
      screenOptions = {{
        headerRight: () => <MenuBar />,
        // gestureEnabled: true,
        // gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // cardStyle: {backgroundColor: '#85d7e4'},
        
      }}
      headerMode="float"
      animation="fade"
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={
          {
            headerShown: false
          }
        }
      />
      <Stack.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          title: <Text style={styles.screenText}>??????</Text>,
        }}
      />
      <Stack.Screen 
        name="OnTravelMain"
        component={OnTravelMain}
        options={{
          title: <Text style={styles.screenText}>?????? ???</Text>
        }}
      />
      <Stack.Screen
        name="SettingsMain"
        component={SettingsMain}
        options={{
          title: '??????',
          headerRight: false,
        }}
      />
      <Stack.Screen
        name="EndTravelMain"
        component={EndTravelMain}
        options={{
          title: <Text style={styles.screenText}>?????? ?????????</Text>,
          headerStyle:{ backgroundColor:'transparent'}
          
        }}
      />
      <Stack.Screen
        name="SingleTravelHistory"
        component={SingleTravelHistory}
        options={{
          title: <Text style={styles.screenText}>????????????</Text>
        }}
      />
      <Stack.Screen 
        name="SavePictures"
        component={SavePictures}
        options={{
          title: <Text style={styles.screenText}>?????? ??????</Text>,
          headerRight: () => <SavePicture {...props} />,
        }}
      />
      <Stack.Screen 
        name="SinglePicture"
        component={SinglePicture}
        options={{
          title: "",
          headerRight: () => <SavePicture {...props} />,
        }}
      />
      <Stack.Screen 
        name="ShowPictures"
        component={ShowPictures}
        options={{
          title: props.mode === 'look' ? <Text style={styles.screenText}>?????? ??????</Text> : <Text style={styles.screenText}>?????? ??????</Text>,
          headerRight: () => <SavePicture {...props} />,
        }}
      />
      <Stack.Screen 
        name="SlideShow"
        component={SlideShow}
        options={{
          headerRight: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          title: false,
          headerLeft: () => {
            return (
              <TouchableOpacity style={{marginLeft: 20}} onPress={() => {props.navigation.goBack()}}>
                <Ionicons name={"close-outline"} size={30} color={'white'}></Ionicons>
              </TouchableOpacity>
            )
          }
        }}
      />
      <Stack.Screen
        name="SettingsNotice"
        component={SettingsNotice}
        options={{
          title: '????????????',
          headerRight: false,
        }}
      />
      <Stack.Screen
        name="SettingsContact"
        component={SettingsContact}
        options={{
          title: '????????????',
          headerRight: false,
        }}
      />
      <Stack.Screen
        name="SettingsLicense"
        component={SettingsLicense}
        options={{
          title: '????????????',
          headerRight: false,
        }}
      />
      <Stack.Screen
        name="SettingsTou"
        component={SettingsTou}
        options={{
          title: '????????????',
          headerRight: false,
        }}
      />
      <Stack.Screen
        name="SettingsTutorial"
        component={SettingsTutorial}
        options={{
          title: '????????????',
          headerRight: false,
        }}
      />
      <Stack.Screen
        name="SettingsProfile"
        component={SettingsProfile}
        options={{
          title: '????????? ??? ????????????',
          headerRight: false,
        }}
      />
    </Stack.Navigator>
  )
}

const styles= StyleSheet.create({
  screenText: {fontFamily:'RIDIBatang', fontSize:20},
})


function mapStateToProps(state) {

  return {
    isLogin: state.accountRd.isLogin,
    user_nickname: state.accountRd.user.usr_nickname,
    selectedPictures: state.pictureRd.pictures,
    travelStatus: state.accountRd.travelStatus,
    mode: state.pictureRd.mode,
    dr_id: state.accountRd.todayTravel.dr_id,
    pictureCount: state.pictureRd.totalCount,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    savePictures: (selectedPictures) => {
      dispatch({
        type: "SAVE_PICTURE_ASYNC",
        payload: selectedPictures
      })
    },
    changeStatus: (status) => {
      dispatch({
        type: "CHANGE_STATUS_ASYNC",
        payload: status
      })
    },
    modePicture: (mode) => {
      dispatch(ActionCreator.modePicture(mode))
    },
    endDay: (data) => {
      dispatch({
        type: "END_DAY_ASYNC",
        payload: data
      })
    },
    getRecordListReq: () => {
      dispatch({
        type: 'GET_RECORD_LIST_ASYNC'
      })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StackComponent) 