import { all } from 'redux-saga/effects'

import xxxSagaWatchers from '../details/sagas'


export default function* rootSaga() {
  yield all( [
    ...xxxSagaWatchers
  ] )
}
