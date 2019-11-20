import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import WeatherDetails from './components/WeatherDetails'

import throttle from 'lodash/throttle'

import {
  getCurrentLocation,
  setCurrentLocation,
  getForecast,
  getConditions,
  clear
} from './actions'

import { api } from '../config/api'

import axios from 'axios'

import {
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'


const defaultLocation = { LocalizedName: 'Tel Aviv', Key: 215854 }

const useStyles = makeStyles( ( theme: Theme ) =>
  createStyles( {
    detailsRoot: {
      flexGrow: 1
    },
    autocompleteContainer: {
      paddingTop: theme.spacing( 3 ),
      paddingBottom: theme.spacing( 3 )
    },
    icon: {
      color: theme.palette.text.secondary,
      marginRight: theme.spacing( 2 )
    }
  } )
)

interface PlaceType {}

const Details: React.FC = () => {
  const classes = useStyles()
  const [inputValue, setInputValue] = React.useState( '' )
  const [options, setOptions] = React.useState<PlaceType[]>( [] )
  const {
    isTemperatureModeCelsius,
    currentLocation,
    forecast,
    conditions
  } = useSelector( ( { weatherDetails, common }: any ) => ( {
    isTemperatureModeCelsius: common.isTemperatureModeCelsius,
    currentLocation: weatherDetails.currentLocation,
    forecast: weatherDetails.forecast,
    conditions: weatherDetails.conditions
  } ) )
  // const forecast = useSelector( ( { weatherDetails }: any ) => weatherDetails.forecast )
  // const conditions = useSelector( ( { weatherDetails }: any ) => weatherDetails.conditions )
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect( () => {
    if ( location.state ) {
      dispatch( setCurrentLocation( location.state ) )
      dispatch( getForecast( { key: location.state.Key }, { isTemperatureModeCelsius } ) )
      dispatch( getConditions( { key: location.state.Key }, { isTemperatureModeCelsius } ) )
    } else {
      dispatch( getCurrentLocation( { key: defaultLocation.Key }, { isTemperatureModeCelsius } ) )
    }
  }, [] )

  useEffect( () => {
    let active = true

    const fetch = throttle( async ( input: string, cb: ( response: any ) => void ) => {
      try {
        const response = await axios.get( api.autocomplete, {
          params: {
            apikey: process.env.REACT_APP_ACCU_WEATHER_KEY,
            q: input,
            language: 'en-us'
          }
        } )
        cb( response )
      } catch ( e ) {
        console.log( e )
      }
    }, 200 )

    if ( inputValue === '' ) {
      setOptions( [] )
      return
    }

    fetch( inputValue, ( response: any ) => {
      if ( active ) {
        setOptions( response.data || [] )
      }
    } )

    return () => {
      active = false
    }
  }, [inputValue] )

  const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    setInputValue( event.target.value )
  }

  const handleCityAccept = ( event: any, option: any ): void => {
    if ( option ) {
      dispatch( setCurrentLocation( option ) )
      dispatch( getForecast( { key: option.Key }, { isTemperatureModeCelsius } ) )
      dispatch( getConditions( { key: option.Key }, { isTemperatureModeCelsius } ) )
    } else {
      dispatch( clear() )
    }
  }

  return (
    <Grid container className={ classes.detailsRoot } justify="center">
      <Grid className={ classes.autocompleteContainer } item xs={ 10 }>
        <Autocomplete
          id="autocomplete"
          defaultValue={ location.state || defaultLocation }
          getOptionLabel={ option => option.LocalizedName }
          filterOptions={ options => options }
          options={ options }
          autoComplete
          includeInputInList
          freeSolo
          disableOpenOnFocus
          onChange={ handleCityAccept }
          renderInput={ params => {
            return (
              <TextField
                { ...params }
                label="Add a location"
                variant="outlined"
                fullWidth
                onChange={ handleChange }
              />
            )
          } }
          renderOption={ option => {
            return (
              <Grid container alignItems="center">
                <Grid item>
                  <LocationOnIcon className={ classes.icon } />
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" color="textSecondary">
                    { option.LocalizedName }
                  </Typography>
                </Grid>
              </Grid>
            )
          } }
        />
      </Grid>
      {
        currentLocation.data && forecast.data && conditions.data ? (
          <Grid item xs={ 10 }>
            <WeatherDetails
              currentLocation={ currentLocation.data }
              forecast={ forecast.data }
              conditions={ conditions.data }
              isTemperatureModeCelsius={ isTemperatureModeCelsius }
            />
          </Grid>
        ) : null
      }
    </Grid>
  )
}

export default Details
