import React, {Component} from 'react';
import ScatterChart from './components/ScatterChart.js';
import loanData from './loanData.js';
import CollapseCard from './components/CollapseCard.js'
import _ from 'lodash';
import "./App.scss";


const styles = {
  li: {
    display: "flex",
    justifyContent: "flex-start",
    background: "white",
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
    fontFamily: 'Verdana',
    color: '#1467D1',
    fontSize: "100%",
    marginBottom: "1em",
    marginRight: "1em",
    margin: 12,
    padding: 24,
    width: "84%",
    cursor: "move",
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //  chartData:{},
      data:[],
      graph_data:[],
      filtered_graph_data:[],
      axesValues: [],
      xAxisSelected: '',
      yAxisSelected: '',
      submitted: false,
      chart_filter: ''
    };
  
  this.changeXaxis = this.changeXaxis.bind(this)
  this.changeYaxis = this.changeYaxis.bind(this)
  this.onClick = this.onClick.bind(this)
  this.onDelete = this.onDelete.bind(this)
  this.onDragStart = this.onDragStart.bind(this);
  this.onDragOver = this.onDragOver.bind(this);
  this.onDragEnd = this.onDragEnd.bind(this);
  this.onChangeText = this.onChangeText.bind(this);
  this.onClear = this.onClear.bind(this);
  }

//delete selected item
onDelete = (e, index) => {
    this.selectedItem = this.state.filtered_graph_data[index];

    let graph_data = this.state.graph_data.filter(item => item !== this.selectedItem);
    this.setState({ filtered_graph_data: graph_data ,
      graph_data: graph_data});
  }

//start dragging an item
onDragStart = (e, index) => {
    this.draggedItem = this.state.graph_data[index];
    console.log("drag: " + this.state.graph_data[index] )
    e.dataTransfer.effectAllowed = "move";

  };

onDragOver = index => {
    const draggedOverItem = this.state.graph_data[index];

    // if dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }
  // filter out the item being dragged 
  let graph_data = this.state.graph_data.filter(item => item !== this.draggedItem);

  // add the dragged item after the dragged over item
  graph_data.splice(index, 0, this.draggedItem);

  this.setState({ graph_data });
  };

onDragEnd = () => {
this.draggedIdx = null;
};

//on entering search/filter text
onChangeText (e) {
  this.setState({  [e.target.name]: e.target.value })

  let filtered_graph_data = this.state.graph_data

  filtered_graph_data = this.state.filtered_graph_data.filter((item) => 
    ((item.xlabel.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) || 
    item.ylabel.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
    )

this.setState({ filtered_graph_data });

}

//clear search filter
onClear(){
  this.setState({
 
  filtered_graph_data: this.state.graph_data,
 chart_filter:''
  })
}

//select x-axis 
changeXaxis(e){
    this.setState({xAxisSelected: e.target.value});
}

//select x-axis 
changeYaxis(e){
  this.setState({yAxisSelected: e.target.value});
}

//generate chart and add to grid/dashbaord
onClick(e){
  e.preventDefault()
  this.setState({submitted: true});
  
  var xvalue = this.state.xAxisSelected
  var yvalue = this.state.yAxisSelected


  var newdata = _.map(loanData, _.partialRight(_.pick, [xvalue, yvalue]))
  newdata = newdata.map(d => ({ x: Number(d[xvalue]), y: Number(d[yvalue])}))

  //console.log("newArray: "  + JSON.stringify(newdata))
  this.setState({
    data: newdata.concat(this.state.data)
  })
  this.setState({
    graph_data: this.state.graph_data.concat([{ graph:newdata, xlabel:xvalue, ylabel:yvalue }]),
    filtered_graph_data: this.state.graph_data.concat([{ graph:newdata, xlabel:xvalue, ylabel:yvalue }])
  })

  /*
  this.setState({
    filtered_graph_data: this.state.graph_data.concat([{ graph:newdata, xlabel:xvalue, ylabel:yvalue }])
  })
*/
}

//setting the loanData column/paramater values in dropdown list
componentDidMount() {
    let keys = [] 
    for (var k in loanData[0]) keys.push(k)
    console.log("axesValues: " + keys)
    this.setState({ axesValues: keys })    
  }
 

render() {
    
//console.log("filtered: " + JSON.stringify(this.state.filtered_graph_data))
    
  let chart
    if(this.state.submitted) 
     chart = this.state.filtered_graph_data.map((fields,idx) => { 
       return (
      <div key= {idx}  className="drag"  draggable onDragStart={e => this.onDragStart(e, idx)}
      onDragEnd={this.onDragEnd}
      onDragOver={() => this.onDragOver(idx)}
   >

   <CollapseCard >
   <button onClick={e => this.onDelete(e, idx)} id="close" type="button">x</button>
    <li style={styles.li} >
     <ScatterChart data={fields.graph} xlabel={fields.xlabel} ylabel={fields.ylabel} />
     </li>
     </CollapseCard>
     </div>
       )
  })

//values for selecting x-axis and y-axis in dropdown list 
   let optionItems = this.state.axesValues.map((item) =>
   <option key={item}>{item}</option>
);

  //console.log("submitted? " + this.state.submitted)

    return <div className="main">
      <h2>Lending Monitor Dashboard</h2>
      <input type="text" placeholder="Search.." style={{"width":"10%","margin-left":'2%',"font-size": "12px"}}
      value={this.state.chart_filter}
      onChange={this.onChangeText}
      name="chart_filter"
      /> 
      <button className="chart-button" onClick={this.onClear}> Clear </button>
      <h4>Generate Scatter Plots by selecting x-axis and y-axis parameters</h4>
      
      <div className="select">
      x-axis{" "}
      
      <select onChange={this.changeXaxis} value={this.state.xAxisSelected}>{optionItems}</select>
      {" "}y-axis{" "}
      <select onChange={this.changeYaxis} value={this.state.yAxisSelected}>{optionItems}</select>
      
      <button className="chart-button" onClick={this.onClick}> Add Chart to Dashboard </button>
     
      </div>
  
      <ul style={{"display": "flex", "flex-wrap": "wrap"}}>
      {chart}
      </ul>

    </div>
  }
}
export default App;
