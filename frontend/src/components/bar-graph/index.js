import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Subscription } from 'react-apollo';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import {
  getLineProductScansByDateAndHour,
} from '../../graphql/queries';
import { PRODUCT_SCAN_SUBSCRIPTION } from '../../graphql/subscriptions';
import { getIndicationColor } from '../../services/utils';

const getPath = (x, width, y, y1) => `M ${x} ${y1}
   L ${width + x} ${y1}
   L ${width + x} ${y + 30}
   L ${x} ${y + 30}
   Z`;

const labelStyle = { fill: 'black' };

const BarWithLabel = ({
  arg, barWidth, maxBarWidth, val, startVal, color, value, style,
}) => {
  const width = maxBarWidth * barWidth;

  return (
    <React.Fragment>
      <path d={getPath(arg - width / 2, width, val, startVal)} fill={getIndicationColor(value)} style={style} />
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

class BarGraph extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentLineID: this.props.lineID,
      data: [],
    };
  }

  componentDidMount() {
    this.fetchProductScans(this.props.lineID);
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

export default BarGraph;