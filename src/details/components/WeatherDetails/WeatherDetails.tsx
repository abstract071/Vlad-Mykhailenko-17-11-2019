import React, { useState, useEffect } from 'react'
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

import iconRefs from '../../../accuIcons'


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
    },
    dailyForecastItem: {
      border: 'none',
      borderRight: '1px solid lightgray',
      '&:first-of-type': {
        borderLeft: '1px solid lightgray'
      }
    }
  } )
)

const WeatherDetails: React.FC<any> = ( {
  currentLocation,
  forecast,
  conditions,
  isTemperatureModeCelsius
}: any ) => {
  const classes = useStyles()
  const [isFavorited, setIsFavorited] = useState( false )

  useEffect( () => {
    const locationsData = localStorage.getItem( 'locationsData' )
    if ( locationsData ) {
      let parsedData: any[] = JSON.parse( locationsData )
      setIsFavorited( parsedData.some( ( location: any ) => currentLocation.LocalizedName === location.locationName ) )
    }
  }, [currentLocation] )

  const handleAddToFavoritesClick = () => {
    const locationsData = localStorage.getItem( 'locationsData' )
    const dataToSave = {
      locationName: currentLocation.LocalizedName,
      locationKey: currentLocation.Key
    }
    if ( locationsData ) {
      let parsedData: any[] = JSON.parse( locationsData )
      if ( isFavorited ) {
        parsedData.splice( parsedData.findIndex( ( location: any ) => currentLocation.LocalizedName === location.locationName ), 1 )
        setIsFavorited( false )
      } else {
        parsedData.push( dataToSave )
        setIsFavorited( true )
      }
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
              // @ts-ignore
              image={ iconRefs[conditions.WeatherIcon] }
              title="Some img"
            />
            <CardContent className={ classes.cardContent }>
              <Typography variant="h6">
                { currentLocation.LocalizedName }
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {
                  isTemperatureModeCelsius
                    ? `${conditions.Temperature.Metric.Value} C`
                    : `${conditions.Temperature.Metric.ValueF} F`
                }
              </Typography>
            </CardContent>
          </Card>
          <Box>
            <Button
              variant="contained"
              color={ isFavorited ? 'inherit' : 'secondary' }
              size="large"
              startIcon={ <FavoriteIcon color={ isFavorited ? 'disabled' : 'inherit' } /> }
              onClick={ handleAddToFavoritesClick }
            >
              { isFavorited ? 'Remove from Favorites' : 'Add to Favorites' }
            </Button>
          </Box>
        </Grid>
        <Grid className={ classes.weatherDetailsGridItem } item container xs={ 4 } justify="center" alignItems="center">
          <Typography variant="h3">
            { conditions.WeatherText }
          </Typography>
        </Grid>
        <Grid className={ classes.weatherDetailsGridItem } item container xs={ 5 } justify="center">
          {
            forecast.map( ( dayForecast: any, index: number ) => (
              <Grid className={ classes.dailyForecastItem } item xs={ 2 } key={ `forecast_${index}` }>
                <DailyWeatherCard
                  forecast={ dayForecast }
                  isTemperatureModeCelsius={ isTemperatureModeCelsius }
                />
              </Grid>
            ) )
          }
        </Grid>
      </Grid>
    </Paper>
  )
}

export default WeatherDetails
