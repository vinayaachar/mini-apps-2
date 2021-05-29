import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import ChartJS from 'chart.js';
import { Line } from 'react-chartjs-2';


export default class Crypto extends React.Component {
  // chartRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      usdRates: [],
      gbpRates: [],
      euRates: [],
      dates: [],
      chartData: {}
    }

    this.charts = this.charts.bind(this);
  }


  componentDidMount() {

    // const myChartRef = this.chartRef.current.getContext("2d");

    axios.get('http://localhost:3000/api')
      .then(response => {
        console.log(response.data);
        var obj ={};
        this.setState({
          // currencies: response.data.currencies,
          usdRates: response.data.usdRates,
          dates: response.data.dates,
          // gbpRates: response.data.gbpRates,
          // euRates: response.data.euRates,
        }, () => {
          // this.charts(myChartRef);
          console.log(this.state.usdRates);
          obj = {
            labels: this.state.dates,
            datasets: [
              {
                label: 'USD/BTC',
                data: this.state.usdRates,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              },
              // {
              //   label: this.state.currencies[1],
              //   data: this.state.gbpRates,
              //   fill: true,
              //   backgroundColor: "rgba(75,192,192,0.2)",
              //   borderColor: "#742774"
              // },
              // {
              //   label: this.state.currencies[2],
              //   data: this.state.euRates,
              //   fill: true,
              //   backgroundColor: "rgba(75,192,192,0.2)",
              //   borderColor: "#BF3F3F"
              // },
            ]
          }
          // var chart = new ChartJS(myChartRef, obj);
        })
        return obj;
      })
      .then(obj => {
        console.log(obj)
        this.setState({
          chartData: obj
        }, () => console.log(this.state.chartData))
      })
      .catch(err => console.log(err));
  }

  charts(myChartRef) {

    console.log(myChartRef);
    var obj = {
      type: "line",
      data: {
        labels: this.state.currencies,
        datasets: [
          {
            label: "BTC",
            data: this.state.rates,
          }
        ]
      }
    }
    var chart = new Chart(myChartRef, obj);
    return chart;
  }

  render() {
    return (
      <div>
        <Line data = {this.state.chartData} />
      </div>
    )
  }
}


ReactDom.render(<Crypto />, document.getElementById('root'));