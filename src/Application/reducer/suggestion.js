
let defaultState = {

	suggestion:[]
	
}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "GSN": 
			return {
				suggestion:action.suggestion
			}
		default:
			return state
	}
}
