import React from 'react';
import Select from 'react-select';
import SkyLight from 'react-skylight';
import styles from '../../styles.css';
import {connect} from 'react-redux';
import {
	MdCancel,
	MdArrowBack
} from 'react-icons/md';

// func
import {
	getServiceAction,

} from '../../actions/INVENTORY';
import {
	signupAction,
	getStaff,
	updateProfile,
	deleteEmployee
} from '../../actions/EMPLOYEES';


let skills = [];
let address = [];

class EMPLOYEES extends React.Component{
	componentDidMount(){
		this.timers = setInterval(()=>{
			this.props.dispatch(getStaff());
		},1000);
	}
	constructor(props) {
	  super(props);
	
	  this.state = {

	  	F1: false,
	  	F2: false,
	  	F3: false,



	  	// infos

	  	firstname: null,
	  	lastname:  null,
	  	email: null,
	  	contact: null,
	  	street:null,
	  	brgy: null,
	  	munc: null,
	  	city: null,
	  	skills: [],
	  	username: null,
	  	password: null,
	  	isUpdate: false,
	  	act_staff: [],
	  	aid:null,
	  	enteredText:null

	  };
	}
	handleAddEmployee = () =>{
		this.setState({
			isUpdate: false,
			F1: false,
	  		F2: false,
	  		F3: false,
			firstname: "",
	  		lastname:  "",
	  		email: "",
	  		contact: "",
	  		street:"",
	  		brgy: "",
	  		munc: "",
	  		city: "",
	  		skills: [],
	  		username: "",
	  		password: "",
		})
		this.addEmployeeDialog.show();
	}

	back = () =>{
		let {
			F1,
			F2,
			F3
		} = this.state;

		if(F1 && !F2){
			this.setState({
				F1:false,
			})
		}

		if(F2 && !F3){
			this.setState({
				F2:false,
			})
		}
	}

	continue = () =>{
		let {
			F1,
			F2,
			F3
			
		} = this.state;

		if(!F1){
			this.setState({F1:true});
			this.props.dispatch(getServiceAction());	
		}
		if(F1 && !F2){

			this.setState({F2:true});

		}

		if(F1 && F2 && !F3){


			let {
				firstname,
				lastname,
				email,
				contact,
				street,
				brgy,
				munc,
				city,
				username,
				password,
				skills
			} = this.state;

			let add = {
				street,
				brgy,
				munc,
				city
			}

			address.push(add);
			console.log(address);

			if(this.state.isUpdate===true){

				this.props.dispatch(updateProfile(this.state.aid,username,password,firstname,lastname,email,contact,address,skills))
			}
			if(this.state.isUpdate===false){
				this.props.dispatch(signupAction(username,password,firstname,lastname,email,contact,address,skills))
			}
			
			skills=[];
			address=[];




			this.setState({
				F1:false,
				F2:false,
				F3:false
			});
		}
		
	}

	addService = (event) =>{
			let y = {

				label: event.label
			}

			let count=0;

			skills.map(function(item){
				if(item.label===event.label)count++;
			});

			if(count===0 && event.label){
				skills.push(y);
			}

			this.setState({
				skills:skills
			})

			console.log(event)
	}

	popArr = (item) =>{
		skills.pop(item);
	}

	getWhat2do = (item) =>{
		let {act_staff} = this.state;
		this.setState({
			isUpdate: true,
			F1: false,
	  		F2: false,
	  		F3: false,

			firstname: item.firstname,
	  		lastname:  item.lastname,
	  		email: item.email,
	  		contact: item.contact,
	  		street:item.street,
	  		brgy: item.brgy,
	  		munc: item.munc,
	  		city: item.city,
	  		skills: [],
	  		username: item.username,
	  		password: item.password,
	  		roles: null,
	  		name: null,
		});
		
		this.addEmployeeDialog.show();
	}

	onUpdate = (item) => {
		
		this.setState({
			isUpdate: true,
			aid:item._id,
			firstname: item.firstname,
	  		lastname:  item.lastname,
	  		email: item.email,
	  		contact: item.contact,
	  		street:item.street,
	  		brgy: item.brgy,
	  		munc: item.munc,
	  		city: item.city,
	  		skills: item.skills,
	  		username: item.username,
	  		password: item.password,
		});
		this.infoDialogue.hide();
		this.addEmployeeDialog.show();
	}

	delete = () => {
		let staffid = this.state.aid;
		console.log("ISID",staffid,this.state.act_staff);
		this.props.dispatch(deleteEmployee(staffid));
		this.addEmployeeDialog.hide();
	}

	showSkills = () => {

		this.addEmployeeDialog.hide();
		this.skillsDialog.show();


	}

