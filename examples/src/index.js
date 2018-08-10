import React from 'react';
import { render} from 'react-dom';
import FetchTextBox from '../../src';
import './styles.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {

	var value = '';

	function getData(val){
	    //this.setState({value: val});
	    value = val;
	}

  function logData() {
    //console.log(this.state.value);
    console.log(value);
  }

	return (
		<div>
			<div className="inputArea">
		    	<FetchTextBox url='https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=' method='GET' jsonArrayKey='player' fieldName="strPlayer" sendData={getData.bind(this)} />
		    </div>
		    <div className="inputAreaBtn">
		    	<button onClick={logData.bind(this)} >Get Value</button>
		    </div>
		</div>
	    
	);
}


render(<App />, document.getElementById("root"));