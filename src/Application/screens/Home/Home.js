import React from 'react';
import Trend from 'react-trend';
import styles from '../../styles.css';
import SkyLight from 'react-skylight';
import Select from 'react-select';
import swal from 'sweetalert2';
import {connect} from 'react-redux';
import {

  getStaff,
  accept,
  reject,
  getDID,
  transfer,
 

} from '../../actions/EMPLOYEES';

import {
	getAla
} from '../../actions/REPORT';



class Home extends React.Component{


	constructor(props) {
	  super(props);
	
	  this.state = {

	  	onTransfer:false,
	  	at: null,
	  	ap:null,
	  	cust:null,
	  	staff:null,
	  	service:null,
	  	ttr:null,
	  	ttn:null,
	  	userid:null,
	  	item:null

	  };
	}

	componentDidMount(){
		this.timer =setInterval(()=>{
      		this.props.dispatch(getAla());
      		this.props.dispatch(getStaff());
    	},1000)
	}



	onOpenMod = (item) => {

		this.setState({
			at:item.staffid,
			ap:item._id,
			cust: item.customer,
			staff: item.staffname,
			service:item.servicename,
			userid: item.userid,
			item:item

		})

		this.onMod.show();
	}

	transfer = () => {
		this.setState({
			onTransfer:true
		})
	}

	onAccept = () => {
		let {
			at,ap
		} = this.state;
		this.props.dispatch(accept(at,ap));
		this.props.dispatch(getDID("customer",this.state.userid,"accepted"))
		this.onMod.hide();
	}

	onReject = () => {
		let {
			at,ap
		} = this.state;
		this.props.dispatch(reject(at,ap));
		this.props.dispatch(getDID("customer",this.state.userid,"rejected"))
		this.onMod.hide();
	}

	onSelect = (event) => {
		this.setState({
			ttr:event.value,
			ttn: event.label,
		})
	}

	onTrans = () => {





		let {
			ttr,
			item,
			
			ttn
		} = this.state;


		if(item.staffid===ttr){
			swal("No can do!");
		}

		else{
		item.staffid=ttr;
		item.staffname=ttn;

		this.props.dispatch(transfer(item,ttr));
		swal("Transfer Command Submitted");
		this.onMod.hide();

		// this.setState({
		// 	ttr:null,
		// 	ttn:null,
		// 	item:null
		// })
	}
	}


	render(){



		let {
			staff,
			ala
		} = this.props;

		let staffOptions = [];

		staff.map(function(item){
			let yz = {
				value: item._id,
				label:`${item.firstname} ${item.lastname}`
			}




			//console.log(yz)


			if(staffOptions.length===0){
				staffOptions.push(yz);
			}

			staffOptions.map(function(item){
				if(item.value!==yz.value){
					staffOptions.push(yz);
				}
			})
		})

		return(

			<div class="row">

				<div class="col-12 center">
					
						<div class="logged">
							<div class="row">
								<h1 class="color padded">CUSTOMER LIVE REQUEST APPOINTMENTS</h1>

							</div>

							<div class="row">
								<hr />
							</div>

						{	ala.map((item,index)=>(

								<div onClick={()=>this.onOpenMod(item)} class="row center">
								<div class="item_g">
									<h1 class="color">{item.customer}  is requesting {item.servicename} to {item.staffname} at {`${Math.floor(item.time/60)}:${item.time%60<10?0:item.time%60}`} {item.suffix} on {`${new Date(item.date).getMonth()+1}-${new Date(item.date).getDate()} of ${new Date(item.date).getFullYear()}`}</h1>
								</div>
							</div>

							))

						}

							
						</div>

				</div>

				<SkyLight dialogStyles={addStyles} ref={ref=>this.onMod=ref} hideOnOverlayClicked={true}>


				<div class="row flexed">
					<div class="row">
						<h1 class="color">APPOINTMENT DETAILS</h1>
					</div>
					<div class="row">
						<h1 class="color">CUSTOMER NAME: {this.state.cust}</h1>
					</div>
					<div class="row">
						<h1 class="color">STAFF APPOINTING: {this.state.staff}</h1>
					</div>
					<div class="row">
						<h1 class="color">SERVICE FOR APPOINTMENT: {this.state.service}</h1>
					</div>


					<hr />

					<br />
					<div class="row">
					<div class="col-3">

					<div onClick={()=>this.onAccept()} class="widthless">
						<div class="btnModal widthless">
							<h1 class="wt">ACCEPT APPOINTMENT</h1>
						</div>
					</div>

					<div  onClick={()=>this.onReject()} class="row widthless">
						<div class="btnModal widthless red">
							<h1 class="wt">REJECT APPOINTMENT</h1>
						</div>
					</div>

				
					<div onClick={()=>this.transfer()} class="row widthless">
						<div class="btnModal widthless">
							<h1 class="wt">TRANSFER CUSTOMER</h1>
						</div>
					</div>
				
					</div>

					<div class="col-9">
						{

							this.state.onTransfer && <div class="row">

								<div class="col-12 center">
									<div class="col-12">
										<h1 class="color">Transfer to whom?</h1>
										<Select options={staffOptions} onChange={this.onSelect} class="select"/>
										<div onClick={()=>this.onTrans()} class="btnModal widthless">
											<h1 class="wt">TRANSFER CUSTOMER</h1>
										</div>
									</div>
								</div>

							</div>

						}
					</div>
					</div>
					
				</div>

				</SkyLight>

			</div>


			);
	}
}

let addStyles = {
	width: '70%',
	height: '600px',
	 marginTop: '-350px',
     marginLeft: '-35%', 

}


let mapStateToProps = (state) => {
  return {
     staff: state.schedule.staff,
     ala: state.separate.ala
  }
}
export default connect(mapStateToProps)(Home);