	render(){

		let {
			service,
			staff,
		} = this.props;

		return(
			<div class="container">

			<div class="row">
			
				<div class="col-3">
					<button onClick={()=>this.handleAddEmployee()} className="btn">
							<p>Add Employee</p>
					</button>
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

				
			</div>
			<hr />


	
			{
				staff.map((item,index)=>(

					
				<div onClick={()=>this.onUpdate(item)} class="row withpad">
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


				{
					// item.skills.map((item,index)=>(
					// 		<div class="col-2 center">
					// 		<p class="color capital">{item.label}</p>
					// 		</div>
					// 	))
				}
			</div>
						

					))
			}



			<SkyLight dialogStyles={addStyles1} hideOnOverlayClicked={true} ref={ref => this.skillsDialog = ref} >


			<div class="row">
				<h2 class="color">Skill List</h2>
			</div>

			<div class="row">

					<div class="col-12">

							{this.state.skills.map((item)=>(

									<p style={{fontSize: 18,}}>{item.label}</p>

								))
								
							}

					</div>
			</div>


			</SkyLight>

	



				

				<SkyLight dialogStyles={addStyle} hideOnOverlayClicked={true} ref={ref => this.addEmployeeDialog = ref} >
					<div className="add">
					{!this.state.F1 &&
						<div>
						<h3 className="head_inv">{this.state.isUpdate ? "UPDATE STAFF":"ADD STAFF"}</h3>
         				<p>First Name</p>
         				<input onChange={(event)=>this.setState({
         					firstname:event.target.value
         				})} value={this.state.firstname} className="searchbox s_mod" placeholder="e.g. Juan"/>
         				<p>Last Name</p>
         				<input onChange={(event)=>this.setState({
         					lastname:event.target.value
         				})} value={this.state.lastname} className="searchbox s_mod" placeholder="e.g. Tamad"/>
         				<p>Email</p>
         				<input onChange={(event)=>this.setState({
         					email:event.target.value
         				})} value={this.state.email} className="searchbox s_mod" placeholder="e.g. jt45332@yahoo.com"/>
         				<p>Contact</p>
         				<input onChange={(event)=>this.setState({
         					contact:event.target.value
         				})} value={this.state.contact} className="searchbox s_mod" placeholder="e.g. +63 9123456789"/>
						</div>
						}

						{(this.state.F1 && !this.state.F2)&&

							<div>
								<p>Address <pre>*Put N/A to fillup later.</pre></p>
								<p>House No./Street</p>
								<input onChange={(event)=>this.setState({
         							street:event.target.value
         						})} className="searchbox s_mod" value={this.state.street} placeholder="e.g. House 123/692 Rizal St."/>
								<p>Barangay</p>
								<input onChange={(event)=>this.setState({
         							brgy:event.target.value
         						})} className="searchbox s_mod" value={this.state.brgy} placeholder="e.g. Barangay 143"/>
								<p>Municipality</p>
								<input onChange={(event)=>this.setState({
         							munc:event.target.value
         						})} className="searchbox s_mod" value={this.state.munc} placeholder="e.g. Old Albay"/>
								<p>City</p>
								<input onChange={(event)=>this.setState({
         							city:event.target.value
         						})} className="searchbox s_mod" value={this.state.city} placeholder="e.g. Legazpi"/>
								<br />

								
								
								<br />
							</div>


						}
						{(this.state.F1 && this.state.F2 && !this.state.F3) &&
								<div>	
								<p>Username</p>
								<input onChange={(event)=>this.setState({
         							username:event.target.value
         						})} className="searchbox s_mod" value={this.state.username} placeholder="e.g. Juan"/>
								<p>Password</p>
								<input onChange={(event)=>this.setState({
         							password:event.target.value
         						})} className="searchbox s_mod"  placeholder="e.g. 123juan"/>
	
									
									
								<p>Skill/s for service</p>
								<Select 
								options={service}
								onChange={this.addService}
								className="select"
								/>
								<h3 className="skills">SKILLS LIST</h3>
								{
									skills.map((item,index)=>(
										<h5 className="skills">{item.label}<button onClick={()=>this.popArr(item)} className="no"><MdCancel size={24} color="red"/></button></h5>
									))

								}
								</div>
							}

						<div class="row">
						 <button onClick={()=>this.continue()} className="btn modded">
         				     	<p>CONTINUE</p>
         				     </button>
         				     <br />
         				{this.state.isUpdate===true && <div><button onClick={()=>this.delete()} className="btn modded">
         				     	<p>DELETE EMPlOYEE</p>
         				     </button>
         				     <button onClick={()=>this.showSkills()} className="btn modded">
         				     	<p>SHOW SKILLS</p>
         				     </button></div>

         				 }
         				     <br />
         				{(this.state.F1 || this.state.F2)  &&
         					<button onClick={()=>this.back()} className="btn modded">
         				     	<p>BACK</p>
         				     </button>
         				 }
         				</div>
					</div>

				</SkyLight>


				<SkyLight dialogStyles={infoS} ref={ref=>this.infoDialogue = ref}>

				<div class="row">
					
						<button onPress={()=>this.onUpdate()} class="btn askme">
							MODIFY INFORMATION
						</button>

						<button class="btn red askme">
							DELETE RECORD
						</button>

						<br />
					
				</div>

				</SkyLight>


			</div>
		);
	}


}
let addStyles1 = {
   width: '30%',
     minHeight: '300px',
     marginTop: '-350px',
     marginLeft: '-35%', 
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
	overflow: 'auto',

}

let infoS = {
	width: '500px',
	minHeight: '100px',
}
let mapStateToProps = (state) =>{
	return {
		service: state.inventory.service,
		staff: state.schedule.staff
	}
} 
export default connect(mapStateToProps)(EMPLOYEES);