import React from 'react';
import SkyLight from "react-skylight";
import Home from './screens/Home';
import POS from './screens/POS';
import SETTINGS from './screens/SETTINGS';
import INVENTORY from './screens/INVENTORY';
import EMPLOYEES from './screens/EMPLOYEES';
import CUSTOMERS from './screens/CUSTOMERS';
import REPORTS from './screens/REPORTS';
import Login from './screens/Login';
import SCHEDULE from './screens/SCHEDULE';
import NotificationSystem from 'react-notification-system';


import {
	MdMenu
} from 'react-icons/md'


import { BrowserRouter,Route } from 'react-router-dom';

import {
	Link
} from 'react-router-dom';
import {connect} from 'react-redux';

import styles from './styles.css';

import {
  getPayments
} from './actions/POS';

import {
	getAla
} from './actions/REPORT';



const mql = window.matchMedia(`(min-width: 800px)`);
class index extends React.Component{

	componentWillMount(){
    console.log("GP INI");
    this.props.dispatch(getPayments());
     console.log("GP EXE");
  }



	constructor(props) {

	  super(props);
	
	  this.state = {

	  	date:null,
	  	time:null,
	  	day:null,
	  	date2day: null,
	  	event: null,
	  	ala:0,
	  	c:0

	  };
	}

	componentDidMount(){

		this.timer =setInterval(()=>{
      		this.props.dispatch(getAla());
    	},1000)

		this._notificationSystem = this.refs.notificationSystem;
		
		let x = new Date();
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		
		let m_ = ['January','February','March','April','May','June','July','August','September','October','November','December'];

		let day = x.getDay();

		let month = x.getMonth();

		console.log(month)
		month = m_[month];
		console.log(month)
		let dat = x.getDate();
		let year = x.getFullYear();

		let _date = `${month} ${dat},${year}`;

		this.setState({
		
			day:days[day],
			date: _date,
		});


		setInterval(()=>{

			let y = new Date();

			let hour = y.getHours();
			let suffix = "AM";
			if(hour>12){
				hour-=12;
				suffix="PM";
			}
			let min = y.getMinutes();
			let sec = y.getSeconds();
			let time = `${hour}:${min} ${suffix} and ${sec} seconds`;

			let {
				day,date
			} = this.state;

			let d2d = `${day} ${date} ${time}`;

			this.setState({
				time:time,
				date2day: d2d,
			});

			
		},1000)


	}

	onSetSidebarOpen=(open)=>{
    this.setState({ sidebarOpen: open });
  }

  	openMenu = () =>{
  	
  	}

  	handleSetActive = (eventx) =>{


  			



  	}


  	onC = () => {
  		this.alertX.show();
  	}

  	dis=()=>{
  			this.alertX.hide();
  	}



	render(){
		if(!this.props.userid){
			return (

				<Login />

				);
		}

		let {
			
			ala,
			c
		} = this.props;

		let forlate;

		if(ala.length>0){
			
			if(c!==this.state.c){
				
			try{

				this.onC();
				this.setState({
					c
				})
				
			}
			catch(error){}
			}

		}





		return(
			<BrowserRouter>
			<div className="flexrow">
			
				
				<div className="row nav">
				<NotificationSystem ref="notificationSystem" />
					<div class="col-3" >
						<Link  to="/"><div class="nav_header">
						<p class="nav_text">LADYLYN DASHBOARD</p>
						</div>
						</Link>
					</div>
					<div class="col-1">
						<Link activeClassName="active" to="/pos"><div class="nav_item">
						<p class="nav_text">POS</p>
						</div>
						</Link>
					</div>
					<div class="col-1">
						<Link to="/inventory"><div class="nav_item">
						<p class="nav_text">INVENTORY</p>
						</div>
						</Link>
					</div>
					<div class="col-1">
						<Link to="/schedules"><div class="nav_item">
						<p class="nav_text">SCHEDULE</p>
						</div>
						</Link>
					</div>
					<div class="col-1">
						<Link to="/employees"><div class="nav_item">
						<p class="nav_text">EMPLOYEE</p>
						</div>
						</Link>
					</div>
					<div class="col-1">
						<Link to="/customers"><div class="nav_item">
						<p class="nav_text">CUSTOMER</p>
						</div>
						</Link>
					</div>
					<div class="col-1">
						<Link to="/reports"><div class="nav_item">
						<p class="nav_text">REPORTS</p>
						</div>
						</Link>
					</div>
					<div class="col-1">
						<Link to="/settings"><div class="nav_item">
						<p class="nav_text">SETTINGS</p>
						</div>
						</Link>
					</div>
					
				</div>

				<div className="row">
						<div class="col-12 center bb">
						<p className="label">{this.state.date2day} </p>
						</div>
					</div>
				<div>

				<Route exact path="/" component={Home}/>
				<Route path="/login" component={Login}/>
				<Route path="/inventory" component={INVENTORY}/>
				<Route path="/employees" component={EMPLOYEES}/>
				<Route path="/schedules" component={SCHEDULE}/>
				<Route path="/customers" component={CUSTOMERS}/>
				<Route path="/reports" component={REPORTS}/>
				<Route path="/pos" component={POS}/>
				<Route path="/settings" component={SETTINGS}/>
				</div>


				<SkyLight dialogStyles={addStyles} ref={ref=>this.alertX=ref} hideOnOverlayClicked={true}>
						
						<div class="row">
							<div class="col-12">
								<h1 class="bemp">Appointment Received</h1>
							</div>

						</div>
						<div  class="row">
							<div class="btn red center">
							<Link to="/" onClick={()=>this.dis()}>
							 	<h1 class="bemp">SHOW IT</h1>
							 </Link>
							</div>
							
						</div>

				</SkyLight>

					


					</div>

					

			</BrowserRouter>
			

			);
	}
}

class Side extends React.Component{
	render(){
		return(

		<div class="sidebar">
			<div className="sidebar_div">
			<p className="sidebar_title">POS</p>
			</div>
		</div>


		);
	}
}

let mapStateToProps = (state) => {
	return {
		userid: state.login.userid,
		ala: state.separate.ala,
		c: state.separate.c
	}
}

let addStyles = {
	width: '20%',
	minHeight: '100px',
	 marginTop: '-350px',
     marginLeft: '-35%', 
     backgroundColor: 'royalblue'

}

export default connect(mapStateToProps)(index);