import {
  put,
  call,
  all,
  takeLatest
} from 'redux-saga/effects'
import axios from 'axios'

import { api } from '../../config/api'

import * as favoritesTypes from '../constants'


export function* getLocationsConditionsSaga( action: any ) {
  try {
    yield put( { type: favoritesTypes.GET_LOCATIONS_CONDITIONS_REQUEST } )
    const config = {
      params: {
        apikey: process.env.REACT_APP_ACCU_WEATHER_KEY,
        language: 'en-us'
      }
    }
    const allArgs = action.payload.reduce( ( acc: any, cur: any ) => ( { ...acc, [cur.locationName]: call( axios.get, api.conditions( cur.locationKey ), config ) } ), {} )
    const responses = yield all( allArgs )
    const transformedResponses = action.payload.map( ( { locationName, locationKey }: any ) => ( { LocalizedName: locationName, Key: locationKey, ...responses[locationName].data[0] } ) )
    yield put( { type: favoritesTypes.GET_LOCATIONS_CONDITIONS_SUCCESS, payload: transformedResponses.map( ( conditions: any ) => ( {
      ...conditions,
      Temperature: {
        Metric: {
          ...conditions.Temperature.Metric,
          Value: Math.round( conditions.Temperature.Metric.Value ),
          ValueF: Math.round( ( conditions.Temperature.Metric.Value * 1.8 ) + 32 )
        }
      }
    } ) ) } )
  } catch ( error ) {
    if ( error.response ) {
      yield put( { type: favoritesTypes.GET_LOCATIONS_CONDITIONS_FAILURE, payload: error.response.data } )
    }
  } finally {
    yield put( { type: favoritesTypes.GET_LOCATIONS_CONDITIONS_FULFILL } )
  }
}

export function* watchGettingLocationsConditionsSaga() {
  yield takeLatest( favoritesTypes.GET_LOCATIONS_CONDITIONS_TRIGGER, getLocationsConditionsSaga )
}

export default [
  watchGettingLocationsConditionsSaga()
]
