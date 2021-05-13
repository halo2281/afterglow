import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import MoneyBook from '../../components/book/MoneyBook'
import AddMoneyItem from '../../components/book/AddMoneyItem'
import PlaceList from '../../components/PlaceList'
import RecPlaceList from '../../components/RecPlaceList'
import ModalDayFinish from '../../components/modal/ModalDayFinish'
import PinClickPage from '../../components/PinClickPage'

import { connect } from 'react-redux'
import ActionCreator from '../.././store/actions'
import { createIconSetFromFontello } from 'react-native-vector-icons';
import MapView from 'react-native-maps';



class OnTravelMain extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: '',
      passedTime: '',
      clickPin: false,
    }
  }

  allPictures = () => {
    this.props.navigation.navigate('ShowPictures');
    this.props.modePicture('look');
    this.props.emptyList();
  }

  selectPinFunc = (val) => {
    this.setState({ clickPin: val });
    console.log("핀상태",this.state.clickPin )
  }


  dateForm(date) {
    if ( date !== undefined) {
      const tempDate = date.split('-')
      return tempDate[0] + '년 ' +tempDate[1] + '월 ' + tempDate[2] + '일 '
    } else {
      return null
    }
  }

  timeForm(time) {
    if (time !== null) {
      const tempTime = time.split(':')
      const hours = Number(tempTime[0])
      const mins = Number(tempTime[1])
    
      return hours > 0 ? ( mins > 0 ? hours + '시간 ' + mins + '분' : hours+'시간') :
              ( mins > 0 ? mins + '분' : '여행을 시작했습니다.' )
    } else {
      return '여행을 시작했습니다.'
    }
  }
  
  render() {

    return (
      <ScrollView style={styles.container}>
        <Text>
          {this.dateForm(this.props.todayTravel.dr_date)}, {this.timeForm(this.props.todayTravel.dr_time_spent)}
        </Text>
        {/* <MapView
              style={{ flex:1 }}
              initialRegion = {{
                  latitude: lat,
                  longitude: lon,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1

              }}
          >

        </MapView> */}
        <ModalDayFinish navigation={this.props.navigation} /> 
        <Button title={"핀을 눌렀을 때"} onPress={() => this.selectPinFunc(true)}/>
        <Button title={"사진 모아보기"} onPress={this.allPictures}/>
        { this.state.clickPin
        ? <PinClickPage selectPinFunc={this.selectPinFunc}/>
        : 
          <View>
            <Text style={styles.titleStyle}>
              {this.props.user_nickname}님은, "{this.props.travelingName}" 여행 중</Text>

            <Text style={styles.titleStyle}>{this.props.user_nickname}님이 방문한 장소 </Text>
            <PlaceList />
            <Text style={styles.titleStyle}>오늘의 지출</Text>
            <MoneyBook />
            <AddMoneyItem />
            <Text style={styles.titleStyle}>주변에 이런 곳이 있어요!</Text>
            <RecPlaceList />
          </View>
      }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  titleStyle: {
    fontSize: 20, marginLeft: 20, marginTop: 30, fontFamily:'RIDIBatang'

  }
})


function mapStateToProps(state) {

  return {
    isLogin: state.accountRd.isLogin,
    user_nickname: state.accountRd.user.usr_nickname,
    travelingName: state.accountRd.travelingName,
    travelStatus: state.accountRd.travelStatus,
    todayTravel: state.accountRd.todayTravel,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeStatus: (status) => {
      dispatch({
        type: "CHANGE_STATUS_ASYNC",
        payload: status
      })
    },
    getCurrentInfo: (dr_id)=>{
      dispatch({
        type: "GET_CURRENT_INFO_ASYNC",
        payload: dr_id
      })
    },
    modePicture: (mode) => {
      dispatch(ActionCreator.modePicture(mode))
    },
    emptyList: () => {
      dispatch(ActionCreator.emptyList())
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(OnTravelMain) 