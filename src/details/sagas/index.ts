import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects'
import axios from 'axios'

import { api } from '../../config/api'

import * as weatherDetailsTypes from '../constants'

import {
  getConditions,
  getForecast
} from '../actions'


export function* getCurrentLocationSaga( action: any ) {
  try {
    yield put( { type: weatherDetailsTypes.GET_CURRENT_LOCATION_REQUEST } )
    const config = {
      params: {
        apikey: process.env.REACT_APP_ACCU_WEATHER_KEY,
        language: 'en-us'
      }
    }
    const response = yield call( axios.get, api.locationByKey( action.payload.key ), config )
    yield put( { type: weatherDetailsTypes.GET_CURRENT_LOCATION_SUCCESS, payload: response.data } )

    yield put( getForecast( { key: response.data.Key } ) )
    yield put( getConditions( { key: response.data.Key } ) )
  } catch ( error ) {
    if ( error.response ) {
      yield put( { type: weatherDetailsTypes.GET_CURRENT_LOCATION_FAILURE, payload: error.response.data } )
    }
  } finally {
    yield put( { type: weatherDetailsTypes.GET_CURRENT_LOCATION_FULFILL } )
  }
}

export function* watchGettingCurrentLocationSaga() {
  yield takeLatest( weatherDetailsTypes.GET_CURRENT_LOCATION_TRIGGER, getCurrentLocationSaga )
}

export function* getForecastSaga( action: any ) {
  try {
    yield put( { type: weatherDetailsTypes.GET_FORECAST_REQUEST } )
    const config = {
      params: {
        apikey: process.env.REACT_APP_ACCU_WEATHER_KEY,
        language: 'en-us',
        metric: true
      }
    }
    const response = yield call( axios.get, api.forecast5days( action.payload.key ), config )
    yield put( { type: weatherDetailsTypes.GET_FORECAST_SUCCESS, payload: response.data } )
  } catch ( error ) {
    if ( error.response ) {
      yield put( { type: weatherDetailsTypes.GET_FORECAST_FAILURE, payload: error.response.data } )
    }
  } finally {
    yield put( { type: weatherDetailsTypes.GET_FORECAST_FULFILL } )
  }
}

export function* watchGettingForecastSaga() {
  yield takeLatest( weatherDetailsTypes.GET_FORECAST_TRIGGER, getForecastSaga )
}

export function* getConditionsSaga( action: any ) {
  try {
    yield put( { type: weatherDetailsTypes.GET_CONDITIONS_REQUEST } )
    const config = {
      params: {
        apikey: process.env.REACT_APP_ACCU_WEATHER_KEY,
        language: 'en-us'
      }
    }
    const response = yield call( axios.get, api.conditions( action.payload.key ), config )
    yield put( { type: weatherDetailsTypes.GET_CONDITIONS_SUCCESS, payload: response.data[0] } )
  } catch ( error ) {
    if ( error.response ) {
      yield put( { type: weatherDetailsTypes.GET_CONDITIONS_FAILURE, payload: error.response.data } )
    }
  } finally {
    yield put( { type: weatherDetailsTypes.GET_CONDITIONS_FULFILL } )
  }
}

export function* watchGettingConditionsSaga() {
  yield takeLatest( weatherDetailsTypes.GET_CONDITIONS_TRIGGER, getConditionsSaga )
}

export default [
  watchGettingCurrentLocationSaga(),
  watchGettingForecastSaga(),
  watchGettingConditionsSaga()
]
