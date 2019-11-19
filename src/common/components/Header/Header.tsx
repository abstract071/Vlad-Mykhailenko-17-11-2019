import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import IconButton from '@material-ui/core/IconButton'
import Brightness6TwoToneIcon from '@material-ui/icons/Brightness6TwoTone'
import AcUnitTwoToneIcon from '@material-ui/icons/AcUnitTwoTone'

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
      marginRight: theme.spacing( 1 )
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
          <IconButton disabled className={ classes.iconButton }>
            <Brightness6TwoToneIcon />
          </IconButton>
          <IconButton disabled className={ classes.iconButton }>
            <AcUnitTwoToneIcon />
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
