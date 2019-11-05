import React, {Component} from 'react';
import "../App.scss";

class CollapseCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: true,
            text: '-'
        }
        this.collapsible = this.collapsible.bind(this);
    }

    //toggle between - and + for collapsing and expanding a chart
    collapsible(e){
        this.setState({open: !this.state.open})
    if(!this.state.open)
    {
    this.setState({
    text: '-'
    })
    }
    else
    {
    this.setState({
        text: '+'
    })
    }
}

    render() {
      return (<div>
        <button onClick={(e)=>this.collapsible(e)} id="collapse" >
            {this.state.text}</button>
        {this.state.open ? (
            <div >
                {this.props.children}
            </div>
            ) : <div id="dummy"><div id="nested">Click + button to view</div></div>}
      </div>);
    }
  }

  export default CollapseCard