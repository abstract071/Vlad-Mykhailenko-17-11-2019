import * as weatherDetailsTypes from '../constants'


export function getCurrentLocation( payload: any ) {
  return {
    type: weatherDetailsTypes.GET_CURRENT_LOCATION_TRIGGER,
    payload
  }
}

export function setCurrentLocation( payload: any ) {
  return {
    type: weatherDetailsTypes.SET_CURRENT_LOCATION,
    payload
  }
}

export function getForecast( payload: any ) {
  return {
    type: weatherDetailsTypes.GET_FORECAST_TRIGGER,
    payload
  }
}

export function getConditions( payload: any ) {
  return {
    type: weatherDetailsTypes.GET_CONDITIONS_TRIGGER,
    payload
  }
}

export function clear() {
  return {
    type: weatherDetailsTypes.CLEAR
  }
}
