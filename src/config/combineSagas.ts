import { all } from 'redux-saga/effects'

import weatherDetailsSagaWatchers from '../details/sagas'
import favoritesSagaWatchers from '../favorites/sagas'


export default function* rootSaga() {
  yield all( [
    ...weatherDetailsSagaWatchers,
    ...favoritesSagaWatchers
  ] )
}
