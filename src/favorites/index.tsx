import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

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

  return (
    <div>

      </div>
  )
}

export default WeatherDetails
