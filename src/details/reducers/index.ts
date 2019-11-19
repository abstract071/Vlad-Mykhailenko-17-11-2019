import { combineReducers } from 'redux'

import { currentLocationReducer } from './currentLocation'
import { forecastReducer } from './forecast'
import { conditionsReducer } from './conditions'


export const weatherDetailsReducer = combineReducers( {
  currentLocation: currentLocationReducer,
  forecast: forecastReducer,
  conditions: conditionsReducer
} )
