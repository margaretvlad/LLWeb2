import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Application from './Application';
import {Provider} from 'react-redux';
import axios from 'axios';
import {configureStore} from './Application/store';
import Uploader from './Uploader';

class App extends Component {


// constructor(props) {
//   super(props);

//   this.state = {
//   	data:null
//   };
// }

componentDidMount(){
	// axios.get('https://raw.githubusercontent.com/clavearnel/philippines-region-province-citymun-brgy/master/json/refbrgy.json').then((response)=>{
	// 	let {RECORDS} = response.data;

	// 	let d = [];

	// 	RECORDS.map(function(item){
	// 		if(item.provCode==="0505"){
	// 			d.push(item);
	// 		}
	// 	});

	// 	console.log(JSON.stringify(d));


	// 	this.setState({
	// 		data: d
	// 	})
	// })
}

  render() {


  	// let {
  	// 	data
  	// } = this.state;


    return (
      <Provider store={configureStore()}>
      <div style={{backgroundColor: '#FFFFFF',width: '100%',height: '100%'}}>
       <Application />
      </div>
      </Provider>
      // <Uploader />

      	// {
      	// 	data.map((item,index)=>(

      	// 					<p>
      	// 								x
      	// 						</p>
      	// 		))
      	// }

      
      

    );
  }
}

export default App;
