import * as weatherDetailsTypes from '../constants'


type StateType = {
  error: null | string
  isLoading: boolean
  data: any
}

const INITIAL_STATE = {
  error: null,
  isLoading: true,
  data: null
}

type ActionType = {
  type: string
  payload: any
}

export const conditionsReducer = ( state: StateType = INITIAL_STATE, action: ActionType ): StateType => {
  switch ( action.type ) {
    case weatherDetailsTypes.GET_CONDITIONS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case weatherDetailsTypes.GET_CONDITIONS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }
    case weatherDetailsTypes.GET_CONDITIONS_FAILURE:
      return {
        ...state,
        error: action.payload.detail
      }
    case weatherDetailsTypes.GET_CONDITIONS_FULFILL:
      return {
        ...state,
        isLoading: false
      }
    case weatherDetailsTypes.CLEAR:
      return {
        ...INITIAL_STATE
      }
    default:
      return state
  }
}
