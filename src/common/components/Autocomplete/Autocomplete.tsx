import React, { useMemo } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import throttle from 'lodash/throttle'

import axios from 'axios'

import {
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'


const useStyles = makeStyles( ( theme: Theme ) =>
  createStyles( {
    icon: {
      color: theme.palette.text.secondary,
      marginRight: theme.spacing( 2 )
    }
  } )
)

interface PlaceType {}

const AccuAutocomplete: React.FC = () => {
  const classes = useStyles()
  const [inputValue, setInputValue] = React.useState( '' )
  const [options, setOptions] = React.useState<PlaceType[]>( [] )

  const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    setInputValue( event.target.value )
  }

  const fetch = useMemo(
    () => throttle( async ( input: string, cb: ( response: any ) => void ) => {
      try {
        const response = await axios.get( 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete', {
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
    } , 200 ), [],
  )

  React.useEffect( () => {
    let active = true


    if ( inputValue === '' ) {
      setOptions( [] )
      return
    }

    fetch( inputValue, ( response: any ) => {
      console.log( response )
      if ( active ) {
        setOptions( response.data || [] )
      }
    } )

    return () => {
      active = false
    }
  }, [fetch, inputValue] )

  console.log( options )

  return (
    <Autocomplete
      id="autocomplete"
      style={ { width: 300 } }
      getOptionLabel={ option => option.LocalizedName }
      filterOptions={ options => options }
      options={ options }
      autoComplete
      includeInputInList
      freeSolo
      disableOpenOnFocus
      renderInput={ params => {
        console.log( params )
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
  )
}

export default AccuAutocomplete
