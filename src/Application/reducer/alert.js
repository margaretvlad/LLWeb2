let defaultState = {
	gall:[]
}

module.exports = (state=defaultState,action) =>{
	switch(action.type){
		case "GALL":

				return {
					gall: action.app,
				}
		case "ALERT": 
			return {
				header: action.header,
				message: action.message,
				show: action.show,
			}
		
		default:
			return state
	}
}