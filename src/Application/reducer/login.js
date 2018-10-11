
let defaultState = {
	
}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "LOGIN":
			return {
				userid: action.userid
			}
		default:
			return state
	}
}
