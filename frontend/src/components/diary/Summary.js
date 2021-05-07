import React from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'

import { connect } from 'react-redux'

import ActionCreator from '../../store/actions'



class Summary extends React.Component {



  render() {

    return(
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View style={styles.dateContainer}>
          <Text style={styles.textStyle}> 2021년 04월 20일 ~ 2021년 04월 25일 </Text>
        </View>

        <View style={styles.mapContainer}>
          <Text>
            지도보여주는 영역
          </Text>
        </View>

        <View style={styles.summaryContainer}>
          <Text>
            줄거리 보여주는 영역
          </Text>
        </View>

        <View style={styles.bookContainer}>
          <Text>
            가계부 보여주는구역
          </Text>
        </View>
      </ScrollView>
    )

  }
}

const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  dateContainer: {
    backgroundColor: 'red',
    height: screenHeight/8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapContainer: {
    backgroundColor: 'skyblue',
    height: 270
  },
  summaryContainer: {
    backgroundColor: 'green',
    height: 700,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bookContainer: {
    backgroundColor: 'pink',
    height: 700
  },
  textStyle: {
    fontFamily: 'RIDIBatang',
    fontSize: 20,
  }
})


function mapStateToProps(state) {

  return {
    selectedPictures: state.pictureRd.pictures,
    todayDate: state.accountRd.todayTravel.todayDate,
    mode: state.pictureRd.mode
  };
}

function mapDispatchToProps(dispatch) {
  return {
    select: (picture) => {
      dispatch(ActionCreator.selectPicture(picture));
    },
    unselect: (picture_id) => {
      dispatch(ActionCreator.unselectPicture(picture_id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);