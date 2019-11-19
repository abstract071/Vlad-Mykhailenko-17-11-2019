import { combineReducers } from 'redux'

import { weatherDetailsReducer } from '../details/reducers'
import { favoritesReducer } from '../favorites/reducers'


export default combineReducers( {
  weatherDetails: weatherDetailsReducer,
  favorites: favoritesReducer
} )
