import React from 'react';
import {connect} from 'react-redux';
import {
	login
} from '../actions/login';
import index from '../index';
import styles from '../styles.css';
class Login extends React.Component{
	constructor(props) {
		  super(props);
		
		  this.state = {
		  	username: null,
		  	password: null,
		  	isSecure: true,
		  };
		}

		handleSubmit = (event) =>{
			event.preventDefault();
			let {
				username,
				password
			} = this.state;
			console.log(username,password);
			this.props.dispatch(login(username,password));
		}
	handleUsername = (text)=>{
		this.setState({
			username:text.target.value,
		})
	}
	handlePassword = (text)=>{
		this.setState({
			password:text.target.value,
		})
	}

	
		
	

	 
	render(){

		if(this.props.userid){
			<index />
		}
		
		return(
			<div className="container">
			<div className="header_log">

			

					</div>
				
					
					<form className="form" onSubmit={this.handleSubmit}>
					<div className="input_div_login">
					<p className="hfont">Login to access dashboard</p>
					<input onChange={this.handleUsername} maxLength={10}  className="inputbox" type="text" placeholder="Username" />
					<input type="password" onChange={this.handlePassword} className="inputbox" type="text"  maxLength={10} placeholder="Password" />
					
					<input className="btn" type="submit"  value="Login" />
					</div>

					<a href="https://firebasestorage.googleapis.com/v0/b/llsalon-19296.appspot.com/o/app-release.apk?alt=media&token=7d309f03-45ee-4e5c-bed3-5670b28e837a"><h5>DOWNLOAD APPLICATION</h5></a>
					
					
					</form>


					
				


			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		userid: state.login.userid,
	}
}

export default connect()(Login);