import * as commonTypes from '../constants'


export function setIsTemperatureModeCelsius( payload: { isTemperatureModeCelsius: boolean } ) {
  return {
    type: commonTypes.SET_IS_TEMPERATURE_MODE_CELSIUS,
    payload
  }
}
