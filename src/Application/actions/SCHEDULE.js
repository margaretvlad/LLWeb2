import axios from 'axios';
import {
	SET_SCHEDULE,
	RESET_SCHEDULE
} from '../api';

export const setSchedule = (_id,mode,whole,ams,ame,pms,pme,sday) =>{
	return function(dispatch){
		console.log("Semi Manual Command Seal");
		return axios.post(SET_SCHEDULE,{_id,mode,whole,ams,ame,pms,pme,sday}).then((response)=>{
			console.log("SCHEDDED");
		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}

export const resetSchedule = () =>{
	return function(dispatch){
		return axios.post(RESET_SCHEDULE).then((response)=>{

		}).catch((error)=>{
			console.warn("x",error,error.response);
		})
	}
}