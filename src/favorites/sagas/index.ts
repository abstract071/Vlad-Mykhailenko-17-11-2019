import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects'
import axios from 'axios'

import { api } from '../../config/api'

import * as xxxTypes from '../constants'


export function* xxxSaga( action: any ) {
  try {
    yield put( { type: xxxTypes.XXX_REQUEST } )
    console.log( action )
    const response = yield call( axios.post, api.xxx, action.payload )
    console.log( response )
    yield put( { type: xxxTypes.XXX_SUCCESS, payload: response } )
  } catch ( error ) {
    if ( error.response ) {
      yield put( { type: xxxTypes.XXX_FAILURE, payload: error.response.data } )
    }
  } finally {
    yield put( { type: xxxTypes.XXX_FULFILL } )
  }
}

export function* watchxxxingSaga() {
  yield takeLatest( xxxTypes.XXX_TRIGGER, xxxSaga )
}

export default [
  watchxxxingSaga()
]
