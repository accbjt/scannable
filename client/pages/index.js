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
import TextField from '@material-ui/core/TextField';

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

import {
  getLineProductScansByDateAndHour,
  getCurrentProductScansByDateAndHour,
} from '../src/graphql/queries';

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider, Subscription } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { PRODUCT_SCAN_SUBSCRIPTION } from '../src/graphql/subscriptions';
import { CREATE_PRODUCT_SCAN } from '../src/graphql/mutations';

const wsLink = process.browser ? new WebSocketLink({ // if you instantiate in the server, the error will be thrown
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
}) : null;

const httplink = new HttpLink({
	uri: 'http://localhost:4000/',
});

const link = process.browser ? split( //only create the split in the browser
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httplink,
) : httplink;

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

const quota = {
  high: 1000,
  medium: 700,
  low: 150,
};

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
      currentLineID: '',
      data: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lineID !== this.props.lineID) {
      this.fetchProductScans(this.props.lineID);
    }
  }

  fetchProductScans(id) {
    if (id) {
      getLineProductScansByDateAndHour(parseInt(id)).then(data => {
        this.setState({
          currentLineID: parseInt(id),
          data: [
            { hour: '8AM', qty: data.eight.length },
            { hour: '9AM', qty: data.nine.length },
            { hour: '10AM', qty: data.ten.length },
            { hour: '11AM', qty: data.eleven.length },
            { hour: '12PM', qty: data.twelve.length },
            { hour: '1PM', qty: data.one.length },
          ],
        });
      });
    }
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
            valueField="qty"
            argumentField="hour"
            pointComponent={BarWithLabel}
          />
          <Title text="" />
          <Animation />
        </Chart>

        <Subscription
          subscription={PRODUCT_SCAN_SUBSCRIPTION}
          onSubscriptionData={(data) => {
            const response = data.subscriptionData.data.productScanAdded;
            const updatedRows = this.state.data.map(item => {
              if (response[0].line_id === this.state.currentLineID && item.hour === '1PM') {
                return { ...item, qty: response.length };
              }

              return item;
            });

            this.setState({ data: updatedRows});
          }}
        />
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
  const [rows, setRows] = React.useState([
    {
      line_id: 1,
      name: 'Line 1',
      qty: 0,
    },
    {
      line_id: 2,
      name: 'Line 2',
      qty: 0,
    },
    {
      line_id: 3,
      name: 'Line 3',
      qty: 0,
    },
    {
      line_id: 4,
      name: 'Line 4',
      qty: 0,
    },
    {
      line_id: 5,
      name: 'Line 5',
      qty: 0,
    },
    {
      line_id: 6,
      name: 'Line 6',
      qty: 0,
    },
    {
      line_id: 7,
      name: 'Line 7',
      qty: 0,
    },
    {
      line_id: 8,
      name: 'Line 8',
      qty: 0,
    },
  ]);
  
  React.useEffect(async () => {
    try {
      const response = await getCurrentProductScansByDateAndHour();
      const updateRows = Object.keys(response).map((key, i) => ({
        ...rows[i], qty: response[key].length
      }));

      setRows(updateRows);
    } catch (err) {
      console.log(err);
    }
  }, []);

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

  const handleTableClick = (i) => {
    setLine(i);
  };

  const handleInputKeyUp = (e) => {
    if (e.key === 'Enter') {
      client.mutate({
        mutation: CREATE_PRODUCT_SCAN,
        variables: {
          line_id: parseInt(line),
          product_number: 1231234,
        },
      });
    }
  };

  return (
    <ApolloProvider client={client}>
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

            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              onKeyUp={handleInputKeyUp}
            />
          </FormControl>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>LINE</TableCell>
                  <TableCell align="left">QTY</TableCell>
                  <TableCell align="left">STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow onClick={() => handleTableClick(i + 1)} key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.qty}</TableCell>
                    <TableCell align="left">
                      <div style={{ height: 20, width: 100, background: 'green'}}></div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

        <Container>
          <Demo lineID={line} />
        </Container>
      </Container>

      <Subscription
        subscription={PRODUCT_SCAN_SUBSCRIPTION}
        onSubscriptionData={(data) => {
          const response = data.subscriptionData.data.productScanAdded;
          const updatedRows = rows.map(row => response[0].line_id === row.line_id
            ? { ...row, qty: response.length }
            : row,
          );

          setRows(updatedRows);
        }}
      />
    </ApolloProvider>
  );
}
