
let defaultState = {
	
}

module.exports = (state=defaultState,action)=>{

	switch(action.type){
		case "RS":
			return {
				earn: action.earn,
				inv: action.inv,
				sal: action.sal,
				sales: action.sales,
			}
		default:
			return state
	}
}
