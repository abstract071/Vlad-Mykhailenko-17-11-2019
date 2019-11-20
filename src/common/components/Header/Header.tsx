import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, LinkProps } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import IconButton from '@material-ui/core/IconButton'
import Brightness6TwoToneIcon from '@material-ui/icons/Brightness6TwoTone'
import AcUnitTwoToneIcon from '@material-ui/icons/AcUnitTwoTone'

import { setIsTemperatureModeCelsius } from '../../actions'

import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles'


const ForwardedLink = React.forwardRef<HTMLAnchorElement, LinkProps>( ( props, ref ) => (
  <Link innerRef={ ref } { ...props } />
) )

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
    },
    iconButton: {
      margin: theme.spacing( 0 ),
      '&:last-of-type': {
        marginRight: theme.spacing( 2 )
      }
    }
  } ),
)

const Header: React.FC = () => {
  const classes = useStyles()
  const isTemperatureModeCelsius = useSelector<any, any>( ( { common }: any ) => common.isTemperatureModeCelsius )
  const dispatch = useDispatch()

  const handleTemperatureModeChange = () => {
    dispatch( setIsTemperatureModeCelsius( { isTemperatureModeCelsius: !isTemperatureModeCelsius } ) )
  }

  return (
    <div className={ classes.headerRoot }>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={ classes.title }>
            Herolo Weather Task
          </Typography>
          <IconButton disabled className={ classes.iconButton }>
            <Brightness6TwoToneIcon />
          </IconButton>
          <IconButton
            className={ classes.iconButton }
            onClick={ handleTemperatureModeChange }
          >
            <AcUnitTwoToneIcon color={ 'secondary' } />
          </IconButton>
          <ButtonGroup
            variant="contained"
            color="primary"
            size="large"
          >
            <Button component={ ForwardedLink } to="/">
              Home
            </Button>
            <Button component={ ForwardedLink } to="/favorites">
              Favorites
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
