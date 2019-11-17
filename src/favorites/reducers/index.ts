import * as xxxTypes from '../constants'


type StateType = {
  error: null | string
  isLoading: boolean
  data: null | string
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

export const xxxReducer = ( state: StateType = INITIAL_STATE, action: ActionType ): StateType => {
  switch ( action.type ) {
    case xxxTypes.XXX_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case xxxTypes.XXX_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: null
      }
    case xxxTypes.XXX_FAILURE:
      return {
        ...state,
        error: action.payload.detail
      }
    case xxxTypes.XXX_FULFILL:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
