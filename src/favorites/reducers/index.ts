import * as favoritesTypes from '../constants'


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

export const favoritesReducer = ( state: StateType = INITIAL_STATE, action: ActionType ): StateType => {
  switch ( action.type ) {
    case favoritesTypes.GET_LOCATIONS_CONDITIONS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case favoritesTypes.GET_LOCATIONS_CONDITIONS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }
    case favoritesTypes.GET_LOCATIONS_CONDITIONS_FAILURE:
      return {
        ...state,
        error: action.payload.detail
      }
    case favoritesTypes.GET_LOCATIONS_CONDITIONS_FULFILL:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
