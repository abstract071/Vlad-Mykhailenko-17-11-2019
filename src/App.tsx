import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Link
} from 'react-router-dom'
import { Provider } from 'react-redux'

import { configureStore } from './config/configureStore'
import { runSaga } from './config/combineMiddlewares'
// import { RootErrorBoundary } from './common/components/RootErrorBoundary'

import Header from './common/components/Header'
import WeatherDetails from './details'
import Favorites from './favorites'

import './App.css'


const store = configureStore()
runSaga()

const App: React.FC = () => {
  return (
    <Router>
      <Provider store={ store }>
        <Header />
        { /*<RootErrorBoundary>*/ }
        <Switch>
          <Route exact path="/" component={ WeatherDetails } />
          <Route path="/favorites" component={ Favorites } />
        </Switch>
        { /*</RootErrorBoundary>*/ }
      </Provider>
    </Router>
  )
}

export default App
