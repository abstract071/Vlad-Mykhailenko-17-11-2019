import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import moment from 'moment'

import {
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'


const useStyles = makeStyles( ( theme: Theme ) =>
  createStyles( {
    dailyForecastCardContent: {
      textAlign: 'center',
      padding: theme.spacing( 2 ),
      '&:last-child': {
        paddingBottom: theme.spacing( 2 )
      }
    }
  } )
)

const DailyWeatherCard: React.FC<any> = ( { forecast }: any ) => {
  const classes = useStyles()

  return (
    <Card>
      <CardContent className={ classes.dailyForecastCardContent }>
        <Typography variant="h6">
          { moment( forecast.Date ).format( 'ddd' ) }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          { `${forecast.Temperature.Minimum.Value} - ${forecast.Temperature.Maximum.Value} C` }
        </Typography>
      </CardContent>
    </Card>
  )
}

export default DailyWeatherCard
