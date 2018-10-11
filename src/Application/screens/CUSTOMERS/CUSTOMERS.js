import React from 'react';
import SkyLight from 'react-skylight';
import Select from 'react-select';
import styles from '../../styles.css';
import {connect} from 'react-redux';
import {
	getCustomerList,
	getCustomerSignup,
	updateCustomer,
	deleteCustomer
} from '../../actions/CUSTOMER';
class CUSTOMERS extends React.Component{

	componentDidMount(){
		this.time = setInterval(()=>{
			this.props.dispatch(getCustomerList());
		},1000)
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	F1x:false,
	  	F2x:false,
	  	userid:false,
	  	firstname:null,
	  	lastname:null,
	  	email:null,
	  	contact:null,
	  	username:null,
	  	password:null,
	  	isUpdate:false,
	  	
	  };
	}

	continue = () => {
		
		if(!this.state.F1){
			this.setState({
				F1x:true
			})
		}

		if(this.state.F1x){
			let{
				firstname,
				lastname,
				email,
				contact,
				username,
				password
			} = this.state;

			console.log("ISI",this.state.userid,this.state.isUpdate);
			
			if(this.state.isUpdate===false){
				this.props.dispatch(getCustomerSignup(username,password,firstname,lastname,email,contact));
			}

			if(this.state.isUpdate===true){
				this.props.dispatch(updateCustomer(this.state.userid,username,password,firstname,lastname,email,contact));
			}

		}

	}

	handleAdd = (item) => {

		this.setState({
			isUpdate:false,
			firstname: "",
			lastname: "",
			email: "",
			contact: "",
			username: "",
			password: ""
		})
		this.addCustomerDialog.show();


	}

	handleAddCustomer = (item) => {

		this.setState({

			isUpdate: true,
			userid:item._id,
			firstname: item.firstname,
			lastname: item.lastname,
			email: item.email,
			contact: item.contact,
			username: item.username,
			password: item.password
		})
		this.addCustomerDialog.show();
	}

	goBackX = (item) => {
		this.setState({

			F1x:false,


		});
	}

	delete = () => {
		this.props.dispatch(deleteCustomer(this.state.userid));
		this.addCustomerDialog.hide();
	}
	render(){
		let {
			customers
		} = this.props;


		return(
			<div class="container">

				<div class="row">
					<div class="col-3 center">

					<button onClick={()=>this.handleAdd()} className="btn">
							<p>Add Customer</p>
						</button>

					</div>
		i			
					<div class="col-3 center">
					
						
					
						
					</div>

					<div class="col-3 center">
						
					</div>
				</div>
				<hr />

				<div  class="row">
				<div class="col-2 center">
					<p class="color capital">USERNAME</p>
				</div>

				<div class="col-2 center">
					<p class="color capital">FIRST NAME</p>
				</div>

				<div class="col-2 center">
					<p class="color capital">LAST NAME</p>
				</div>

				<div class="col-2 center">
					<p class="color capital">EMAIL</p>
				</div> 

				<div class="col-2 center">
					<p class="color capital">CONTACT</p>
				</div>

				<div class="col-2 ctenter">
					<p class="color capital">ADDRESS</p>
				</div>
			</div>
			<hr />

			{
				customers.map((item,index)=>(

					
							<div onClick={()=>this.handleAddCustomer(item)} class="row withpad">
				<div class="col-2 center">
					<p class="color capital">{item.username}</p>
				</div>

				<div class="col-2 center">
					<p class="color capital">{item.firstname}</p>
				</div>

				<div class="col-2 center">
					<p class="color capital">{item.lastname}</p>
				</div>

				<div class="col-2 center">
					<p class="color capital">{item.email}</p>
				</div>

				<div class="col-2 center">
					<p class="color capital">{item.contact}</p>
				</div>

				<div class="col-2 center">
					<p class="color capital">{item.street} {item.brgy} {item.munc} {item.city}</p>
				</div>
			</div>
						

					))
			}


				<SkyLight dialogStyles={addStyle} hideOnOverlayClicked={false} ref={ref => this.addCustomerDialog = ref} >
					<div className="add">
						

						<h3 className="head_inv">ADD CUSTOMER</h3>
         				
         				{!this.state.F1x &&
         				<div>
         				<p>First Name</p>
         				<input onChange={(event)=>this.setState({firstname: event.target.value})} value={this.state.firstname} className="searchbox s_mod" placeholder="e.g. Juan"/>
         				<p>Last Name</p>
         				<input onChange={(event)=>this.setState({lastname: event.target.value})} value={this.state.lastname} className="searchbox s_mod" placeholder="e.g. Tamad"/>
         				<p>Email</p>
         				<input onChange={(event)=>this.setState({email: event.target.value})} value={this.state.email} className="searchbox s_mod" placeholder="e.g. jt45332@yahoo.com"/>
         				<p>Contact</p>
         				<input onChange={(event)=>this.setState({contact: event.target.value})} value={this.state.contact} className="searchbox s_mod" placeholder="e.g. +63 9123456789"/>
						</div>
         					}

         				{this.state.F1x && !this.state.F2x &&
         					<div>
         					<p>Username</p>
								<input onChange={(event)=>this.setState({
         							username:event.target.value
         						})} className="searchbox s_mod" value={this.state.username} placeholder="e.g. Juan"/>
								<p>Password</p>
								<input onChange={(event)=>this.setState({
         							password:event.target.value
         						})} className="searchbox s_mod"  placeholder="e.g. 123juan"/>
         					</div>
         				}




						 <button onClick={()=>this.continue()} className="btn modded">
         				     	<p>SAVE</p>
         				     </button>
         				{this.state.isUpdate===true &&  <button onClick={()=>this.delete()} className="btn modded">
         				     	<p>DELETE</p>
         				     </button>
         				 }
         				{this.state.F1x &&  <button onClick={()=>this.goBackX()} className="btn modded">
         				     	<p>BACK</p>
         				     </button>
         				 }
					</div>

				</SkyLight>


			</div>
		);
	}
}

const addStyle = {
	width: '600px',
	alignItems:'center',
	justifyContent: 'center',
	alignSelf: 'center',
	margin: 0,
	top:0,
	right: 0,
	left: 0,
	bottom: 0,
	overflow: 'auto'
	 

}

let mapStateToProps = (state) => {
	return {
		customers: state.customer.customers
	}
}
export default connect(mapStateToProps)(CUSTOMERS);                    