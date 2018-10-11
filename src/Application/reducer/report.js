
let defaultState = {
	ala:[],
	transaction:[],
	sp:[],
	gu:[],
	
}

module.exports = (state=defaultState,action)=>{
	switch(action.type){



		// case "ALA": 

		// 	let data = [];
		// let a  = action.appointments;

		// a.map(function(item){
			
		// 	item.appointment.map(function(itemx){
		// 		if(itemx.accepted==="false"){
		// 			data.push(itemx);
		// 		}
		// 	})
			
		// })

		


		// 	return {
		// 		ala: data
		// 	};


	
		

		case "INVENT":
			return {
				gu: action.invent,
			}

		case "SP": 
			return {
				sp: action.sp,
			}
		case "GET_SALES": 
			return {

				...state,
				today: action.today,
				thisweek: action.thisweek,
				thismonth: action.thismonth,
			}
		case "ADMIN_TRANSACTION":
			return {
				transaction: action.transaction,
			}
		default:
			return state
	}
}
