import { createInstance } from "./index.js"

const instance = createInstance()


function getRecordList() {
    return instance.get("records/total")
  }
  

function login() {

  return instance.get("customLogin")

}

function startTrip( title ) {

  const titleForm = {
    'title': title
  }

  return instance.post("records/startTrip",{},{ params: titleForm})
}

function startDay( rec_id ) {

  const recForm = {
    "Record_id" : rec_id
  }

  return instance.post("records/startDay",{},{ params: recForm})
}

function endDay() {

  return instance.post("records/dayEnd")
  
}

function changeStatus( status ) {
  const statusForm = {
    'status': status
  }

  console.log(statusForm)

  return instance.post("change/travelingState", {}, { params: statusForm})

}

function getTripInfo( rec_id ) {

  const recForm = {
    "Record_id" : rec_id
  }

  console.log("여행정보받아오기 axios", recForm)

  return instance.get("records/tripinfo", { params : recForm })

}

export { login, getRecordList, startTrip, changeStatus, getTripInfo, startDay, endDay }
