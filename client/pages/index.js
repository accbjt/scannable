import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  location: {
    color: 'white',
    marginRight: theme.spacing(20),
  },
}));

export default function Index() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [location, setLocation] = React.useState('Los Angeles');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setLocation(e.target.innerText);
  };

  return (
    <Container disableGutters={true} className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Scannable
          </Typography>

          <Button className={classes.location} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            {location}
            <KeyboardArrowDownIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Los Angeles</MenuItem>
            <MenuItem onClick={handleClose}>Chicago</MenuItem>
          </Menu>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
