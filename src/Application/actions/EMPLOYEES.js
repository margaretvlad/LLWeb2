import {
	SIGNUP,
	GET_STAFF,
	USP,
	DELETE_EMPLOYEE,
	UPDATE_CUSTOMER,
	ACCEPT,
	REJECT,
	CD,
	AVA,
	TRANS
} from '../api';

import axios from 'axios';
let PUSH = "https://onesignal.com/api/v1/notifications";
let REST = "ZThmYzFlZTYtOWRjMy00NDA5LWE1MTYtMmM2YTAyN2RiNjUw";
let app_id = "840dda32-9449-4eed-9397-e48b9e3fdae4";

export const signupAction = (
		username,
		password,
		firstname,
		lastname,
		email,
		contact,
		address,
		skills
	) =>{
	return function(dispatch){
		return axios.post(SIGNUP,{username,password,firstname,lastname,email,contact,address,skills}).then((response)=>{
			console.log("Ok")
		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const getStaff = () =>{
	return function(dispatch){
		return axios.post(GET_STAFF).then((response)=>{
			let staff = response.data.staff;
			dispatch({
				type: "GET_STAFF",
				staff
			})
		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const updateProfile = (
	staffid,username,password,firstname,lastname,email,contact,address,skills
	) =>{
	return function(dispatch){
		return axios.post(USP,{staffid,username,password,firstname,lastname,email,contact,address,skills}).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const deleteEmployee = (staffid) =>{
	return function(dispatch){
		return axios.post(DELETE_EMPLOYEE,{staffid}).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const accept = (staffid,appid) =>{
	return function(dispatch){
		return axios.post(ACCEPT,{staffid,appid}).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}


export const reject = (staffid,appid) =>{
	return function(dispatch){
		return axios.post(REJECT,{staffid,appid}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const getDID = (type,_id,info) =>{
	return function(dispatch){
		return axios.post(CD,{_id,type}).then((response)=>{

			let {deviceid} = response.data;
			console.warn("x",deviceid);
			dispatch(appointmentReceived(_id,deviceid,info));

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const appointmentReceived = (userid,deviceid,info) => {
	return async function(dispatch){
		
			console.log("RC",userid,deviceid)
			
			let include_player_ids = [];
			include_player_ids.push(deviceid);
			let contents={"en":`Your appointment was ${info}`};
			let data=null;
			
			return axios.post(PUSH,{headers:{"Authorization":`Basic ${REST}`},app_id,include_player_ids,data,contents}).then((response)=>{
				console.warn("SUCCESS",deviceid,include_player_ids,contents,data,app_id)
			}).catch((error)=>{
				
				console.warn("SDD",error);

			})


	
	}
}

export const setAVA = (staffid,available) =>{
	return function(dispatch){
		return axios.post(AVA,{staffid,available}).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const transfer = (item,target) =>{
	console.log("INI",item,target);
	return function(dispatch){
		return axios.post(TRANS,{item,target}).then((response)=>{

			console.log(item,target);

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}