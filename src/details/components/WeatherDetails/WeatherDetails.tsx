import React from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import Typography from '@material-ui/core/Typography'

import { xxx } from '../../actions'

import {
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'


const useStyles = makeStyles( ( theme: Theme ) =>
  createStyles( {

  } )
)

const WeatherDetails: React.FC = () => {
  const classes = useStyles()
  const xxxState = useSelector( ( { auth }: any ) => auth )
  console.log( xxxState )
  const dispatch = useDispatch()

  return (
    <div>

    </div>
  )
}

export default WeatherDetails
