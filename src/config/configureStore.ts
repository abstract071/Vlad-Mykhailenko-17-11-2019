import {
  createStore,
  applyMiddleware
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'


import rootReducer from './combineReducers'
import middlewares from './combineMiddlewares'


export function configureStore ( initialState = {} ) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools( applyMiddleware( ...middlewares ) )
  )
}
