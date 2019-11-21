import React from 'react'
import { useHistory } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import {
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'

import iconRefs from '../../../accuIcons'


const useStyles = makeStyles( ( theme: Theme ) =>
  createStyles( {
    favoriteCard: {
      width: 150,
      height: 200,
      margin: theme.spacing( 1 ),
      cursor: 'pointer',
      justifyContent: 'center'
    },
    favoriteCardContent: {
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

const FavoriteCard: React.FC<any> = ( { conditions, isTemperatureModeCelsius }: any ) => {
  const classes = useStyles()
  const history = useHistory()

  const handleFavoriteCardClick = () => {
    history.push( '/', conditions )
  }

  return (
    <Card className={ classes.favoriteCard } onClick={ handleFavoriteCardClick }>
      <CardContent className={ classes.favoriteCardContent }>
        <Typography variant="h6">
          { conditions.LocalizedName }
        </Typography>
        <CardMedia
          className={ classes.cardMedia }
          component="img"
          alt="Some img"
          // @ts-ignore
          image={ iconRefs[conditions.WeatherIcon] }
          title="Some img"
        />
        <Typography variant="body2" color="textSecondary" component="p">
          {
            isTemperatureModeCelsius
              ? `${conditions.Temperature.Metric.Value} C`
              : `${conditions.Temperature.Metric.ValueF} F`
          }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          { conditions.WeatherText }
        </Typography>
      </CardContent>
    </Card>
  )
}

export default FavoriteCard
