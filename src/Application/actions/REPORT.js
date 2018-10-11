import {
	GET_ADMIN_TRANSACTION,
	GET_SALES,
	GET_DAILY,
	GET_WEEKLY,
	GET_MONTHLY,
	SET_SALARY,
	GET_SPINV,
	GET_USED,
	GET_ALA,
	GALL,
	RS,
	GSN
} from '../api';

import axios from 'axios';

export const getAdminTransaction = () =>{
	return function(dispatch){
		return axios.post(GET_ADMIN_TRANSACTION).then((response)=>{
			let { transaction } = response.data;
			
			dispatch({
				type: "ADMIN_TRANSACTION",
				transaction
			})

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const getSales = () =>{
	return function(dispatch){
		return axios.post(GET_SALES).then((response)=>{
			let {
				today,
				thisweek,
				thismonth
			} = response.data;

			dispatch({
				type: "GET_SALES",
				today,
				thisweek,
				thismonth
			})
		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const getDaily = (date) =>{
	return function(dispatch){
		return axios.post(GET_DAILY,{date}).then((response)=>{
			let { transaction } = response.data;
			console.log("TRANS",transaction,date);
			dispatch({
				type: "ADMIN_TRANSACTION",
				transaction
			})

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const getWeekly = (date) =>{
	return function(dispatch){
		return axios.post(GET_WEEKLY,{date}).then((response)=>{
			let { transaction } = response.data;
			
			dispatch({
				type: "ADMIN_TRANSACTION",
				transaction
			})

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const getMonthly = (date) =>{
	return function(dispatch){
		return axios.post(GET_MONTHLY,{date}).then((response)=>{
			let { transaction } = response.data;
			
			dispatch({
				type: "ADMIN_TRANSACTION",
				transaction
			})

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const setsalary = (staffid,salary) =>{
	return function(dispatch){
		return axios.post(SET_SALARY,{staffid,salary}).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const getSP = ({staffid}) =>{
	return function(dispatch){
		return axios.post(GET_SPINV,{staffid}).then((response)=>{

			let {sp} = response.data;
			dispatch({
				type: "SP",
				sp
			})

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const  getUsed = () =>{
	return function(dispatch){
		return axios.post(GET_USED).then((response)=>{
			let {invent} = response.data;
			dispatch({
				type: "INVENT",
				invent,
			})
			
		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}


export const getAla = () =>{
	return function(dispatch){
		return axios.post(GET_ALA).then((response)=>{
			let {appointments} = response.data;
			dispatch({
				type: "ALA",
				appointments
			})

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const gall = () =>{
	return function(dispatch){
		return axios.post(GALL).then((response)=>{

			let {
				app
			} = response.data;

			dispatch({
				type: "GALL",
				app
			})

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const GRS = (month,year) =>{
	month+=1;
	return function(dispatch){
		return axios.post(RS,{month,year}).then((response)=>{

			let {earn,inv,sal,sales} = response.data;
			dispatch({
				type:"RS",
				earn,
				inv,
				sal,
				sales
			})
		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const getSuggestion = () =>{
	return function(dispatch){
		return axios.post(GSN).then((response)=>{
			let {suggestion} = response.data;
			dispatch({
				type: "GSN",
				suggestion
			})
		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}
	 