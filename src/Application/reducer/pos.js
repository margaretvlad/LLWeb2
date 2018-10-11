let defaultState = {
	payment: [],
	p_data: []
}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "GET_PAYMENT": 
		return {
			...state,
			payment: action.payment,
		}
		case "SP_DATA":
		return {
			...state,
			p_data: action.payments,
		}
	default: 
		return state
	}
}