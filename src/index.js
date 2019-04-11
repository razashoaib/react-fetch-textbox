import React, { Component } from "react";
import './styles.css';

// This component is contains the implementation of Fetch Texbox.

export class FetchTextBox extends Component {
  
  constructor(props) {
  	super(props)
  	this.state = {
  		data: [],
  		isLoading: false,
  		value: '',
  		hideSuggestions: false
  	}
  }

  logChange(e) {
      this.setState({value: e.target.value});
      if(this.state.value.length >=2)
      	this.fetchResults(e.target.value);
      try{
          this.sendTextBoxValue(e.target.value);
      } catch (ex) {}
  }

  setTextboxValue(e) {
  	this.setState({hideSuggestions: true, value: e.target.innerHTML});
      try {
  	   this.sendTextBoxValue(e.target.innerHTML);
      } catch (ex) {}
  }

  sendTextBoxValue(va){
 		this.props.sendData(va);
	}

  fetchResults(queryText) {
  	var self = this;
  	let header = new Headers({
	    'Content-Type': 'application/json'
	});

  	this.setState({isLoading: true, hideSuggestions: false});

      fetch(this.props.url + queryText, {
          method: this.props.method
      }).then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      }).then(function(data) {
          self.setState({ data: (data[self.props.jsonArrayKey] != null ? data[self.props.jsonArrayKey] : []), isLoading: false });
      }).catch(err => {
          console.log('Error occurred',err);
      })
  }

  render() {
  	let className = 'form-control';
	if (this.state.isLoading) {
		className += ' loading-state';
	}

	let suggestionsButtonStyleClassName = 'list-group-item list-group-item-action custom-item';

	if(this.state.hideSuggestions || this.state.value.length < 2) {
		suggestionsButtonStyleClassName = 'hidden';
	}

      return (
          <div className="form-group">
              <input id="fetch-textbox" value={this.state.value} onChange={this.logChange.bind(this)} placeholder="Enter Value" type="text" className={className} />
              <div className='list-group fetch-textbox-suggestions'>
      			  	<ul>
        				{ this.state.data.map((item, key) => 
        					<li key={key} onClick={this.setTextboxValue.bind(this)} className={suggestionsButtonStyleClassName}>{item[this.props.fieldName]}</li>
        				)}
        				</ul>
                  </div>
          </div>
      );
  }
}

export default FetchTextBox