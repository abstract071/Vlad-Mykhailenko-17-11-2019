import { combineReducers } from 'redux'

import { commonReducer } from '../common/reducers'
import { weatherDetailsReducer } from '../details/reducers'
import { favoritesReducer } from '../favorites/reducers'


export default combineReducers( {
  common: commonReducer,
  weatherDetails: weatherDetailsReducer,
  favorites: favoritesReducer
} )
