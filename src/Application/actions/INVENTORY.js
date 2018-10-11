import {
	ADD_CAT,
	GET_CAT,
	ADD_PRODUCT,
	GET_PRODUCT,
	ADD_SERVICE,
	GET_SERVICE,
	GET_INVENTORY,
	UPDATE_CAT,
	UPDATE_PRODUCT,
	UPDATE_SERVICES,
	DELETE_CAT,
	DELETE_PRODUCT,
	DELETE_SERVICE
	
} from '../api';

import axios from 'axios';

export const addCategoryAction = (catname,catdescription,catfor) =>{
	return function(dispatch){
		return axios.post(ADD_CAT,{catname,catdescription,catfor}).then((response)=>{
			console.log("success");
			dispatch({
				type: "ALERT",
				header: "CATEGORY ADDED",
				show: true,
				message: `Category ${catname} sucessfully added to the category database.`
			})
		}).catch((error)=>{
			console.log("ADDCAT error",error,error.response);
		});
	}
}

export const resetCatNotify = ()=> ({
	type: "ALERT",
	show: false,
})

export const addProductAction = (productname,productdescription,quantity,price,category) =>{
	return function(dispatch){
		return axios.post(ADD_PRODUCT,{
			productname,
			productdescription,
			quantity,
			price,
			category
		}).then((response)=>{
			dispatch({
				type: "ALERT",
				show: true,
			});
		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const addServiceAction = (servicename,servicedescription,duration,price,category,avatarURL) =>{
	return function(dispatch){
		return axios.post(ADD_SERVICE,{servicename,servicedescription,duration,price,category,avatarURL}).then((response)=>{
			console.log("responded":response);
			dispatch({
				type: "ALERT",
				show: true,
			})
		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const getCategoryAction = (catfor) =>{
	return async function(dispatch){
		return await axios.post(GET_CAT,{catfor}).then((response)=>{
			let category = response.data.category;
			dispatch({
				type: "GET_CAT",
				category
			})


		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const getServiceAction = () =>{
	return function(dispatch){
		return axios.post(GET_SERVICE).then((response)=>{
			let service = response.data.service;
			dispatch({
				type: "GET_SERVICE",
				service
			})

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const getInventory = () =>{
	return function(dispatch){
		return axios.post(GET_INVENTORY).then((response)=>{

			let inventory = response.data.inventory;
			dispatch({
				type: "GET_INVENTORY",
				inventory
			})

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const updateCat = (_id,catname,catdescription,catfor) =>{
	return function(dispatch){
		return axios.post(UPDATE_CAT,{_id,catname,catdescription,catfor}).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const updateProduct = (_id,productname,productdescription,quantity,price,category) =>{
	return function(dispatch){
		return axios.post(UPDATE_PRODUCT,{_id,productname,productdescription,quantity,price,category}).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const updateService = (_id,servicename,servicedescription,duration,price,category,avatarURL) =>{
	return function(dispatch){
		return axios.post(UPDATE_SERVICES,{_id,servicename,servicedescription,duration,price,category,avatarURL}).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const deleteCat = (_id) =>{
	return function(dispatch){
		return axios.post(DELETE_CAT,{_id}).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const deleteProduct = (_id) =>{
	return function(dispatch){
		return axios.post(DELETE_PRODUCT,{_id}).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const deleteService = (_id) =>{
	return function(dispatch){
		return axios.post(DELETE_SERVICE,{_id}).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

