import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import {
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'


const useStyles = makeStyles( ( theme: Theme ) =>
  createStyles( {
    favoriteCard: {
      margin: theme.spacing( 1 )
    },
    favoriteCardContent: {
      textAlign: 'center',
      padding: theme.spacing( 2 ),
      '&:last-child': {
        paddingBottom: theme.spacing( 2 )
      }
    }
  } )
)

const FavoriteCard: React.FC<any> = ( { conditions }: any ) => {
  const classes = useStyles()

  return (
    <Card className={ classes.favoriteCard }>
      <CardContent className={ classes.favoriteCardContent }>
        <Typography variant="h6">
          { conditions.locationName }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          { `${conditions.Temperature.Metric.Value} C` }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          { conditions.WeatherText }
        </Typography>
      </CardContent>
    </Card>
  )
}

export default FavoriteCard
