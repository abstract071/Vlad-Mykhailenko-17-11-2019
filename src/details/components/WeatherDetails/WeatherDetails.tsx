import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FavoriteIcon from '@material-ui/icons/Favorite'

import DailyWeatherCard from '../DailyWeatherCard'

import {
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'

import weatherImg from '../../../assets/weather.jpg'


const useStyles = makeStyles( ( theme: Theme ) =>
  createStyles( {
    weatherDetailsRoot: {
      minHeight: 300
    },
    weatherDetailsContainer: {
      height: '100%'
    },
    weatherDetailsGridItem: {
      padding: theme.spacing( 2 ),
      maxWidth: '100%'
    },
    cardRoot: {
      display: 'flex'
    },
    cardMedia: {
      width: 70,
      height: 70
    },
    cardContent: {
      padding: theme.spacing( 1 ),
      '&:last-child': {
        paddingBottom: theme.spacing( 1 )
      }
    }
  } )
)

const WeatherDetails: React.FC<any> = ( {
  currentLocation,
  forecast,
  conditions
}: any ) => {
  const classes = useStyles()

  const handleAddToFavoritesClick = () => {
    const locationsData = localStorage.getItem( 'locationsData' )
    const dataToSave = {
      locationName: currentLocation.LocalizedName,
      locationKey: currentLocation.Key
    }
    if ( locationsData ) {
      let parsedData: any[] = JSON.parse( locationsData )
      parsedData.push( dataToSave )
      localStorage.setItem( 'locationsData', JSON.stringify( parsedData ) )
    } else {
      localStorage.setItem( 'locationsData', JSON.stringify( [dataToSave] ) )
    }
  }

  return (
    <Paper className={ classes.weatherDetailsRoot }>
      <Grid className={ classes.weatherDetailsContainer } container direction="column">
        <Grid className={ classes.weatherDetailsGridItem } item container xs={ 3 } justify="space-between">
          <Card className={ classes.cardRoot }>
            <CardMedia
              className={ classes.cardMedia }
              component="img"
              alt="Some img"
              image={ weatherImg }
              title="Some img"
            />
            <CardContent className={ classes.cardContent }>
              <Typography variant="h6">
                { currentLocation.LocalizedName }
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                { `${conditions.Temperature.Metric.Value} C` }
              </Typography>
            </CardContent>
          </Card>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={ <FavoriteIcon /> }
              onClick={ handleAddToFavoritesClick }
            >
              Add to Favorites
            </Button>
          </Box>
        </Grid>
        <Grid className={ classes.weatherDetailsGridItem } item container xs={ 4 } justify="center" alignItems="center">
          <Typography variant="h3">
            { conditions.WeatherText }
          </Typography>
        </Grid>
        <Grid className={ classes.weatherDetailsGridItem } item container xs={ 5 } justify="space-around" alignItems="center">
          {
            forecast.map( ( dayForecast: any, index: number ) => (
              <DailyWeatherCard
                key={ `forecast_${index}` }
                forecast={ dayForecast }
              />
            ) )
          }
        </Grid>
      </Grid>
    </Paper>
  )
}

export default WeatherDetails
