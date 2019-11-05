import React, {Component} from 'react';
import {
  Hint,
  HorizontalGridLines,
  MarkSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis
} from 'react-vis';
import ToolTip from './ToolTip.js';

//Chart generation
export default class ScatterChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
    this.rememberValue = this.rememberValue.bind(this);
    this.forgetValue = this.forgetValue.bind(this);
  }

  //onMouseOver on mapped plot inside a chart
  rememberValue(value) {
    this.setState({value});
  }

  //onMouseOut from mapped plot inside a chart
  forgetValue() {
    this.setState({
      value: null
    });
  }


  render() {
    const {data} = this.props;
  console.log("this.props: " + JSON.stringify(this.props ))

if(this.state.value){
   var {value} = this.state;
}

console.log("value in scatter " + JSON.stringify(value))

    return <div>
      <XYPlot
    
        margin={{top:15, left: 75, right: 5, bottom: 30}}
        width={300}
        height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          
          />
        <YAxis/>
        <MarkSeries
          data={data}
          onValueMouseOver={this.rememberValue}
          onValueMouseOut={this.forgetValue}
          opacity={0.7}
        />
        {value ?
            <Hint value={value}>
              <ToolTip value={value} xlabel={this.props.xlabel} ylabel={this.props.ylabel} />
            </Hint> :
            null
          }
      </XYPlot>
      <div style={{
        color: '#9a9494',
        fontSize: 11,
        lineHeight: '13px',
        textAlign: 'right',
        transform: 'rotate(-90deg) translate(120px, -160px)'
      }}>{this.props.ylabel}</div>
      <div style={{
        color: '#9a9494',
        fontSize: 11,
        lineHeight: '13px',
        textAlign: 'right',
        transform: 'translate(-5px,-14px)',
        width: '100%'
      }}>{this.props.xlabel}</div>
    </div>
  }
}