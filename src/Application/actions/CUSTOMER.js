import {
	GET_CUSTOMERLIST,
	CUSTOMER_SIGNUP,
	UPDATE_CUSTOMER,
	DELETE_CUSTOMER,
	CD,
	COMPLETE

} from '../api';

import axios from 'axios';

let PUSH = "https://onesignal.com/api/v1/notifications";
let REST = "ZThmYzFlZTYtOWRjMy00NDA5LWE1MTYtMmM2YTAyN2RiNjUw";
let app_id = "840dda32-9449-4eed-9397-e48b9e3fdae4";

export const getCustomerList = () =>{
	return function(dispatch){
		return axios.post(GET_CUSTOMERLIST).then((response)=>{
			let customers = response.data.customers;
			console.log("CUSTOMERS",customers);
			dispatch({
				type: "CUSTOMERS",
				customers,
			})
		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const getCustomerSignup = (username,password,firstname,lastname,email,contact) =>{
	return function(dispatch){
		return axios.post(CUSTOMER_SIGNUP,{username,password,firstname,lastname,email,contact}).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const updateCustomer = (userid,username,password,firstname,lastname,email,contact) =>{
	return function(dispatch){
		return axios.post(UPDATE_CUSTOMER,{userid,username,password,firstname,lastname,email,contact}).then((response)=>{

		}).catch((error)=>{
			console.warn("x update",error,error.response);
		})
	}
}

export const deleteCustomer= (userid) =>{
	return function(dispatch){
		return axios.post(DELETE_CUSTOMER,{userid}).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const getDIDX = (type,_id,info) =>{
	return function(dispatch){
		return axios.post(CD,{_id,type}).then((response)=>{

			let {deviceid} = response.data;
			dispatch(appointmentCompleted(_id,deviceid,info));

		}).catch((error)=>{
			console.log("x",error,error.response);
		})
	}
}

export const appointmentCompleted = (userid,deviceid,info) => {
	console.log("FF")
	return async function(dispatch){
		
			console.log("RC",userid,deviceid)
			
			let include_player_ids = [];
			include_player_ids.push(deviceid);
			let contents={"en":`Your appointment was marked ${info}`};
			let data=null;
			
			return axios.post(PUSH,{headers:{"Authorization":`Basic ${REST}`},app_id,include_player_ids,data,contents}).then((response)=>{
				console.log("SUCCESS",deviceid,include_player_ids,contents,data,app_id)
			}).catch((error)=>{
				
				console.log("SDD",error);

			})


	
	}
}

export const complete = (
	appid,
	userid,
	customer,
	staffid,
	staff,
	serviceid,
	service,
	type,
	date,
	price,
	status,
	paid

	) =>{
	return function(dispatch){
		return axios.post(COMPLETE,{
	appid,
	userid,
	customer,
	staffid,
	staff,
	serviceid,
	service,
	type,
	date,
	price,
	status,
	paid}).then((response)=>{

		console.log("F",response,appid,userid,customer,staffid);

		}).catch((error)=>{
				console.log(error,error.response);
		})
	}
}


export const sendToAll = (contents) =>{
	let auth = 	`Authorization:Basic ${REST}`;
	contents = {"en":`${contents}`};
	let included_segments = ["All"];
	let data=null;
	return function(dispatch){
		axios({
				method: 'POST',

 				url:`${PUSH}`,
				 headers: { 
   								 "Content-Type":"application/json",
   								 'Authorization':`Basic ${REST}`},
 				data: {
 				app_id,
 				included_segments,
 				data,
 				contents
 				}
		}).then((response)=>{
			
		}).catch((error)=>{
			console.log("ERO",error,error.response);
		})
	}
}
