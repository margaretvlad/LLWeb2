import React from 'react';
import {
	MdSettings
} from 'react-icons/md';
import SkyLight from 'react-skylight';
import Select from 'react-select';
import {connect} from 'react-redux';
import styles from '../../styles.css';
import Checkbox from 'rc-checkbox';
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';
import TimeField from 'react-simple-timefield';
import {
	MdCheck,
	MdCancel
} from 'react-icons/md';
import {
	getStaff
} from '../../actions/EMPLOYEES';
import {
	setSchedule,
	resetSchedule
} from '../../actions/SCHEDULE';
import 'rc-checkbox/assets/index.css';


const shift = [
	{
		value: 'morning',
		label: 'Morning'
	},
	{
		value: 'afternoon',
		label: 'Afternoon'
	}
]

const dayOption = [];

const days = [
	
	{
		day: "Monday"
	},
	{
		day: "Tuesday"
	},
	{
		day: "Wednesday"
	},
	{
		day: "Thursday"
	},
	{
		day: "Friday"
	},
	{
		day: "Saturday"
	},
	{
		day: "Sunday"
	},

];

class SCHEDULE extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	full_name: null,
	  	id: null,
	  	activeday: null,
	  	staff: [],
	  	schedule: [],
	  	d2d:null,
	  	select_day:null,
	  	checked:false,
	  	schedactive: null,
	  	schedactiveid:null,
	  	checkedAll:false,
	  	ad:false,
	  	ck: false,
	  	am:"07:30",
	  	am_e:"12:00",
	  	pm: "01:00",
	  	pm_e:"07:30",
	  	dayselected:null,



	  	activeshift:null,
	  	activedaysort:null,
	  };
	}
	componentWillMount(){
		
		days.map(function(item){
			let y= {
				value: item.day,
				label: item.day,
			}

			dayOption.push(y);


		})

			

		try{
		var day = days[new Date().getDay()-1].day;
		}catch(error){day="Sunday"}
		console.log("DAY",day)

		this.setState({
			d2d:day
		});

		let x = {
				value: "Monday",
				label: "Monday"
			}

			this.setState({
				dayselected:x
			})




	}

	componentDidMount(){

		this.tmr = setInterval(()=>{
			this.props.dispatch(getStaff());
		},1000)

	}
	handleStaff= (item) =>{
		this.setState({
			full_name: `${item.firstname} ${item.lastname}`,
			id: item._id
		})
	}

	handleDay = (day) => {
		console.log(day);
		this.setState({
			activeday: day
		})
	}

	editSchedule = () => {
		this.editSched.show();
	}

	reset = () => {
		this.resetSched.show();
	}

	handleClick=(item)=>{
		this.setState({
			staff:item,
			schedule:item.schedule
		});

	}

	handleChecked = (event,checked) =>{
		this.setState({
			checked: !this.state.checked,
		})
	}

	handleCheckedEmp = (event) => {
		this.setState({
			checkedAll: !this.state.checkedAll,
			ck:!this.state.ck,
		})
	}

	handleCheckedAD = (event) => {
		this.setState({
			ad: !this.state.ad,
		})
	}

	handleCheckedAll = (event) => {
		this.setState({
			schedactive:null,
			ck:!this.state.ck,
		})
	}

	handleClickSA = (item) => {
	
		this.setState({
			schedactive: `${item.firstname} ${item.lastname}`,
			schedactiveid: item._id,
		});

		if(this.state.ck){
			this.setState({
				ck:false,
			})
		}

		
		
	}

	timeParser = (time) =>{

		let splitt = time.split(':');
		let hour = splitt[0];
		let mites = splitt[1];

		if(hour>12)hour-=12;

		let ret = (hour*60)+parseInt(mites);

		return ret;

	}

	handleSave = () => {

		let {
			ck,
			checked,
			ad,
			am,
			am_e,
			pm,
			pm_e,
			dayselected,
		} = this.state;

		let am_time = this.timeParser(am);
		let am_end = this.timeParser(am_e);

		let pm_time = this.timeParser(pm);
		let pm_end = this.timeParser(pm_e);

			

		
		
		console.log(checked,ck);

		if(checked && ck){

			console.log("Full Auto");
			this.props.dispatch(setSchedule("","all","emp",am_time,am_end,pm_time,pm_end,dayselected.value));
		}

		if(!checked && ck){

			console.log("Semi Manual");
			this.props.dispatch(setSchedule("","manual","emp",am_time,am_end,pm_time,pm_end,dayselected.value));
			
		}

		if(checked && !ck){


			this.props.dispatch(setSchedule(this.state.schedactiveid,"all","manual",am_time,am_end,pm_time,pm_end,dayselected.value));
		}

		if(!checked && !ck){
				

				// full manual
				console.log("Full Manual");
				console.log(dayselected.value);
				this.props.dispatch(setSchedule(this.state.schedactiveid,"manual","manual",am_time,am_end,pm_time,pm_end,dayselected.value));

		}
	


		// this.setState({
		// 	ck:false,
		// 	checked:false,
		// 	ad:false,
		// 	am:"7:30",
		// 	am_e:"12:00",
		// 	pm:"1:00",
		// 	pm_e:"7:30",
		// 	dayselected:null
		// })

		


		// if save to all employee



		// if for whole week
		// whole day


		// to single employee


		// 


	}

	amChange = (time) =>{
		this.setState({
			am: time,
		})
	}
	amEChange = (time) => {
		this.setState({
			am_e:time
		})
	}
	pmChange = (time) => {
		this.setState({
			pm:time
		})
	}

	pmEChange = (time) => {
		this.setState({
			pm_e:time
		})
	}

	dayChange = (event) => {




		this.setState({
			dayselected:event
		})

		console.log("CHANGE",event.value);
	}


	resetSchedule = () => {
		this.resetSched.show();
	}

	onReset = () =>{
		this.props.dispatch(resetSchedule());
		this.resetSched.hide();
	}

	daySort = (event) => {
		this.setState({
			activedaysort:event.value,
		})
	}

	shiftSort = (event) => {
		this.setState({
			shiftsort:event.value,
		})
	}


	render(){
		const {
			staff,
			unscheduled,
		} = this.props;

		let counter = 0;
		let defect = 0;




		return(
			<div class="container">


				<div class="row">

					<div class="col-12">

					

					<div class="row sb">
						<div class="col-2">
						<button onClick={()=>this.editSchedule()} class="btn mx">
						<h4>EDIT</h4>
						</button>
						</div>
						<div class="col-2">
						<button onClick={()=>this.resetSchedule()} class="btn mx">
						<h4>RESET</h4>
						</button>
						</div>
						
						<div class="col-5">
						
						</div>
					</div>

					<br />
					<hr />


					<div class="row">

					<div class="col-3">
					<h1 class="color">STAFF LIST</h1>
					<div class="staff_">

						{
							staff.map((item,index)=>(

								<div onClick={()=>this.handleClick(item)} class="row border">
									<p class="list_">{item.firstname} {item.lastname}</p>
								</div>

								))
						}
						
					</div>

					</div>

					

					<div class="jex">

					<div class="contained">

					{days.map((item,index)=>(


						<div class="row">
						<div class="col-2">
							<div class="list_scheduled">

								<p>{item.day}</p>

								{
										this.state.schedule.map((itemx,index)=>(

											itemx.day===item.day && <pre>AM : {`${Math.floor(itemx.morning._time/60)}:${itemx.morning._time%60}`}-{`${Math.floor(itemx.morning._endTime/60)}:${(itemx.morning._endTime%60)}`}</pre>

											))
									}

									{
										this.state.schedule.map((itemx,index)=>(
										
										

										

										 itemx.afternoon ? itemx.day===item.day && <pre>PM : {`${Math.floor(itemx.afternoon._time/60)}:${(itemx.afternoon._time%60)}`}-{`${Math.floor(itemx.afternoon._endTime/60)}:${(itemx.afternoon._endTime%60)}`}</pre>:null
										 
										
										
									))
									}

							</div>
						</div>


					</div>


						))

					}




					</div>
					<div class="row ef">
					

					</div>


					</div>


					</div>



					

					</div>

					

				</div>
			

				<SkyLight  dialogStyles={editStyles} hideOnOverlayClicked={true} ref={ref=> this.editSched = ref}>



				<div class="row">
					<div class="col-3">
						<h1 class="color">STAFF LIST</h1>
					<div class="staff_">

						{
							staff.map((item,index)=>(

								<div onClick={()=>this.handleClickSA(item)} class="row border">
									<p class="list_">{item.firstname} {item.lastname}</p>
								</div>

								))
						}

					</div>
					</div>

					<div class="col-8 siz">
						
						<div class="row br">
							<div class="top_select">

							<div class="col-12">

							<label><Checkbox checked={this.state.checked} onChange={this.handleChecked} class="checkbox"/>SET FOR WHOLE WEEK</label>

							</div>

							<br />

							<div class="col-12">

							<label><Checkbox checked={this.state.ck} onChange={this.handleCheckedAll} class="checkbox"/>SET FOR ALL EMPLOYEE</label>

							</div>



							</div>
						</div>


						<div class="row">


							<div class="top_select">
								<div class="col-12">
									<h2>Editing Schedule For</h2>

								{this.state.schedactive && <h3>Employee Name:  {this.state.schedactive}</h3>}
								{this.state.ck && <h3>ALL EMPLOYEE</h3>}
								
								</div>
							</div>

						</div>

						<div class="row">
							
							{//<label><Checkbox onChange={this.handleCheckedAD}/>SET FOR WHOLE DAY</label>
						}
							
							
						</div>

						<br />


						<div class="row">
							<div class="col-1">
								<h3>AM</h3>
							</div>
							<div class="col-3">
								<TimeField class="timer" onChange={this.amChange} value={this.state.am}  />
							</div>
							<div class="col-1">
							
							</div>
							<div class="col-1">
							<p>TO</p>
							</div>
							<div class="col-3">
								<TimeField class="timer" onChange={this.amEChange} value={this.state.am_e}  />
							</div>
						</div>

						<div class="row">
							<div class="col-1">
								<h3>PM</h3>
							</div>
							<div class="col-3">
								<TimeField class="timer" onChange={this.pmChange} value={this.state.pm}  />
							</div>
							<div class="col-1">
							
							</div>
							<div class="col-1">
							<p>TO</p>
							</div>
							<div class="col-3">
								<TimeField class="timer" onChange={this.pmEChange} value={this.state.pm_e}  />
							</div>
						</div>

						<br />

					{!this.state.checked &&	
						<div class="row">
							<div class="col-3">
								<p>SELECT WHAT DAY</p>
							</div>
							
							<div class="col-6">
								<Select value={this.state.dayselected} onChange={this.dayChange} options={dayOption} class="select" />
							</div>
						</div>
					}

					

						<div class="row">
						<div class="col-3">
							<button onClick={()=>this.handleSave()} class="btn">
								<p>Save</p>
							</button>
						</div>
					</div>




					</div>
				</div>






				</SkyLight>
				<SkyLight dialogStyles={resetStyles} hideOnOverlayClicked={true} ref={ref=> this.resetSched = ref}>
					<div class="row">
						<div class="col-12">
							<h1 class="color">Are you sure?</h1>
							<MdCheck onClick={()=>this.onReset()} size={64} color={"royalblue"}/> <MdCancel onClick={()=>this.resetSched.hide()} size={64} color={"red"}/>
						</div>
					</div>
				</SkyLight>
				

			</div>
		);
	}
}

let editStyles = {
	backgroundColor: '#FFFFFF',
      
      width: '70%',
      height: '600px',
      marginTop: '-350px',
      marginLeft: '-35%',

      

	
}



let resetStyles = {
	width: '200px',
	minHeight: '80px',
}

let mapStateToProps = (state) =>{
	return {
		staff: state.schedule.staff,
		unscheduled: state.schedule.unscheduled,
	}
}
export default connect(mapStateToProps)(SCHEDULE);