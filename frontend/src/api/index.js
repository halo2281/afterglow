import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

import CookieManager from '@react-native-cookies/cookies'

const API_BASE_URL = "http://k4a105.p.ssafy.io:8080"


function createInstance() {

  const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json", 
    }
  })

  CookieManager.get("http://k4a105.p.ssafy.io:8080")
    .then((cookies) => {
      console.log(cookies)
      instance.defaults.headers["Cookies"] = cookies
    })


  return instance

}


function createInstancePicture() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })

  AsyncStorage.getItem('cookie', (err, result) => {
    instance.defaults.headers.Cookie = result
  })

  return instance
}

export { createInstance, createInstancePicture }