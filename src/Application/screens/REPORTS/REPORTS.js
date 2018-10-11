import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import swal from 'sweetalert2';
import {

	MdStore,
	MdAssessment,
	MdHistory,
	MdWeb
	


} from 'react-icons/md';
import {
	getSales,
	getAdminTransaction,
	getDaily,
	getWeekly,
	getMonthly,
	getSP,
	getUsed,
	gall,
	GRS,
	getSuggestion 
} from '../../actions/REPORT';

import {
	getDIDX,
	complete,
	appointmentCompleted
}
 from '../../actions/CUSTOMER';

import SkyLight from 'react-skylight';

let sortedOption = [
	{
		value: 'daily',
		label: 'Day'
	},
	{
		value: 'weekly',
		label: 'Week'
	},
	{
		value: 'monthly',
		label: 'Month'
	}
]

let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];


class REPORTS extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	modo: null,
	  	selected: null,
	  	date:null,
	  	week:null,
	  	month:null,
	  	year:null,
	  	inv_actid:null,

	  	sreportYr:null,
	  	sreportMt:null,
	  	sreportMtName:null,
	  	selDate:null,

	  	act:[],
	  	g1:null,
	  	item:undefined
	  };
	}

	componentDidMount(){


		let date1 = new Date();

		let yr = date1.getFullYear();
		let mt = date1.getMonth();

		this.setState({

			selDate: moment(),
			sreportYr: yr,
			sreportMt: mt,
			sreportMtName:months[mt],
		})



		this.props.dispatch(getAdminTransaction());
		this.props.dispatch(GRS(mt,yr));

		this.timer = setInterval(()=>{
			this.props.dispatch(getSales());
			this.props.dispatch(gall());
			this.props.dispatch(getSuggestion());
			
		},1000)

		this.setState({
			selected: moment()
		})

		

	}


	onBox = () => {

		this.boxDialog.show();
		
	}

	onSort = (event) => {
		let date = this.state.selected;
		this.setState({
			modo:event.value
		})
		if(event.value==="daily"){
			this.props.dispatch(getDaily(date));
		}
		if(event.value==="weekly"){
			this.props.dispatch(getWeekly(date));
		}
		if(event.value==="monthly"){
			this.props.dispatch(getMonthly(date));
		}

	}

	onSelected = (date) => {
		this.setState({
			selected: date
		})
	}

	onInv = () => {
		this.inventoryDialog.show();
	}

	onPay = () => {
		this.payDialog.show();
	}
	onProfits = () => {
		this.profitDialog.show();
	}

	onSeeInventory = (item) => {

		let data = [];
		data.push(item);



		let forView = [];

		data.map(function(item){

			let name;
			let quantity;
			let date = `${item.month}-${item.day}-${item.year}`;
			let service = item.service;

			item.products.map(function(item){






				name = item.name;
				quantity=item.quantity;


				let j = {
				name,
				quantity,
				date,
				service,
			}

			forView.push(j)


			})

			

			

		})

		

	


		this.setState({
			act:forView
		})
		this.infoInventory.show();
	}

	sReport = (date) => {

		let date1 = new Date(date);

		let yr = date1.getFullYear();
		let mt = date1.getMonth();

		this.setState({

			selDate: date,
			sreportYr: yr,
			sreportMt: mt,
			sreportMtName:months[mt],
		})

		this.props.dispatch(GRS(mt,yr));



	}

	onExpenses = () => {
		this.expensesDialog.show();
	}

	onAA = () => {
		this.aaDialog.show();
	}

	onER = () => {
		this.erDialog.show()
	}

	set = (item) => {
		this.setState({
			g1:item.appointment.staffname,
			item:item.appointment
		})
		this.aaDialog.hide();
		this.setXDialog.show();
	}

	scom = (typex) => {

		let {
      item
    } = this.state;


    let _id = item._id;
    let userid = item.userid;
    let customer = item.customer;
    let staffid = item.staffid;
    let staff = item.staffname;
    let serviceid = item.serviceid;
    let service = item.servicename;
    let type = item.servicetype;
    let date = item.date;
    let price = item.price;
    let status = typex;
    let paid = "false";


    if(typex==='abandoned'){
      this.props.dispatch(complete(_id,userid,customer,staffid,staff,serviceid,service,type,date,price,status,paid));
      this.props.dispatch(getDIDX("customer",userid,"abandoned"));
      swal("Service Abandoned!");
    }
    else {

        this.props.dispatch(complete(_id,userid,customer,staffid,staff,serviceid,service,type,date,price,status,paid));
        this.props.dispatch(getDIDX("customer",userid,"completed"));
        swal("Service Completed");
      //this.props.navigation.navigate("SComplete",userid,customer,staffid,staff,serviceid,service,type,date,price,status,paid);
    }

    this.setXDialog.hide();

	}

	getSuggest = () => {
		this.suggested.show();
	}

	render(){

		let {
			report,
			today,
			thisweek,
			thismonth,
			sp,
			gu,
			gall,
			earn,
			inv,
			sal,
			sales,
			suggestion
		} = this.props;
		//console.log(earn,inv,sal)


		

		return(
			<div class="container">


			<div class="row">

				<div class="col-12">

					
					<div class="cnt">
						
						<div class="row">

							<div class="row">
							<div onClick={()=>this.onBox()} class="cardx ml">
							
							<p class="sales_">{today} sales today</p>
							<p class="sales_">{thisweek} sales this week</p>
							<p class="sales_">{thismonth} sales this month</p>
							</div>

							<div onClick={()=>this.onInv()} class="cardx ml lime">
							<MdAssessment size={64} color="#FFFFFF"/>
							<p class="sales">Inventory Reports</p>
							</div>

							</div>
						
							<div class="row">
						

							<div onClick={()=>this.onPay()} class="cardx ml darkred">
							<MdHistory size={64} color="#FFFFFF"/>
							<p class="sales">Payments</p>
							</div>

							<div onClick={()=>this.onProfits()} class="cardx ml royalblue">
							<MdWeb size={64} color="#FFFFFF"/>
							<p class="sales">Profit/Earning Reports</p>


							

							</div>
							</div>
						</div>

						<div class="row">

						

							<div onClick={()=>this.onAA()} class="cardx ml darkred">
							<MdWeb size={64} color="#FFFFFF"/>
							<p class="sales">Active Appointments</p>
							</div>

							<div onClick={()=>this.getSuggest()} class="cardx ml darkred">
							<MdWeb size={64} color="#FFFFFF"/>
							<p class="sales">Customer Suggestions</p>
							</div>

							{
								// <div onClick={()=>this.onER()} class="cardx ml indigo">
								// 						<MdWeb size={64} color="#FFFFFF"/>
								// 						<p class="sales">Employee Status</p>
								// 						</div>
													}

						</div>
						
					</div>
				</div>

			</div>

			<SkyLight dialogStyles={addStyles} hideOnOverlayClicked={true} ref={ref => this.boxDialog = ref} >


				<DatePicker
    				selected={this.state.selected}
    				onChange={this.onSelected}
				/>

				<br />

			<div class="row mb">
				<div class="col-3">
					<Select onChange={this.onSort} options={sortedOption} class="select mb"/>
				</div>
			</div>
				<hr />

			<div class="row ">
				<div class="col-3">
					<h1 class="color">Customer Name</h1>
				</div>
				<div class="col-3 centeredx">
					<h1 class="color">Employee</h1>
				</div>
				<div class="col-3 centeredx">
					<h1 class="color">Service</h1>
				</div>
				<div class="col-3 centeredx">
					<h1 class="color">Date</h1>
				</div>
			</div>

			<hr />

			{
				report.map((item,index)=>(
					<div>
						<div class="row">
							<div class="col-3">
							<h1 class="color">{item.customer}</h1>
							</div>
							<div class="col-3 centeredx">
							<h1 class="color">{item.staff}</h1>
							</div>
							<div class="col-3 centeredx">
							<h1 class="color">{item.service}</h1>
							</div>
							<div class="col-3 centeredx">
							<h1 class="color">{item.month}-{item.day}-{item.year}</h1>
							</div>
							
						</div>
						<hr />
						</div>
					))
			}


   


			</SkyLight>


			<SkyLight dialogStyles={addStyles} hideOnOverlayClicked={true} ref={ref => this.inventoryDialog = ref} >


				
				<hr />

			<div class="row ">
				<div class="col-3">
					<h1 class="color">Employee Name</h1>
				</div>
				<div class="col-3 centeredx">
					<h1 class="color">No. of items used</h1>
				</div>
				
			</div>

			<hr />

			{
				report.map((item,index)=>(
					<div>
					<div onClick={()=>this.onSeeInventory(item)} class="row hover">
				<div class="col-3  ">
					<h1 class="color">{item.customer}</h1>
				</div>
				<div class="col-3 centeredx ">
					<h1 class="color">{item.products.length}</h1>
				</div>
				
				</div>
				<hr />
				</div>

					))
			}


   


			</SkyLight>

			<SkyLight dialogStyles={addStyles} hideOnOverlayClicked={true} ref={ref => this.payDialog = ref} >


				<DatePicker
    				selected={this.state.selected}
    				onChange={this.onSelected}
				/>

				<br />

			<div class="row mb">
				<div class="col-3">
					<Select onChange={this.onInventory} class="select mb"/>
				</div>
			</div>
				<hr />

			<div class="row ">
				<div class="col-3">
					<h1 class="color">Customer</h1>
				</div>
				<div class="col-3 centeredx">
					<h1 class="color">Service</h1>
				</div>
				<div class="col-3 centeredx">
					<h1 class="color">Paid</h1>
				</div>
				<div class="col-3 centeredx">
					<h1 class="color">Date</h1>
				</div>
			</div>

			<hr />

			{
				report.map((item,index)=>(
					<div>
					<div class="row ">
							<div class="col-3">
							<h1 class="color">{item.customer}</h1>
							</div>
							<div class="col-3 centeredx">
							<h1 class="color">{item.service}</h1>
							</div>
							<div class="col-3 centeredx">
							<h1 class="color">{item.price}</h1>
							</div>
							<div class="col-3 centeredx">
							<h1 class="color">{item.month}-{item.day}-{item.year}</h1>
							</div>
						</div>
						<hr />
						</div>
					))
			}


   


			</SkyLight>


			<SkyLight dialogStyles={addStyles} hideOnOverlayClicked={true} ref={ref => this.profitDialog = ref} >
			
				<div class="row colde">
					<DatePicker
    				selected={this.state.selDate}
    				onChange={this.sReport}
				/>
					<div class="row">
						<div class="col-6">

							<h5 class="moned">Sales Report for the month of {this.state.sreportMtName} for year {this.state.sreportYr}</h5>
						</div>
					</div>
					<hr />
					<hr />
					<div class="row">
						<div class="col-6">

							<h5 class="moned">No. of Sales</h5>

						</div>
						<div class="col-6">
							<h5 class="moned">{sales}</h5>
						</div>
					</div>

					<div class="row">
						<div class="col-6">

							<h5 class="moned">Total Earnings</h5>

						</div>
						<div class="col-6">
							<h5 class="moned">{earn}</h5>
						</div>
					</div>

					<hr />

					<div class="row">
						<div class="col-6">

							<h5 class="moned">INVENTORY USED</h5>

						</div>
						<div class="col-6">
							<h5 class="moned">{inv}</h5>
						</div>
					</div>

					<div class="row">
						<div class="col-6">

							<h5 class="moned">EMPLOYEE SALARY</h5>

						</div>
						<div class="col-6">
							<h5 class="moned">{sal}</h5>
						</div>
					</div>

					<hr />

					<div class="row">
						<div class="col-6">

							<h5 class="moned">TOTAL EXPENSES</h5>

						</div>
						<div class="col-6">
							<h5 class="moned">{parseInt(inv)+parseInt(sal)}</h5>
						</div>
					</div>

					<hr />

					<div class="row">
						<div class="col-6">

							<h5 class="moned">PROFIT</h5>

						</div>
						<div class="col-6">
							<h5 class="moned">{parseInt(earn)-(parseInt(inv)+parseInt(sal))}</h5>
						</div>
					</div>


				</div>

			</SkyLight>

			<SkyLight dialogStyles={addStyles} hideOnOverlayClicked={true} ref={ref => this.infoInventory = ref} >
			
				<div class="row ">
				<div class="col-3 centeredx">
					<p class="color">Item Used</p>
				</div>
				<div class="col-3 centeredx">
					<p class="color">Quantity</p>
				</div>
				<div class="col-3 centeredx">
					<p class="color">for what service</p>
				</div>
				<div class="col-3 centeredx">
					<p class="color">Date Used</p>
				</div>
				
				</div>


				{
					this.state.act.map((item,index)=>(

							<div class="row ">
				<div class="col-3 centeredx">
					<p class="color">{item.name}</p>
				</div>
				<div class="col-3 centeredx">
					<p class="color">{item.quantity}</p>
				</div>
				<div class="col-3 centeredx">
					<p class="color">{item.service}</p>
				</div>
				<div class="col-3 centeredx">
					<p class="color">{item.date}</p>
				</div>
				
				</div>

						))
				}

			</SkyLight>


			 <SkyLight dialogStyles={addStylesX} hideOnOverlayClicked={true} ref={ref => this.setXDialog = ref} >
            <div class="col-12">
              <div class="row">
                 <h2 class="color">Appointment {this.state.g1}</h2>
              </div>
              

                <div class="row">
                  <button onClick={()=>this.scom("complete")} className="btnModal">
                      <p>SET COMPLETE</p>
                      </button>

                    <button onClick={()=>this.scom("abandoned")} className="btnModal red">
                      <p>SET ABANDONED</p>
                      </button>
                    

                </div>  
            </div>
        </SkyLight>

			<SkyLight dialogStyles={addStyles} hideOnOverlayClicked={true} ref={ref => this.expensesDialog = ref} >


					<div class="row">
						<div class="col-12">

							<div class="row">
								<div class="col-3">
									<button class="btn">ADD EXPENSES</button>
								</div>
							</div>

							<hr />

							<div class="row">

								<div class="col-12">
									<div class="row center">
										<div class="col-3">
											<h1 class="color">EXPENSES NAME</h1>
										</div>

										<div class="col-3">
											<h1 class="color">DESCRIPTION</h1>
										</div>

										<div class="col-3">
											<h1 class="color">DATE</h1>
										</div>

										<div class="col-3">
											<h1 class="color">COST</h1>
										</div>
									</div>
									<hr />
								</div>

							</div>

						</div>
					</div>


			</SkyLight>

			<SkyLight dialogStyles={addStyles} hideOnOverlayClicked={true} ref={ref => this.aaDialog = ref} >

				<div class="row">
						<div class="col-12">

							

							<hr />

							<div class="row">

								<div class="col-12">
									<div class="row center">
										<div class="col-3">
											<h1 class="color">STAFF</h1>
										</div>

										<div class="col-3">
											<h1 class="color">CUSTOMER</h1>
										</div>

										<div class="col-3">
											<h1 class="color">SERVICE</h1>
										</div>

										<div class="col-3">
											<h1 class="color">SCHEDULE</h1>
										</div>
									</div>
									<hr />
								</div>

							</div>


							{
								gall.map((item,index)=>(
						<div onClick={()=>this.set(item)} class="set">
							<div class="row">
								<div class="col-12">
									<div class="row center">
										<div class="col-3">
											<h1 class="color">{item.appointment.staffname}</h1>
										</div>

										<div class="col-3">
											<h1 class="color">{item.appointment.customer}</h1>
										</div>

										<div class="col-3">
											<h1 class="color">{item.appointment.servicename}</h1>
										</div>

										<div class="col-3">
											<h1 class="color">{`${Math.floor(item.appointment.time/60)}:${item.appointment.time%60}`}</h1>
										</div>
									</div>
									<hr />
								</div>

								</div>

							</div>

									))
							}




						</div>
					</div>

			</SkyLight>

			<SkyLight dialogStyles={addStyles} hideOnOverlayClicked={true} ref={ref => this.suggested = ref} >


			<div class="row">
				<div class="col-3">

					<h1 class="color">Customer</h1>

				</div>

				<div class="col-9">
					<h1 class="color">Suggestion</h1>
				</div>
			</div>


			{
				suggestion.map((item,index)=>(

						<div class="row">
							<div class="col-3">

								<h1 class="color">{item.customer}</h1>

							</div>

						<div class="col-9">
								<h1 class="color">{item.suggestion}</h1>
						</div>
						</div>

				))
			}


			</SkyLight>

			<SkyLight dialogStyles={addStyles} hideOnOverlayClicked={true} ref={ref => this.erDialog = ref} >

			<div class="row">
						<div class="col-12">

							

							<hr />

							<div class="row">

								<div class="col-12">
									<div class="row center">
										<div class="col-3">
											<h1 class="color">STAFF</h1>
										</div>

										<div class="col-3">
											<h1 class="color">TODAY SERVED</h1>
										</div>

										<div class="col-3">
											<h1 class="color">THIS WEEK SERVED</h1>
										</div>

										<div class="col-3">
											<h1 class="color">MONTHLY SERVED</h1>
										</div>
									</div>
									<hr />
								</div>

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
     overflow:'auto',
}

let mapStateToProps = (state) => {
	return {
		report: state.report.transaction,
		gall: state.alert.gall,
		sp: state.report.sp,
		gu: state.report.gu,
		today: state.report.today,
		thisweek: state.report.thisweek,
		thismonth: state.report.thismonth,
		earn: state.profit.earn,
		inv:state.profit.inv,
		sal: state.profit.sal,
		sales: state.profit.sales,
		suggestion: state.suggestion.suggestion,
	}
}

let addStylesX = {
   width: '30%',
     minHeight: '200px',
     marginTop: '-350px',
     marginLeft: '-35%', 
}
export default connect(mapStateToProps)(REPORTS);       