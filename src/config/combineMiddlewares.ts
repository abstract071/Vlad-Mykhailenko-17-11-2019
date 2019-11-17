import createSagaMiddleware from 'redux-saga'

import rootSaga from './combineSagas'


const sagaMiddleware = createSagaMiddleware()
let middlewares = [ sagaMiddleware ]

export const runSaga = () => sagaMiddleware.run( rootSaga )

export default middlewares
