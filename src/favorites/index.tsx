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
  const favoritesState = useSelector( ( { favorites }: any ) => favorites )
  const dispatch = useDispatch()

  useEffect( () => {
    const getLocationsData = () => {
      const locationsData = localStorage.getItem( 'locationsData' )
      if ( locationsData ) {
        let parsedData: any[] = JSON.parse( locationsData )
        dispatch( getLocationsConditions( parsedData ) )
      }
    }

    getLocationsData()
  }, [] )

  return (
    favoritesState.data ? (
      <Grid className={ classes.favoritesContainer } container justify="center">
        {
          favoritesState.data.map( ( conditions: any ) => (
            <FavoriteCard
              key={ conditions.locationName }
              conditions={ conditions }
            />
          ) )
        }
      </Grid>
    ) : null
  )
}

export default Favorites
