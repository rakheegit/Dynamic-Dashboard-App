import React from 'react';
// getting the (x,y) values along with x-axis and y-axis label values 
//to display on hovering over the points plotted in the chart

export default function ToolTip({value,xlabel,ylabel}) {
  const {x, y} = value;

  return <div>
    <div style={{
      borderBottom: '1px solid #717171',
      marginBottom: 5,
      paddingBottom: 5,
      textTransform: 'uppercase'
    }}></div>
    <div style={{position: 'relative', height: '15px', width: '100%'}}>
    <div style={{position: 'absolute'}}>{xlabel}</div>
    <div style={{position: 'absolute', right: 0}}>{x}</div>  
    </div>
    <div style={{position: 'relative', height: '15px', width: '100%'}}>
    <div style={{position: 'absolute'}}>{ylabel}</div>
    <div style={{position: 'absolute', right: 0}}>{y}</div>  
    </div>
  </div>;
}