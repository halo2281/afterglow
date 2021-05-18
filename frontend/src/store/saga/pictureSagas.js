import { takeLatest, put, call } from 'redux-saga/effects';
import { upload } from '../../api/picture'

export function* savePictureAsync(action) {
  try {

    for ( var picture of action.payload) {
      const form = new FormData()
      const name = picture.filename;
      const [, type] = name.split(".");
      form.append('file',{
        name,
        type: picture.type, 
        uri: picture.uri
      })

      const sendData= {
        "rr_id" : picture.rr_id,
        picture : form
      }
      const { status,data } = yield call(upload, sendData)
      console.log("사진 저장 응답", status)
    }
  } catch (error) {
    console.log("사진 저장 에러", error)
  }
}

export const pictureSagas = [
  takeLatest('SAVE_PICTURE_ASYNC', savePictureAsync),
]