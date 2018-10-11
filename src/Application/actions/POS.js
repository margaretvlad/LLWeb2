import {
	GET_PAYMENT,
	GET_SPPAYMENT,
	MAKE_PAYMENT,
	DELETE_PAYMENT,
	COMPLETE,
	INSALON,
	INV
} from '../api';

import axios from 'axios';

export const getPayments = () =>{
	return function(dispatch){
		return axios.post(GET_PAYMENT).then((response)=>{
			console.log("OK GP INI");
			let payment = response.data.payments;
			console.log(payment);

		// 	let data = payment.map(function(pay){
		// 		return {
		// 					value: pay.userid,
		// 					label:pay.username,
		// 				}
		// 		});
		// console.log("Parsed",data);

			dispatch({
				type: "GET_PAYMENT",
				payment,
			})
		}).catch((error)=>{
			console.log("ERROR ON GP ",error,error.response);
		})
	}
}

export const getSpecificPayments = (userid) => {
	return function(dispatch){
		return axios.post(GET_SPPAYMENT,{userid}).then((response)=>{
			let payments = response.data.payments;
			
			
			console.log(payments[0]);

			dispatch({
				type: "SP_DATA",
				payments
			})
		}).catch((error)=>{
			console.log("GSP ERror",error,error.response);
		})
	}
}


export const updateInventory = (products) =>{
	return function(dispatch){
		return axios.post(INV,{products}).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const makePayment = (tid,products) =>{
	return function(dispatch){
		return axios.post(MAKE_PAYMENT,{tid,products}).then((response)=>{

			dispatch(updateInventory(products));

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const deletePayment = (tid) =>{
	return function(dispatch){
		return axios.post(DELETE_PAYMENT,{tid}).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const complete = (
	
	userid,
	customer,
	staffid,
	staff,
	serviceid,
	service,
	products,
	type,
	price,
	status,
	paid

	) =>{
	return function(dispatch){
		return axios.post(INSALON,{
	
	userid,
	customer,
	staffid,
	staff,
	serviceid,
	service,
	products,
	type,
	price,
	status,
	paid}).then((response)=>{

		dispatch(updateInventory(products));

		}).catch((error)=>{
			
		})
	}
}