import * as commonTypes from '../constants'


type StateType = {
  isTemperatureModeCelsius: boolean
}

const INITIAL_STATE = {
  isTemperatureModeCelsius: true
}

type ActionType = {
  type: string
  payload: {
    isTemperatureModeCelsius: boolean
  }
}

export const commonReducer = ( state: StateType = INITIAL_STATE, action: ActionType ): StateType => {
  switch ( action.type ) {
    case commonTypes.SET_IS_TEMPERATURE_MODE_CELSIUS:
      return {
        ...state,
        isTemperatureModeCelsius: action.payload.isTemperatureModeCelsius
      }
    default:
      return state
  }
}
