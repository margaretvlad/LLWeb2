import axios from 'axios';
import {
	admin
} from '../api';

export const login = (username,password) =>{
	return function(dispatch){
		return axios.post(admin,{username,password}).then((response)=>{
			let {count} = response.data;
			console.log(count);
			if(count>0){
				dispatch({
					type: "LOGIN",
					userid: "admin"
				})
			}
		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}