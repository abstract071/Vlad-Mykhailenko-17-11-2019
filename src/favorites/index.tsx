import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import FavoriteCard from './components/FavoriteCard'

import {
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'

import { getLocationsConditions } from './actions'


const useStyles = makeStyles( ( theme: Theme ) =>
  createStyles( {
    favoritesContainer: {
      flexGrow: 1,
      padding: theme.spacing( 2 )
    }
  } )
)

const Favorites: React.FC = () => {
  const classes = useStyles()
  const {
    isTemperatureModeCelsius,
    favorites
  } = useSelector( ( { favorites, common }: any ) => ( {
    isTemperatureModeCelsius: common.isTemperatureModeCelsius,
    favorites
  } ) )
  const dispatch = useDispatch()

  useEffect( () => {
    const getLocationsData = () => {
      const locationsData = localStorage.getItem( 'locationsData' )
      if ( locationsData ) {
        let parsedData: any[] = JSON.parse( locationsData )
        dispatch( getLocationsConditions( parsedData, { isTemperatureModeCelsius } ) )
      }
    }

    getLocationsData()
  }, [] )

  return (
    favorites.data ? (
      <Grid className={ classes.favoritesContainer } container justify="center">
        {
          favorites.data.map( ( conditions: any ) => (
            <FavoriteCard
              key={ conditions.LocalizedName }
              conditions={ conditions }
              isTemperatureModeCelsius={ isTemperatureModeCelsius }
            />
          ) )
        }
      </Grid>
    ) : null
  )
}

export default Favorites
