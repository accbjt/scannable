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

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

const data = [
  { year: '1950', population: 2.525 },
  { year: '1960', population: 3.018 },
  { year: '1970', population: 3.682 },
  { year: '1980', population: 4.440 },
  { year: '1990', population: 5.310 },
  { year: '2000', population: 6.127 },
  { year: '2010', population: 6.930 },
];

const getPath = (x, width, y, y1) => `M ${x} ${y1}
   L ${width + x} ${y1}
   L ${width + x} ${y + 30}
   L ${x} ${y + 30}
   Z`;

const labelStyle = { fill: '#BBDEFB' };

const BarWithLabel = ({
  arg, barWidth, maxBarWidth, val, startVal, color, value, style,
}) => {
  const width = maxBarWidth * barWidth;
  return (
    <React.Fragment>
      <path d={getPath(arg - width / 2, width, val, startVal)} fill={color} style={style} />
      <Chart.Label
        x={arg}
        y={(val + startVal) / 2}
        dominantBaseline="middle"
        textAnchor="middle"
        style={labelStyle}
      >
        {value}
      </Chart.Label>
    </React.Fragment>
  );
};

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <ArgumentAxis />

          <BarSeries
            valueField="population"
            argumentField="year"
            pointComponent={BarWithLabel}
          />
          <Title text="World population" />
          <Animation />
        </Chart>
      </Paper>
    );
  }
};

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

export default function Index() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [location, setLocation] = React.useState('Los Angeles');
  const [line, setLine] = React.useState('');
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setLocation(e.target.innerText);
  };

  const handleLineChange = (event) => {
    setLine(event.target.value);
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

      <Container>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">Select Line</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={line}
            onChange={handleLineChange}
            label="Select Line"
          >
            <MenuItem value="">Select Line</MenuItem>
            <MenuItem value="1">Line 1</MenuItem>
            <MenuItem value="2">Line 2</MenuItem>
            <MenuItem value="3">Line 3</MenuItem>
            <MenuItem value="4">Line 4</MenuItem>
            <MenuItem value="5">Line 5</MenuItem>
            <MenuItem value="6">Line 6</MenuItem>
            <MenuItem value="7">Line 7</MenuItem>
            <MenuItem value="8">Line 8</MenuItem>
          </Select>
        </FormControl>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Container>
        <Demo />
      </Container>
    </Container>
  );
}
