import React from 'react'
import { Link } from 'react-router-dom'
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles( ( theme: Theme ) =>
  createStyles( {
    headerRoot: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing( 2 )
    },
    title: {
      flexGrow: 1
    }
  } ),
)

const Header: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={ classes.headerRoot }>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={ classes.title }>
            Herolo Weather Task
          </Typography>
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
