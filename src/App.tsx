import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { CssBaseline } from '@material-ui/core'

import { configureStore } from './config/configureStore'
import { runSaga } from './config/combineMiddlewares'

import Header from './common/components/Header'
import Details from './details'
import Favorites from './favorites'

import './App.css'


const store = configureStore()
runSaga()

const App: React.FC = () => {
  return (
    <Router>
      <Provider store={ store }>
        <CssBaseline />
        <Header />
        <Switch>
          <Route exact path="/" component={ Details } />
          <Route path="/favorites" component={ Favorites } />
        </Switch>
      </Provider>
    </Router>
  )
}

export default App
