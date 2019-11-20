import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import moment from 'moment'

import iconRefs from '../../../accuIcons'

import {
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'


const useStyles = makeStyles( ( theme: Theme ) =>
  createStyles( {
    dailyForecastCardContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: theme.spacing( 2 ),
      '&:last-child': {
        paddingBottom: theme.spacing( 2 )
      }
    },
    cardMedia: {
      width: 70,
      height: 70
    }
  } )
)

const DailyWeatherCard: React.FC<any> = ( { forecast, isTemperatureModeCelsius }: any ) => {
  const classes = useStyles()

  return (
    <Card>
      <CardContent className={ classes.dailyForecastCardContent }>
        <Typography variant="h6">
          { moment( forecast.Date ).format( 'ddd' ) }
        </Typography>
        <CardMedia
          className={ classes.cardMedia }
          component="img"
          alt="Some img"
          // @ts-ignore
          image={ iconRefs[forecast.Day.Icon] }
          title="Some img"
        />
        <Typography variant="body2" color="textSecondary" component="p">
          { forecast.Day.IconPhrase }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {
            isTemperatureModeCelsius
              ? `${forecast.Temperature.Minimum.Value} - ${forecast.Temperature.Maximum.Value} C`
              : `${forecast.Temperature.Minimum.ValueF} - ${forecast.Temperature.Maximum.ValueF} F`
          }
        </Typography>
      </CardContent>
    </Card>
  )
}

export default DailyWeatherCard
